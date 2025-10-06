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
import { CreateLoansDto } from './dto/create-loans.dto';

@Controller('loans')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @Post()
  createLoan(@Body() createLoansDto: CreateLoansDto
  ) {
    return this.loanService.createLoan(createLoansDto);
  }

  @Patch('return/:id')
  returnLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.returnLoan(id);
  }

  @Get('user/:userId')
  getUserLoans(@Param('userId', ParseIntPipe) userId: number) {
    return this.loanService.getUserLoans(userId);
  }
}
