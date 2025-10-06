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
import {  ApiOperation, ApiParam} from '@nestjs/swagger';

@Controller('loans')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @Post()
  @ApiOperation({summary: 'Cadastrar um emprestimo'})
  createLoan(@Body() createLoansDto: CreateLoansDto
  ) {
    return this.loanService.createLoan(createLoansDto);
  }

  @Patch('return/:id')
  @ApiOperation({summary: 'Retornar um emprestimo'})
  @ApiParam({
    name: 'id',
    description: 'ID do emprestimo',
  })
  returnLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.returnLoan(id);
  }

  @Get('user/:userId')
  @ApiOperation({summary: 'Buscar o emprestimo do usuário'})
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
  })
  getUserLoans(@Param('userId', ParseIntPipe) userId: number) {
    return this.loanService.getUserLoans(userId);
  }
}
