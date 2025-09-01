import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {

  listAllBooks(){
    return [
      {id: 1, book: "comprar Livro"}
    ]
  }

  findOneBook(){
    return "Listando um livro"
  }

}
