import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNull } from 'src/decorators/is-null.decorator';

export class Album {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsNull()
  @IsString()
  @IsUUID(4)
  artistId: string | null;

  constructor(album: Album) {
    Object.assign(this, album);
  }
}
