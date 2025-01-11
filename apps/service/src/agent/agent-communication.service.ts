import { Injectable } from '@nestjs/common'
import { AgentGateway } from './agent.gateway'
import { AgentEntity } from './model/agent.entity'

@Injectable()
export class AgentCommunicationService {
  constructor(private gateway: AgentGateway) {}

  sendMessage(agent: AgentEntity, message: string) {
    // TODO: Change type
    this.gateway.sendMessage(agent.id, 'runMonitor', message)
  }
}
