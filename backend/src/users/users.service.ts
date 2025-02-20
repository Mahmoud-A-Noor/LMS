import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const user = this.userRepository.create(createUserDto);
//     return this.userRepository.save(user);
//   }

//   async findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   async findOne(id: number): Promise<User | null> {
//     return this.userRepository.findOne({ where: { id } });
//   }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     await this.userRepository.update(id, updateUserDto);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.userRepository.delete(id);
//   }
}
