import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DBProvider } from 'src/db';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [TrackModule],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService, DBProvider],
})
export class AlbumModule {}
