import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class AuthService {
  constructor(
    // we can create a function in users.service to find user by email (but we already created that function in our extended users.repository)
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,    
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async generateAccessToken(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const user =  this.userRepository.create(registerDto);
    await this.userRepository.getEntityManager().flush();

    return user
  }
}
