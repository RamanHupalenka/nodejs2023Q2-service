import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

interface GlobalDB {
  tracks: Track[];
  users: User[];
  favorites: Fav[];
  artists: Artist[];
  albums: Album[];
}

export const globalDB: GlobalDB = {
  tracks: [],
  users: [],
  favorites: [],
  artists: [],
  albums: [],
};
