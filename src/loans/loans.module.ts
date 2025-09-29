import { Module } from '@nestjs/common';
import { LoanController } from './loans.controller';  
import { LoanService } from './loans.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoansModule {}
