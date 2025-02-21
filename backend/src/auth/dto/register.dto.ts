import { IsString, IsNotEmpty, MaxLength, IsEmail, MinLength, IsStrongPassword } from "class-validator";


export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(30)
    @IsStrongPassword()
    password: string;
}