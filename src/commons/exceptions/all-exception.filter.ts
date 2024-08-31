import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const jsonRes = {
        data: [],
        ...(exception.getResponse() as object),
      };

      response.status(exception.getStatus()).json(jsonRes);
    } else {
      const responseBody = {
        data: {},
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occur, please try again',
        errors: [
          {
            msgError: 'An error occur, please try again',
          },
        ],
      };

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
    }
  }
}
