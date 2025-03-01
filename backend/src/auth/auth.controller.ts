import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { parseDurationToMs } from '../common/utils/parseDurationToMs';
import { AuthenticatedRequest } from '../common/interfaces/authenticatedRequest';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
      const { accessToken, refreshToken, user } = await this.authService.validateUser(body.email, body.password);

      res.cookie('accessToken', accessToken, {
        path: "/",
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: parseDurationToMs(this.configService.get('JWT_ACCESS_EXPIRES_IN')),
      });
    
      res.cookie('refreshToken', refreshToken, {
        path: "/",
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: parseDurationToMs(this.configService.get('JWT_REFRESH_EXPIRES_IN')),
      });
      return res.status(200).json({ user });
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    return this.authService.logout(req.user.id, res);
  }

  @Post('refresh-token')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
  
    const { accessToken, refreshToken } = await this.authService.refreshAccessToken(oldRefreshToken);
  
    
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: parseDurationToMs(this.configService.get('JWT_ACCESS_EXPIRES_IN')),
    });
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: parseDurationToMs(this.configService.get('JWT_REFRESH_EXPIRES_IN')),
    });

    return res.json({ success: true });
  }
}
