import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import customValidationPipe from './commons/validation.pipe';
import { configSwagger } from './commons/config/swagger.config';
import { LoggerMiddlewareFunc } from './commons/middleware/logger.middleware';
// import { AllExceptionsFilter } from './exceptions/all-exception.filter';
// import { SerializeInter } from './commons/serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configSwagger(app);

  app.useGlobalPipes(customValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalInterceptors(new SerializeInter())∏
  app.use(LoggerMiddlewareFunc);

  await app.listen(3000);
}

bootstrap();
