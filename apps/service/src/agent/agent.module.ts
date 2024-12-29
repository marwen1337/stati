import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgentEntity } from './model/agent.entity'
import { AgentController } from './agent.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  providers: [AgentService],
  controllers: [AgentController]
})
export class AgentModule {}
