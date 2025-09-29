import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Get,
} from '@nestjs/common';
import { LoanService } from './loans.service';

@Controller('loans')
export class LoanController {
  constructor(private loanService: LoanService) {}

  
  @Post()
  createLoan(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.loanService.createLoan(userId, bookId);
  }

  
  @Patch(':id/return')
  returnLoan(@Param('id', ParseIntPipe) loanId: number) {
    return this.loanService.returnLoan(loanId);
  }

   
  @Get('user/:userId')
  getUserLoans(@Param('userId', ParseIntPipe) userId: number) {
    return this.loanService.getUserLoans(userId);
  }
}
