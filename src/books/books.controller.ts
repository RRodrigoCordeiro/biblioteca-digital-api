import { Controller,Get, Param, Post, Query, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  findAllBooks(@Query() paginationDto: PaginationDto){
    return this.bookService.findAll(paginationDto)
  }

  @Get(":id")
  findOneBook(@Param('id',ParseIntPipe) id:number){
    console.log(id)
    return this.bookService.findOne(id)
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto){
    console.log(createBookDto)
    return this.bookService.create(createBookDto)
  }

  @Patch(":id")
  updateBook(@Param("id", ParseIntPipe) id:number, @Body() updateBookDto: UpdateBookDto){
    return this.bookService.update(id, updateBookDto)
  }

  @Delete(":id")
  deleteBook(@Param("id", ParseIntPipe) id: number){
    return this.bookService.delete(id)
  }



}
