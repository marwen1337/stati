import { registerDecorator, ValidationOptions } from 'class-validator'
import { validateCronExpression } from 'cron'

export function IsCronExpression(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCronExpression',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return validateCronExpression(value).valid
        }
      }
    })
  }
}
