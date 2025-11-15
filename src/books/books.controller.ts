import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Inject,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateBookInterceptor } from 'src/common/interceptors/body-create-book.interceptor';
import { ResponseIterceptor } from 'src/common/interceptors/response.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@UseInterceptors(ResponseIterceptor)
@Controller('books')
@UseGuards(AuthAdminGuard)
@ApiBearerAuth()
export class BooksController {
  constructor(
    private readonly bookService: BooksService,

    @Inject('KEY_TOKEN')
    private readonly keyToken: string,
  ) {}

  @Get()
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ summary: 'Buscar todos os livros' })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Limite de livros a ser buscados',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 0,
    description: 'Itens que deseja pular',
  })
  findAllBooks(@Query() paginationDto: PaginationDto) {
    // console.log(this.keyToken)
    return this.bookService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um livro' })
  @ApiParam({
    name: 'id',
    description: 'ID do livro',
  })
  findOneBook(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.bookService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um livro' })
  @UseInterceptors(BodyCreateBookInterceptor)
  createBook(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar um livro' })
  @ApiParam({
    name: 'id',
    description: 'ID do livro',
  })
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: 'Excluir um livro' })
  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }
}
