import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { JwtUserPayload } from "./jwt-payload";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: JwtUserPayload): string {
    return this.jwtService.sign({
      sub: user.sub,
      email: user.email,
      name: user.name,
      picture: user.picture,
      onboardingCompleted: user.onboardingCompleted ?? true,
    });
  }
}
