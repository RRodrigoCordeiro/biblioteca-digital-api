import { Module } from "@nestjs/common";
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaModule } from "../prisma/prisma.module";
import { BookUtils } from "./books.utils";


@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    BookUtils,
    {
      provide: "KEY_TOKEN",
      useValue: "TOKEN_123456789"
    }
  ]
})

export class BooksModule{}