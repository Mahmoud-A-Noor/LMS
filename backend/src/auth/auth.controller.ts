import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.validateUser(body.email, body.password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    });

    return res.json({ accessToken });
  }

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.register(body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    });

    return res.json({ accessToken });
  }

  @Post('refresh-token')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
  
    const tokens = await this.authService.refreshAccessToken(refreshToken);
  
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
    });
  
    return res.json({ accessToken: tokens.accessToken });
  }
}
