import { Max, Min } from 'class-validator'

export class CreateAgentDto {
  @Min(3)
  @Max(64)
  name: string
}
