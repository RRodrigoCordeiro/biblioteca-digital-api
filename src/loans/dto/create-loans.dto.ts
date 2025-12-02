import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateLoansDto {
  @IsOptional()
  @IsNotEmpty()

  bookId: number;
  @IsOptional()
  @IsNotEmpty()
  userId: number;

 
}
