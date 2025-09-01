import { Injectable } from '@nestjs/common';
import { Book } from './entities/task.entity';

@Injectable()
export class BooksService {

  private books: Book[] = [
    {
      id: 1,
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      description: "Uma fábula sobre uma revolta animal que se transforma em uma distopia",
      category: "Ficção",
      publishedYear: 1945,
      available: true

    }
  ]

  listAll(){
    return  this.books;
  }

  findOne(id: string){
    return this.books.find( book => book.id === Number(id))
  }

  create(body: any){
    const newId = this.books.length + 1; 

    const newBook = {
      id: newId,
      ...body,
    }

    this.books.push(newBook)
    return newBook
  }

  update(id:string, body: any){
    const bookIndex = this.books.findIndex(book => book.id === Number(id))

    if(bookIndex >=0){
      const bookItem = this.books[bookIndex]

      this.books[bookIndex] = {
        ...bookItem,
      ...body
      }
    }

    return "Trefa atualiada com sucesso!"

  }



}
