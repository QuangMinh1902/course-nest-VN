import { HttpException, HttpStatus } from '@nestjs/common';

export default class BadRequestException extends HttpException {
  constructor(errors: string | string[]) {
    if (typeof errors === 'string') {
      errors = [errors];
    }
    super(
      {
        message:
          'The request could not be understood by the server due to malformed syntax.',
        errors: errors.map((error) => {
          msgError: error;
        }),
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
