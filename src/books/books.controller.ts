import { Controller,Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  getBooks(){
    return this.bookService.listAllBooks()
  }

  @Get("/1")
  getTest(){
    return this.bookService.findOneBook()
  }



}
