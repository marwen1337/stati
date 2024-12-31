import { Module } from '@nestjs/common'
import { AgentController } from './agent.controller'
import { AgentService } from './agent.service'
import { AgentConfigService } from './agent-config.service'

@Module({
  controllers: [AgentController],
  providers: [AgentService, AgentConfigService]
})
export class AgentModule {}
