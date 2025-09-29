import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/expection-filter';
import { AuthAdminGuard } from 'src/common/guards/admin.guard';
import { ConfigModule } from '@nestjs/config';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule, 
    UsersModule,
    LoansModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthAdminGuard
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
