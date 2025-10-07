import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoansDto } from './dto/create-loans.dto';
import { UpdateLoanDto } from './dto/update-loans.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async createLoan(createLoansDto: CreateLoansDto) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: createLoansDto.bookId,
      },
    });

    if (!book)
      throw new HttpException(
        'Usuário não encontrado!',
        HttpStatus.BAD_REQUEST,
      );

    if (book.available < 1)
      throw new HttpException(
        'Livro indisponível no momento!',
        HttpStatus.BAD_REQUEST,
      );

    await this.prisma.book.update({
      where: {
        id: createLoansDto.bookId,
      },
      data: {
        available: { decrement: 1 },
      },
    });

    return this.prisma.loan.create({
      data: {
        userId: createLoansDto.userId,
        bookId: createLoansDto.bookId,
      },
    });
  }

  async returnLoan(id: number) {
    const loan = await this.prisma.loan.findUnique({ where: { id: id } });

    if (!loan)
      throw new HttpException(
        'Empréstimo não encontrado!',
        HttpStatus.BAD_REQUEST,
      );

    if (loan.returned)
      throw new HttpException('Livro já devolvido!', HttpStatus.BAD_REQUEST);

    await this.prisma.loan.update({
      where: {
        id: id,
      },
      data: {
        returned: true,
        endDate: new Date(),
      },
    });

    await this.prisma.book.update({
      where: {
        id: loan.bookId,
      },
      data: { available: { increment: 1 } },
    });

    return { message: 'Livro devolvido com sucesso' };
  }

  async getUserLoans(userId: number) {
    return await this.prisma.loan.findMany({
      where: {
        userId,
      },
      include: { book: true },
    });
  }

  async findAllLoans() {
    return await this.prisma.loan.findMany({
      include: { book: true, user: true },
    });
  }

  async delete(id: number) {
    try {
      const findLoan = await this.prisma.loan.findUnique({
        where: {
          id: id,
        },
      });

      if (!findLoan) {
        throw new HttpException(
          'Esse empréstimo não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.loan.delete({
        where: {
          id: findLoan.id,
        },
      });

      return {
        message: 'Empréstimo deletada com sucesso!',
      };
    } catch (err) {
      throw new HttpException(
        'Falha ao deletar esse empréstimo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

async updateLoan(id: number, updateLoanDto: UpdateLoanDto) {
  const loan = await this.prisma.loan.findUnique({ where: { id } });

  if (!loan) {
    throw new HttpException('Empréstimo não encontrado', HttpStatus.NOT_FOUND);
  }

  return this.prisma.loan.update({
    where: { id },
    data: updateLoanDto, 
  });
}


}
