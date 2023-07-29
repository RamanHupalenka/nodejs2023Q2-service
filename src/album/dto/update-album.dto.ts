import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsNull } from 'src/decorators/is-null.decorator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsNull()
  @IsString()
  @IsUUID(4)
  artistId: string | null;
}
