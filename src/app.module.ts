import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [UserModule, TrackModule, AlbumModule, ArtistModule, FavsModule],
})
export class AppModule {}
