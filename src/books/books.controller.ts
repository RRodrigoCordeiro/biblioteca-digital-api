import { Controller,Get, Param, Post, Query, Body, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';

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
  createBook(@Body() body:any){
    console.log(body)
    return this.bookService.create(body)
  }

  @Patch(":id")
  updateBook(@Param("id") id:string, @Body() body:any){
    return this.bookService.update(id, body)

  }

  @Delete(":id")
  deleteBook(@Param("id") id: string){


    return this.bookService.delete(id)

  }



}
