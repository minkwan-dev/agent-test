import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import type { JwtUserPayload } from "../auth/jwt-payload";
import type { CreateInventoryItemDto } from "./dto/create-inventory-item.dto";
import type { PatchInventoryItemDto } from "./dto/patch-inventory-item.dto";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
@UseGuards(AuthGuard("jwt"))
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get("items")
  list(@Req() req: Request & { user: JwtUserPayload }) {
    return this.inventory.listForProfile(req.user.sub);
  }

  @Post("items")
  create(
    @Req() req: Request & { user: JwtUserPayload },
    @Body() body: CreateInventoryItemDto,
  ) {
    return this.inventory.create(req.user.sub, body);
  }

  @Patch("items/:id")
  patch(
    @Req() req: Request & { user: JwtUserPayload },
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: PatchInventoryItemDto,
  ) {
    return this.inventory.patchForProfile(req.user.sub, id, body);
  }
}
