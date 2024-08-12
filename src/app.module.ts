import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DemoModule } from './demo/demo.module';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';

@Module({
  imports: [
    TaskModule,
    DemoModule,
    ConfigModule.forRoot({
      // isGlobal: true,
      // envFilePath: './config/configuration.config.ts',
      load: [configurationConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
