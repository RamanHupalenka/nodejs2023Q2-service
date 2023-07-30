import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateIdParam implements PipeTransform<string> {
  transform(value: string): string {
    const isNotUUIDId = !isUUID(value, 4);

    if (isNotUUIDId) {
      throw new BadRequestException();
    }

    return value;
  }
}
