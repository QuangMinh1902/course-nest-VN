import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/* Middleware functions can perform the following tasks:
execute any code.
make changes to the request and the response objects.
end the request-response cycle.
call the next middleware function in the stack.
if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging. */

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Logger class');
    next();
  }
}

export function LoggerMiddlewareFunc(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Logger function`);
  next();
}
