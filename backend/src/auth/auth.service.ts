import { BadRequestException, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthService {

  private readonly jwtOptions = {
    secret: this.configService.get<string>('JWT_SECRET'),
    expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
  };

  private readonly jwtRefreshOptions = {
    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
  };

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,    
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    
    return tokens;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user = this.userRepository.create(registerDto);
    const tokens = await this.generateTokens(user);

    user.refreshToken = tokens.refreshToken;
    await this.userRepository.getEntityManager().persistAndFlush(user);

    return tokens;
  }

  async refreshAccessToken(oldRefreshToken: string) {
    const decoded = this.jwtService.verify(oldRefreshToken, this.jwtRefreshOptions);

    const user = await this.userRepository.findOne({ id: decoded.id });
    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  // helper functions
  
  async generateTokens(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload, this.jwtOptions),
      refreshToken: this.jwtService.sign(payload, this.jwtRefreshOptions),
    };
  }
  
  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userRepository.nativeUpdate({ id: userId }, { refreshToken });
  }

}
