import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBProvider } from 'src/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DBProvider],
})
export class UserModule {}
