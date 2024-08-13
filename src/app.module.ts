import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { DemoModule } from './demo/demo.module';
import { ConfigModule } from '@nestjs/config';
import configurationConfig from './config/configuration.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    DemoModule,
    ConfigModule.forRoot({
      // isGlobal: true,
      // envFilePath: './config/configuration.config.ts',
      load: [configurationConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: '12345678',
      database: 'todo',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}
