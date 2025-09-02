import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const book =  this.books.find( book => book.id === Number(id))

    if(book) return book;
     throw new HttpException("Esse livro não existe",HttpStatus.NOT_FOUND)
    // ir na documentação do moziila para pesquisar os status de respostas HTTP
    // throw new NotFoundException("Essa tarefa não exite")
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

    if(bookIndex < 0){
      throw new HttpException("Esse livro não existe",HttpStatus.NOT_FOUND)
    }

    const bookItem = this.books[bookIndex]

    this.books[bookIndex] = {
      ...bookItem,
      ...body
    }

    return this.books[bookIndex]

  }

  delete(id:string){
    const bookIndex = this.books.findIndex(book => book.id === Number(id))

    if(bookIndex < 0){
      throw new HttpException("Esse livro não existe",HttpStatus.NOT_FOUND)
    }

    this.books.splice(bookIndex,1)

    return {
      message: "Tarefa excluida com sucesso!"
    }

  }



}
