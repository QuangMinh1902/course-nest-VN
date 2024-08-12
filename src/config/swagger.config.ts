import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

export const swaggerConfig = function (app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('NestJs API Documentation')
    .setVersion('1.0')
    .build();

  const username = process.env.HTTP_USERNAME;
  const password = process.env.HTTP_PASSWORD;

  console.log({ username, password });

  if (!username || !password) {
    throw new Error(
      'HTTP_BASIC_USERNAME and HTTP_BASIC_PASSWORD environment variables are required',
    );
  }

  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: {
        [username]: password,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
