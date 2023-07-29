import { Injectable, NotFoundException } from '@nestjs/common';
import { DBProvider } from 'src/db';
import { v4 as randomUUID } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

// npm run test -- test/tracks.e2e.spec.ts

@Injectable()
export class TrackService {
  constructor(private readonly db: DBProvider) {}

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const track = new Track({
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    });

    this.db.tracks = this.db.tracks.concat(track);

    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (track) return track;

    throw new NotFoundException();
  }

  update(id: string, { name, artistId, albumId, duration }: UpdateTrackDto) {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIdx === -1) {
      throw new NotFoundException();
    }

    this.db.tracks = this.db.tracks.map((track) => {
      if (track.id !== id) return track;

      track.name = name;
      track.artistId = artistId;
      track.albumId = albumId;
      track.duration = duration;

      return track;
    });

    return this.db.tracks[trackIdx];
  }

  remove(id: string) {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIdx === -1) {
      throw new NotFoundException();
    }

    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
  }
}
