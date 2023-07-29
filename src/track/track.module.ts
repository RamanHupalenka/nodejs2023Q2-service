import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DBProvider } from 'src/db';

@Module({
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService, DBProvider],
})
export class TrackModule {}
