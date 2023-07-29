import { ValidationOptions, ValidateIf } from 'class-validator';

/**
 * Checks if value is null.
 */
export function IsNull(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}
