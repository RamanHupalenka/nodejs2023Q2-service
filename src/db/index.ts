import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DBProvider {
  tracks: Track[] = [];

  users: User[] = [];

  favorites = new Fav({
    artists: [],
    albums: [],
    tracks: [],
  });

  artists: Artist[] = [];

  albums: Album[] = [];
}
