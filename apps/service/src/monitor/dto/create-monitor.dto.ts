import { Length, Max, MaxLength, Min, MinLength } from 'class-validator'
import { MonitorType } from '../model/monitorType.enum'

export class CreateMonitorDto {
  @MinLength(3)
  @MaxLength(64)
  name: string

  type: MonitorType

  @MinLength(2)
  @MaxLength(1024)
  configuration: string

  @Length(36)
  agentId: string

  @Min(5)
  @Max(86400)
  intervalSeconds: number
}
