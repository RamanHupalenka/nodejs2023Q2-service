import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class Fav {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  artists: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  albums: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tracks: string[];

  constructor(fav: Fav) {
    Object.assign(this, fav);
  }
}
