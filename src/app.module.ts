import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DemoModule } from './demo/demo.module';
import { ConfigModule } from '@nestjs/config';
// import configurationConfig from './config/configuration.config';
import { DatabaseModule } from './database/database.module';
import envConfig from './config/env.config';

@Module({
  imports: [
    TaskModule,
    DemoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
