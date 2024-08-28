import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const observable = next.handle();
    return observable.pipe(
      map((res: any) => {
        return {
          statusCode: HttpStatus.OK,
          data: res,
          message: 'test',
          errors: [],
        };
      }),
    );
  }
}
