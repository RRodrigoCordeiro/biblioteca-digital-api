import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateLoansDto{
  @IsString()
  @IsNotEmpty()
  bookId: number;
  
  @IsString()
  @IsNotEmpty()
  userId: number;
}