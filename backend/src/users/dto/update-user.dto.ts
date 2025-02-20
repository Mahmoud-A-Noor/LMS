import { PrimaryKey } from '@mikro-orm/core';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {


  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  isActive?: boolean;
}