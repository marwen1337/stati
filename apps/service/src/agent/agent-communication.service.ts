import { Injectable } from '@nestjs/common'
import { AgentGateway } from './agent.gateway'
import { AgentEntity } from './model/agent.entity'
import { MessageType } from '@app/shared/model/message-type.enum'

@Injectable()
export class AgentCommunicationService {
  constructor(private gateway: AgentGateway) {}

  sendMessage(agent: AgentEntity, messageType: MessageType, data: any) {
    this.gateway.sendMessage(agent.id, messageType, data)
  }

  requestMonitorResult(agent: AgentEntity, data: any) {
    return this.requestData(agent, MessageType.RUN_MONITOR, data)
  }

  private requestData(agent: AgentEntity, messageType: MessageType, data: any) {
    return this.gateway.sendMessageWithAck(agent.id, messageType, data)
  }
}
