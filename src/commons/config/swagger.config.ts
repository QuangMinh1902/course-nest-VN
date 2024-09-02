import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { SwaggerConfig } from './env.config';

export const configSwagger = (app: INestApplication) => {
  const swaggerConfig = app.get(ConfigService).get<SwaggerConfig>('swagger');

  if (process.env.NODE_ENV !== 'dev') {
    app.use(
      [swaggerConfig.pathDoc, `${swaggerConfig.pathDoc}-json`],
      basicAuth({
        challenge: true,
        users: {
          [swaggerConfig.username]: swaggerConfig.password,
        },
      }),
    );
  }

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.desc)
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerConfig.pathDoc, app, document);
};
