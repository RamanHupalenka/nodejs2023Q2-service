import { IsDefined, IsInt, IsString } from 'class-validator';
import { IsNull } from 'src/decorators/is-null.decorator';

export class Track {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsNull()
  @IsString()
  artistId: string | null;

  @IsNull()
  @IsString()
  albumId: string | null;

  @IsDefined()
  @IsInt()
  duration: number;

  constructor(track: Track) {
    Object.assign(this, track);
  }
}
