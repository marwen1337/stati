import { Module } from '@nestjs/common'
import { MonitoringService } from './monitoring.service'
import { MonitorModule } from '../monitor/monitor.module'
import { AgentModule } from '../agent/agent.module'

@Module({
  providers: [MonitoringService],
  imports: [MonitorModule, AgentModule]
})
export class MonitoringModule {}
