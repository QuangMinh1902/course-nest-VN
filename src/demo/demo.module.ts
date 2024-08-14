import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [DemoController],
  imports: [TaskModule],
})
export class DemoModule {}
