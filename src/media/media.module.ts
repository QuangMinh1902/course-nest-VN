import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MediaEntity from './media.entity';

@Module({
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([MediaEntity])],
})
export class MediaModule {}
