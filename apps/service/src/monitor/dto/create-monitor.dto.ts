import { Length, MaxLength, MinLength } from 'class-validator'
import { MonitorType } from '../model/monitorType.enum'
import { IsCronExpression } from '@app/shared/validator/is-cron-expression.decorator'

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

  @IsCronExpression()
  cronSchedule: string
}
