import { Exclude } from 'class-transformer';
import { IsString, IsInt, IsNumber, IsDefined } from 'class-validator';

export class User {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  login: string;

  @Exclude()
  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsInt()
  version: number;

  @IsDefined()
  @IsNumber()
  createdAt: number;

  @IsDefined()
  @IsNumber()
  updatedAt: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
