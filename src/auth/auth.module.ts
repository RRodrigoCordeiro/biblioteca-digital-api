import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcrytService } from './hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';


// Módulo global - pode ser usado na aolicação inteira ( não precisa importar em outros módulos))
@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  providers:[
    {
      provide: HashingServiceProtocol,
      useClass: BcrytService
    },
    AuthService
  ],
  exports: [
    HashingServiceProtocol,
    JwtModule,
    ConfigModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
