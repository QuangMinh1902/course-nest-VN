import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidationPipe implements PipeTransform {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation pipe failed');
    }
    return val;
  }
}
