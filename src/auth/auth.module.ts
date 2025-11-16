import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcrytService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';


// Módulo global - pode ser usado na aolicação inteira ( não precisa importar em outros módulos))
@Global()
@Module({
  imports: [
    PrismaModule
  ],
  providers:[
    {
      provide: HashingServiceProtocol,
      useClass: BcrytService
    },
    AuthService
  ],
  exports: [
    HashingServiceProtocol
  ],
  controllers: [AuthController]
})
export class AuthModule {}
