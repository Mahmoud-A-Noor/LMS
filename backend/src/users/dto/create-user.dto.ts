import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, maxLength, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsEmail()
  email: string;

  @MaxLength(255)
  @MinLength(8)
  @Matches(/^\S*$/, { message: "Password cannot contain spaces" })
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
