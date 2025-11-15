import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minNumbers:1,
    minUppercase: 1,
    minLength: 8,
    minSymbols: 0,
  })
  password: string;
}