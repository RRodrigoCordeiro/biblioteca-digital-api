import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/auth/common/auth.constants';
 

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @Get()
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
  })
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    console.log('Token teste: ', process.env.TOKEN_KEY);
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um usuário' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthTokenGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Editar um usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
  })
  upgrade(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {

    console.log("ID user: ", req[REQUEST_TOKEN_PAYLOAD_KEY]?.sub)
    return this.userService.upgrade(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Post('upload')
  uploadAvatar() {
    return true;
  }
}
