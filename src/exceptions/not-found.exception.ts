import { HttpException, HttpStatus } from '@nestjs/common';

export default class NotFoundException extends HttpException {
  constructor(resourceName: string, identifier: string | number) {
    super(
      {
        message: 'The resource you requested could not be found',
        errors: [
          {
            msgErrors: `${resourceName} with ${identifier} not found`,
          },
        ],
        status: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
