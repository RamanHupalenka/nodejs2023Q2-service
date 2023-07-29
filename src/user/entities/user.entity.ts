import { Exclude } from 'class-transformer';
import { IsString, IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @Exclude()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
