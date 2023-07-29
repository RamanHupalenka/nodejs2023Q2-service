import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DBProvider } from 'src/db';
import { TrackService } from 'src/track/track.service';

// npm run test -- test/favorites.e2e.spec.ts

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly db: DBProvider,
  ) {}

  private getArtistById(id: string) {
    try {
      return this.artistService.findOne(id);
    } catch {
      return null;
    }
  }

  private getAlbumById(id: string) {
    try {
      return this.albumService.findOne(id);
    } catch {
      return null;
    }
  }

  private getTrackById(id: string) {
    try {
      return this.trackService.findOne(id);
    } catch {
      return null;
    }
  }

  addArtist(id: string) {
    const artist = this.getArtistById(id);

    if (artist) {
      this.db.favorites.artists = this.db.favorites.artists.concat(id);

      return;
    }

    throw new UnprocessableEntityException();
  }

  addAlbum(id: string) {
    const album = this.getAlbumById(id);

    if (album) {
      this.db.favorites.albums = this.db.favorites.albums.concat(id);

      return;
    }

    throw new UnprocessableEntityException();
  }

  addTrack(id: string) {
    const track = this.getTrackById(id);

    if (track) {
      this.db.favorites.tracks = this.db.favorites.tracks.concat(id);

      return;
    }

    throw new UnprocessableEntityException();
  }

  findAll() {
    return {
      artists: this.artistService.findAll().filter((artist) => {
        return this.db.favorites.artists.includes(artist.id);
      }),
      albums: this.albumService.findAll().filter((album) => {
        return this.db.favorites.albums.includes(album.id);
      }),
      tracks: this.trackService.findAll().filter((track) => {
        return this.db.favorites.tracks.includes(track.id);
      }),
    };
  }

  removeArtist(id: string) {
    const trackId = this.db.favorites.artists.find((trackId) => trackId === id);

    if (trackId) {
      this.db.favorites.artists = this.db.favorites.artists.filter(
        (artistId) => artistId !== id,
      );

      return;
    }

    throw new NotFoundException();
  }

  removeAlbum(id: string) {
    const albumId = this.db.favorites.albums.find((albumId) => albumId === id);

    if (albumId) {
      this.db.favorites.albums = this.db.favorites.albums.filter(
        (albumId) => albumId !== id,
      );

      return;
    }

    throw new NotFoundException();
  }

  removeTrack(id: string) {
    const trackId = this.db.favorites.tracks.find((trackId) => trackId === id);

    if (trackId) {
      this.db.favorites.tracks = this.db.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );

      return;
    }

    throw new NotFoundException();
  }
}
