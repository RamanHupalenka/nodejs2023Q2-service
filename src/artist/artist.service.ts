import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { DBProvider } from 'src/db';
import { TrackService } from 'src/track/track.service';
import { v4 as randomUUID } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

// npm run test -- test/artists.e2e.spec.ts

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly db: DBProvider,
  ) {}

  private removeArtistInfoFromTrack(id: string) {
    try {
      const tracks = this.trackService.findAll();

      const track = tracks.find((track) => track.artistId === id);

      if (track) {
        this.trackService.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    } catch (err) {
      console.error('[Artist Service] Error: %O', err);
    }
  }

  private removeArtistInfoFromAlbum(id: string) {
    try {
      const albums = this.albumService.findAll();

      const album = albums.find((album) => album.artistId === id);

      if (album) {
        this.albumService.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    } catch (err) {
      console.error('[Artist Service] Error: %O', err);
    }
  }

  create({ name, grammy }: CreateArtistDto) {
    const artist = new Artist({
      id: randomUUID(),
      name,
      grammy,
    });

    this.db.artists = this.db.artists.concat(artist);

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (artist) return artist;

    throw new NotFoundException();
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIdx === -1) {
      throw new NotFoundException();
    }

    this.db.artists = this.db.artists.map((artist) => {
      if (artist.id !== id) return artist;

      artist.name = name;
      artist.grammy = grammy;

      return artist;
    });

    return this.db.artists[artistIdx];
  }

  remove(id: string) {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIdx === -1) {
      throw new NotFoundException();
    }

    this.removeArtistInfoFromTrack(id);
    this.removeArtistInfoFromAlbum(id);

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}
