import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import {Request} from "express"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user =  this.userRepository.create(userDto);
    await this.userRepository.getEntityManager().persistAndFlush(user);
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async findMe(req: any){
    return this.userRepository.findOne(
      { id: req.user.id },
      {
        exclude: ["deletedAt", "createdAt", "updatedAt"], // exclude unnecessary fields
      }
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    this.userRepository.assign(user, updateUserDto);
    await this.userRepository.getEntityManager().persistAndFlush(user)
    
    return user;
  }

  async remove(id: string) {
    try {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException(`User could not be found`);
        return await this.userRepository.getEntityManager().removeAndFlush(user);
      } catch (error) {
        throw new InternalServerErrorException('An error occurred while deleting the user');
      }
  }
}
