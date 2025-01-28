import { forwardRef, Module } from '@nestjs/common'
import { MonitoringService } from './monitoring.service'
import { MonitorModule } from '../monitor/monitor.module'
import { AgentModule } from '../agent/agent.module'
import { ResultModule } from '../result/result.module'
import { NotificationModule } from '../notification/notification.module'

@Module({
  providers: [MonitoringService],
  imports: [
    forwardRef(() => MonitorModule),
    AgentModule,
    ResultModule,
    NotificationModule
  ],
  exports: [MonitoringService]
})
export class MonitoringModule {}
