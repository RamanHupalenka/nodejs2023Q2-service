import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export const validateIdParam = (id: string) => {
  const isNotUUIDId = !isUUID(id, 4);

  if (isNotUUIDId) {
    throw new BadRequestException();
  }
};
