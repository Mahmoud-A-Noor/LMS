import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// NestJS uses JwtStrategy behind the scenes when you use JwtAuthGuard
// You never call it directly, but NestJS uses it when JwtAuthGuard is applied
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use secret key from env
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role }; // Attach user data to req.user
  }
}
