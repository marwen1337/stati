import { Module } from '@nestjs/common'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'
import { AgentConfigService } from './agent-config.service'
import { MonitoringModule } from './monitoring/monitoring.module'

@Module({
  controllers: [AgentController],
  providers: [AgentService, AgentConfigService],
  imports: [MonitoringModule]
})
export class AgentModule {}
