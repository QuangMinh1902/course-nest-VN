import { HttpException, HttpStatus } from '@nestjs/common';

export default class BadRequestException extends HttpException {
  constructor(errors: string | string[]) {
    if (typeof errors === 'string') {
      errors = [errors];
    }
    super(
      {
        message:
          'Please check your input and retry. If the error persists, please contact us.',
        errors: errors.map((error) => {
          return {
            msgError: error,
          };
        }),
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
