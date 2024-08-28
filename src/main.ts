import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';
import { AllExceptionsFilter } from './exceptions/all-exception.filter';
import customValidationPipe from './commons/validation.pipe';
import { SerializeInter } from './commons/serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configSwagger(app);
  app.useGlobalPipes(customValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SerializeInter());

  await app.listen(3000);
}

bootstrap();
