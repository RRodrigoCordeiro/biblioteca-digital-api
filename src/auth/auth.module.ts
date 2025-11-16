import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcrytService } from './hash/bcrypt.service';


// Módulo global - pode ser usado na aolicação inteira ( não precisa importar em outros módulos))
@Global()
@Module({
  providers:[
    {
      provide: HashingServiceProtocol,
      useClass: BcrytService
    }
  ],
  exports: [
    HashingServiceProtocol
  ]
})
export class AuthModule {}
