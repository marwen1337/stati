import { MaxLength, MinLength } from 'class-validator'

export class CreateAgentDto {
  @MinLength(3)
  @MaxLength(64)
  name: string
}
