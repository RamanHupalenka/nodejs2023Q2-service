import { Injectable, NotFoundException } from '@nestjs/common';
import { DBProvider } from 'src/db';
import { TrackService } from 'src/track/track.service';
import { v4 as randomUUID } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

// npm run test -- test/albums.e2e.spec.ts

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    private readonly db: DBProvider,
  ) {}

  private removeAlbumInfoFromTrack(id: string) {
    try {
      const tracks = this.trackService.findAll();

      const track = tracks.find((track) => track.albumId === id);

      if (track) {
        this.trackService.update(track.id, {
          ...track,
          albumId: null,
        });
      }
    } catch (err) {
      console.error('[Album Service] Error: %O', err);
    }
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const album = new Album({
      id: randomUUID(),
      name,
      year,
      artistId,
    });

    this.db.albums = this.db.albums.concat(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (album) return album;

    throw new NotFoundException();
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);

    if (albumIdx === -1) {
      throw new NotFoundException();
    }

    this.db.albums = this.db.albums.map((album) => {
      if (album.id !== id) return album;

      album.name = name;
      album.year = year;
      album.artistId = artistId;

      return album;
    });

    return this.db.albums[albumIdx];
  }

  remove(id: string) {
    const albumIdx = this.db.albums.findIndex((album) => album.id === id);

    if (albumIdx === -1) {
      throw new NotFoundException();
    }

    this.removeAlbumInfoFromTrack(id);

    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}
