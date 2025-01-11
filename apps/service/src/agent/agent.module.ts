import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgentEntity } from './model/agent.entity'
import { AgentController } from './agent.controller'
import { AgentGateway } from './agent.gateway'
import { UtilityModule } from '../utility/utility.module'
import { AgentCommunicationService } from './agent-communication.service'

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity]), UtilityModule],
  providers: [AgentService, AgentGateway, AgentCommunicationService],
  controllers: [AgentController],
  exports: [AgentCommunicationService]
})
export class AgentModule {}
