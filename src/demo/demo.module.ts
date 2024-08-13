import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [DemoController],
  imports: [ConfigModule, TaskModule],
})
export class DemoModule {}
