import { HttpException, HttpStatus } from '@nestjs/common';

export default class UnauthorizedException extends HttpException {
  constructor() {
    super(
      {
        message: 'Incorrect login information',
        errors: [],
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
