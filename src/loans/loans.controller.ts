import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { LoanService } from './loans.service';
import { CreateLoansDto } from './dto/create-loans.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdateLoanDto } from './dto/update-loans.dto';

@Controller('loans')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um emprestimo' })
  createLoan(@Body() createLoansDto: CreateLoansDto) {
    return this.loanService.createLoan(createLoansDto);
  }

  @Get('return/:id')
  @ApiOperation({ summary: 'Retornar um emprestimo' })
  @ApiParam({
    name: 'id',
    description: 'ID do emprestimo',
  })
  returnLoan(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.returnLoan(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Buscar o empréstimo do usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
  })
  getUserLoans(@Param('userId', ParseIntPipe) userId: number) {
    return this.loanService.getUserLoans(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os empréstimos' })
  async getAllLoans() {
    return this.loanService.findAllLoans();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar o empréstimo' })
  deleteLoans(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um empréstimo' })
  updateLoan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLoanDto: UpdateLoanDto,
  ) {
    return this.loanService.updateLoan(id, updateLoanDto);
  }
}
