import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateLoansDto{
  
  @IsNotEmpty()
  bookId: number;
  
  @IsNotEmpty()
  userId: number;
}