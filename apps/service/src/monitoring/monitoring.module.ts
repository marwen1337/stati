import { Module } from '@nestjs/common'
import { MonitoringService } from './monitoring.service'
import { MonitorModule } from '../monitor/monitor.module'
import { AgentModule } from '../agent/agent.module'
import { ResultModule } from '../result/result.module'
import { NotificationModule } from '../notification/notification.module'

@Module({
  providers: [MonitoringService],
  imports: [MonitorModule, AgentModule, ResultModule, NotificationModule]
})
export class MonitoringModule {}
