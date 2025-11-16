import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { HashingServiceProtocol } from './hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import * as config from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ){
    
  }

  async authentucate(signInDto: SignInDto){
    const user = await this.prisma.user.findFirst({
      where: {
        email: signInDto.email
      }
    })

    if(!user){
      throw new HttpException("Falha ao fazer o login", HttpStatus.UNAUTHORIZED)
    }

    const passwordIsValid = await this.hashingService.compare(signInDto.password, user.passwordHash);

    if(!passwordIsValid){
      throw new HttpException("Senha/Usuário incorretos", HttpStatus.UNAUTHORIZED)
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email
       
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer
      }
    )
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}
