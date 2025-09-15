import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './entities/task.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto = new PaginationDto()) {
    const { limit = 10, offset = 0 } = paginationDto;

    const allBooks = await this.prisma.book.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return allBooks;
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findFirst({
      where: {
        id: id,
      },
    });

    if (book?.title) return book;

    throw new HttpException(
      'Esse livro não foi encontrado!',
      HttpStatus.NOT_FOUND,
    );

    // //  throw new HttpException("Esse livro não existe",HttpStatus.NOT_FOUND)
    // // ir na documentação do moziila para pesquisar os status de respostas HTTP
    //  throw new NotFoundException("Essa tarefa não exite")
  }

  async create(createBookDto: CreateBookDto) {
    try {
      const newBook = await this.prisma.book.create({
        data: {
          title: createBookDto.title,
          author: createBookDto.author,
          description: createBookDto.description,
          category: createBookDto.category,
          publishedYear: createBookDto.publishedYear,
          available: createBookDto.available,
          userId: createBookDto.userId,
        },
      });

      return newBook;
    } catch (err) {
      console.log(err);
      throw new HttpException("Falha ao cadastrar livro", HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const findBook = await this.prisma.book.findFirst({
        where: {
          id: id,
        },
      });

      if (!findBook) {
        throw new HttpException('Esse livro não existe!', HttpStatus.NOT_FOUND);
      }

      const book = await this.prisma.book.update({
        where: {
          id: findBook.id,
        },
        data: {
          author: updateBookDto.author ? updateBookDto.author : findBook.author,
          title: updateBookDto.title ? updateBookDto.title : findBook.title,
          publishedYear: updateBookDto.publishedYear ? updateBookDto.publishedYear : findBook.publishedYear,
          category: updateBookDto.category ? updateBookDto.category : findBook.category, 
          available: updateBookDto.available ? updateBookDto.available : findBook.available,
          description: updateBookDto.description ? updateBookDto.description : findBook.description,

        }
      });

      return book;
    } catch (err) {
      throw new HttpException(
        'Falha ao atualizar essa tarefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    try {
      const findBook = await this.prisma.book.findFirst({
        where: {
          id: id,
        },
      });

      if (!findBook) {
        throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
      }

      await this.prisma.book.delete({
        where: {
          id: findBook.id,
        },
      });

      return {
        message: 'Livro deletada com sucesso!',
      };
    } catch (err) {
      throw new HttpException(
        'Falha ao deletar essa tatefa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
