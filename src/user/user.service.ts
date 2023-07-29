import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DBProvider } from 'src/db';
import { v4 as randomUUID } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// npm run test -- test/users.e2e.spec.ts

@Injectable()
export class UserService {
  constructor(private readonly db: DBProvider) {}

  create({ login, password }: CreateUserDto) {
    const user = new User({
      id: randomUUID(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.db.users = this.db.users.concat(user);

    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (user) return user;

    throw new NotFoundException();
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const userIdx = this.db.users.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      throw new NotFoundException();
    }

    const currentUserPassword = this.db.users[userIdx].password;

    if (currentUserPassword === oldPassword) {
      this.db.users = this.db.users.map((user) => {
        if (user.id !== id) return user;

        user.password = newPassword;
        user.version += 1;
        user.updatedAt = Date.now();

        return user;
      });

      return this.db.users[userIdx];
    }

    throw new ForbiddenException();
  }

  remove(id: string) {
    const userIdx = this.db.users.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      throw new NotFoundException();
    }

    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
