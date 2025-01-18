import { Injectable } from '@nestjs/common'
import { AgentGateway } from './agent.gateway'
import { AgentEntity } from './model/agent.entity'

@Injectable()
export class AgentCommunicationService {
  constructor(private gateway: AgentGateway) {}

  sendMessage(agent: AgentEntity, messageType: string, data: any) {
    // TODO: Change type
    this.gateway.sendMessage(agent.id, messageType, data)
  }

  requestMonitorResult(agent: AgentEntity, data: any) {
    return this.requestData(agent, 'runMonitor', data)
  }

  private requestData(agent: AgentEntity, messageType: string, data: any) {
    return this.gateway.sendMessageWithAck(agent.id, messageType, data)
  }
}
