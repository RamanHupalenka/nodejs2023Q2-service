import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ClassSerializerInterceptor,
  Header,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { ValidateIdParam } from 'src/validators/uuid';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/artist/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addArtist(@Param('id', ValidateIdParam) id: string) {
    return this.favsService.addArtist(id);
  }

  @Post('/album/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addAlbum(@Param('id', ValidateIdParam) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Post('/track/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addTrack(@Param('id', ValidateIdParam) id: string) {
    return this.favsService.addTrack(id);
  }

  @Get()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeArtist(@Param('id', ValidateIdParam) id: string) {
    return this.favsService.removeArtist(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeAlbum(@Param('id', ValidateIdParam) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ValidateIdParam) id: string) {
    this.favsService.removeTrack(id);
  }
}
