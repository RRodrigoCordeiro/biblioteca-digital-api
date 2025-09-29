import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  
  async createLoan(userId: number, bookId: number) {
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });

    if (!book) throw new NotFoundException('Livro não encontrado');
    if (book.available < 1) throw new BadRequestException('Livro indisponível no momento');

    
    await this.prisma.book.update({
      where: { id: bookId },
      data: { available: { decrement: 1 } },
    });

     
    return this.prisma.loan.create({
      data: {
        userId,
        bookId,
      },
    });
  }

   
  async returnLoan(loanId: number) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });

    if (!loan) throw new NotFoundException('Empréstimo não encontrado');
    if (loan.returned) throw new BadRequestException('Livro já devolvido');

     
    await this.prisma.loan.update({
      where: { id: loanId },
      data: {
        returned: true,
        endDate: new Date(),
      },
    });

 
    await this.prisma.book.update({
      where: { id: loan.bookId },
      data: { available: { increment: 1 } },
    });

    return { message: 'Livro devolvido com sucesso' };
  }

  
  async getUserLoans(userId: number) {
    return await this.prisma.loan.findMany({
      where: { userId },
      include: { book: true },
    });
  }
}
