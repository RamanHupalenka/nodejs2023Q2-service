import { IsString, IsNotEmpty, IsUUID, IsInt } from 'class-validator';
import { IsNull } from 'src/decorators/is-null.decorator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNull()
  @IsString()
  @IsUUID(4)
  artistId: string | null;

  @IsNull()
  @IsString()
  @IsUUID(4)
  albumId: string | null;

  @IsInt()
  duration: number;
}
