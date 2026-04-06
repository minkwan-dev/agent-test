import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import type { CreateInventoryItemDto } from "./dto/create-inventory-item.dto";
import type { PatchInventoryItemDto } from "./dto/patch-inventory-item.dto";
import type { InventoryItemRow } from "./inventory.types";

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(private readonly supabase: SupabaseService) {}

  private validateCreate(dto: CreateInventoryItemDto): void {
    const name = dto.name?.trim() ?? "";
    if (name.length < 1) {
      throw new BadRequestException("name is required");
    }
    if (name.length > 500) {
      throw new BadRequestException("name is too long");
    }
    const cur = dto.current_qty;
    const max = dto.safety_stock_max;
    if (!Number.isInteger(cur) || cur < 0 || cur > 999_999) {
      throw new BadRequestException("current_qty must be 0–999999");
    }
    if (!Number.isInteger(max) || max < 1 || max > 999_999) {
      throw new BadRequestException("safety_stock_max must be 1–999999");
    }
    const sku = dto.sku?.trim();
    if (sku && sku.length > 200) {
      throw new BadRequestException("sku is too long");
    }
    const icon = dto.icon?.trim() || "📦";
    if (icon.length > 16) {
      throw new BadRequestException("icon is invalid");
    }
  }

  async listForProfile(profileId: string): Promise<InventoryItemRow[]> {
    const { data, error } = await this.supabase.client
      .from("inventory_items")
      .select(
        "id, profile_id, name, sku, icon, current_qty, safety_stock_max, created_at, updated_at",
      )
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (error) {
      this.logger.error(`inventory list: ${error.message}`);
      throw error;
    }
    return (data ?? []) as InventoryItemRow[];
  }

  async create(
    profileId: string,
    dto: CreateInventoryItemDto,
  ): Promise<InventoryItemRow> {
    this.validateCreate(dto);
    const name = dto.name.trim();
    const sku = dto.sku?.trim() || null;
    const icon = dto.icon?.trim() || "📦";
    const now = new Date().toISOString();

    const { data, error } = await this.supabase.client
      .from("inventory_items")
      .insert({
        profile_id: profileId,
        name,
        sku,
        icon,
        current_qty: dto.current_qty,
        safety_stock_max: dto.safety_stock_max,
        updated_at: now,
      })
      .select(
        "id, profile_id, name, sku, icon, current_qty, safety_stock_max, created_at, updated_at",
      )
      .single();

    if (error) {
      this.logger.error(`inventory insert: ${error.message}`);
      throw error;
    }
    return data as InventoryItemRow;
  }

  async patchForProfile(
    profileId: string,
    itemId: string,
    dto: PatchInventoryItemDto,
  ): Promise<InventoryItemRow> {
    if (dto.current_qty === undefined && dto.safety_stock_max === undefined) {
      throw new BadRequestException("nothing to update");
    }
    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (dto.current_qty !== undefined) {
      if (
        !Number.isInteger(dto.current_qty) ||
        dto.current_qty < 0 ||
        dto.current_qty > 999_999
      ) {
        throw new BadRequestException("current_qty must be 0–999999");
      }
      patch.current_qty = dto.current_qty;
    }
    if (dto.safety_stock_max !== undefined) {
      if (
        !Number.isInteger(dto.safety_stock_max) ||
        dto.safety_stock_max < 1 ||
        dto.safety_stock_max > 999_999
      ) {
        throw new BadRequestException("safety_stock_max must be 1–999999");
      }
      patch.safety_stock_max = dto.safety_stock_max;
    }

    const { data, error } = await this.supabase.client
      .from("inventory_items")
      .update(patch)
      .eq("id", itemId)
      .eq("profile_id", profileId)
      .select(
        "id, profile_id, name, sku, icon, current_qty, safety_stock_max, created_at, updated_at",
      )
      .maybeSingle();

    if (error) {
      this.logger.error(`inventory patch: ${error.message}`);
      throw error;
    }
    if (!data) {
      throw new NotFoundException("inventory item not found");
    }
    return data as InventoryItemRow;
  }
}
