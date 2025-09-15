import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString,  MinLength } from "class-validator";

export class CreateBookDto{
  @IsString({message: "O titulo precisa ser um texto"})
  @MinLength(3, {message: "O titulo precisa ter 3 caracteres"})
  @IsNotEmpty()
  readonly title: string;

  @IsString({message: "O autor precisa ser um texto"})
  @MinLength(3, {message: "O autor precisa ter 3 caracteres"})
  @IsNotEmpty()
  readonly author: string;

  @IsString({message: "A descrição precisa ser um texto"})
  @MinLength(3, {message: "A descrição precisa ter 5 caracteres"})
  @IsNotEmpty()
  readonly description: string;

  @IsString({message: "A categoria precisa ser um texto"})
  @MinLength(3, {message: "A categoria precisa ter 3 caracteres"})
  @IsNotEmpty()
  readonly category: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  readonly publishedYear: number;


  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  readonly available: number;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;


}