import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DemoController],
  imports: [ConfigModule],
})
export class DemoModule {}
