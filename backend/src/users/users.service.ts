import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user =  this.userRepository.create(userDto);
    await this.userRepository.getEntityManager().flush();
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    this.userRepository.assign(user, updateUserDto);
    await this.userRepository.getEntityManager().flush()
    
    return user;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User could not be found`);

    try {
        await this.userRepository.getEntityManager().removeAndFlush(user);
        return true;
      } catch (error) {
        throw new InternalServerErrorException('An error occurred while deleting the user');
      }
  }
}
