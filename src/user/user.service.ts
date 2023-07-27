import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { globalDB } from 'src/db';
import { v4 as randomUUID } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// npm run test -- test/users.e2e.spec.ts

@Injectable()
export class UserService {
  create({ login, password }: CreateUserDto) {
    const user = new User({
      id: randomUUID(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    globalDB.users = globalDB.users.concat(user);

    return user;
  }

  findAll() {
    return globalDB.users;
  }

  findOne(id: string) {
    const user = globalDB.users.find((user) => user.id === id);

    if (user) return user;

    throw new NotFoundException();
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const userIdx = globalDB.users.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      throw new NotFoundException();
    }

    const currentUserPassword = globalDB.users[userIdx].password;

    if (currentUserPassword === oldPassword) {
      globalDB.users = globalDB.users.map((user) => {
        if (user.id === id) {
          user.password = newPassword;
          user.version += 1;
          user.updatedAt = Date.now();
        }

        return user;
      });

      return globalDB.users[userIdx];
    }

    throw new ForbiddenException();
  }

  remove(id: string) {
    const userIdx = globalDB.users.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      throw new NotFoundException();
    }

    globalDB.users = globalDB.users.filter((user) => user.id !== id);
  }
}
