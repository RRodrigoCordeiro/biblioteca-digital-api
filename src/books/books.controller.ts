import { Controller,Get, Param, Post, Query, Body, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  findAllBooks(){
    return this.bookService.listAll()
  }

  @Get(":id")
  findOneBook(@Param('id') id:string ){
    console.log(id)
    return this.bookService.findOne(id)
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto){
    return this.bookService.create(createBookDto)
  }

  @Patch(":id")
  updateBook(@Param("id") id:string, @Body() updateBookDto: UpdateBookDto){
    return this.bookService.update(id, updateBookDto)

  }

  @Delete(":id")
  deleteBook(@Param("id") id: string){


    return this.bookService.delete(id)

  }



}
