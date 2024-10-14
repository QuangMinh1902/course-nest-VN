import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SerializeInter } from './commons/serialize.interceptor';
import { DatabaseModule } from './commons/database/database.module';
import { AllExceptionsFilter } from './commons/exceptions/all-exception.filter';
import envConfig from './commons/config/env.config';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { AddressModule } from './address/address.module';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    TokenModule,
    AddressModule,
    MediaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users/(.*)', method: RequestMethod.DELETE },
        // { path: 'users', method: RequestMethod.GET },
        // { path: 'users/create', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}
