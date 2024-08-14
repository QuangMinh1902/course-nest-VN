import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { SwaggerConfig } from './env.config';
import { ConfigService } from '@nestjs/config';

export const swaggerConfig = function (app: INestApplication) {
  const swaggerConfig = app.get(ConfigService).get<SwaggerConfig>('swagger');

  if (process.env.NODE_ENV !== 'dev') {
    app.use(
      [swaggerConfig.pathDoc, `${swaggerConfig.pathDoc}-json`],
      basicAuth({
        challenge: true,
        users: {
          admin: swaggerConfig.passsword,
        },
      }),
    );
  }

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.desc)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
