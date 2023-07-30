import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBProvider } from 'src/db';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [AlbumModule, TrackModule],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService, DBProvider],
})
export class ArtistModule {}
