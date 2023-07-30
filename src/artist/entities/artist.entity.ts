import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(artist: Artist) {
    Object.assign(this, artist);
  }
}
