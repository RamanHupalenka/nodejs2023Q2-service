import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from 'class-validator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private validateIdParam(id: string) {
    const isNotUUIDId = !isUUID(id, 4);

    if (isNotUUIDId) {
      throw new BadRequestException();
    }
  }

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    this.validateIdParam(id);

    return this.userService.findOne(id);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.validateIdParam(id);

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  remove(@Param('id') id: string) {
    this.validateIdParam(id);

    return this.userService.remove(id);
  }
}
