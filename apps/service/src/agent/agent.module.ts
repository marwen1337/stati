import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgentEntity } from './model/agent.entity'
import { AgentController } from './agent.controller'
import { AgentGateway } from './agent.gateway'
import { UtilityModule } from '../utility/utility.module'

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity]), UtilityModule],
  providers: [AgentService, AgentGateway],
  controllers: [AgentController]
})
export class AgentModule {}
