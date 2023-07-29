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
import { ApiTags } from '@nestjs/swagger';
import { validateIdParam } from 'src/validators/uuid';
import { FavsService } from './favs.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/artist/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addArtist(@Param('id') id: string) {
    validateIdParam(id);

    return this.favsService.addArtist(id);
  }

  @Post('/album/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addAlbum(@Param('id') id: string) {
    validateIdParam(id);

    return this.favsService.addAlbum(id);
  }

  @Post('/track/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addTrack(@Param('id') id: string) {
    validateIdParam(id);

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
  removeArtist(@Param('id') id: string) {
    validateIdParam(id);

    return this.favsService.removeArtist(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeAlbum(@Param('id') id: string) {
    validateIdParam(id);
    return this.favsService.removeAlbum(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeTrack(@Param('id') id: string) {
    validateIdParam(id);

    return this.favsService.removeTrack(id);
  }
}
