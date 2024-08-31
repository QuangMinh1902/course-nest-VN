import { ValidationError, ValidationPipe } from '@nestjs/common';
import BadRequestException from './exceptions/bad-request.exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customValidationPipe = () => {
  return new ValidationPipe({
    transform: true,
    exceptionFactory(errors: ValidationError[]) {
      const result = errors.reduce((accumulated, error) => {
        if (error.constraints) {
          accumulated.push(Object.values(error.constraints)[0]);
        }
        return accumulated;
      }, []);

      return new BadRequestException(result);
    },
  });
};

export default customValidationPipe;
