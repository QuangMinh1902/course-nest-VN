import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';
import BadRequestException from './exceptions/bad-request.exception';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        const result = errors.reduce((accumulated, error) => {
          if (error.constraints) {
            // console.log(error);
            accumulated.push(Object.values(error.constraints)[0]);
          }
          return accumulated;
        }, []);

        return new BadRequestException(result);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap();
