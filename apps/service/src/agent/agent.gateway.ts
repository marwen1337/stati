import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AgentService } from './agent.service'
import { Logger } from '@nestjs/common'
import { MessageType } from '@app/shared/model/message-type.enum'

@WebSocketGateway()
export class AgentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(this.constructor.name)
  @WebSocketServer()
  private server: Server

  private connectedAgents: Map<string, Socket> = new Map()

  constructor(private agentService: AgentService) {}

  async handleConnection(client: Socket) {
    if (!client.handshake.auth.accessKey) {
      this.logger.log(
        `New connection from ${client.conn.remoteAddress} closed: no accessKey provided`,
      )
      client.disconnect()
      return
    }
    const agentEntity = await this.agentService.findByAccessKey(
      client.handshake.auth.accessKey,
    )
    if (!agentEntity) {
      this.logger.log(
        `New connection from ${client.conn.remoteAddress} closed: invalid accessKey`,
      )
      client.disconnect()
      return null
    }
    this.logger.log(
      `Agent ${agentEntity} from ${client.conn.remoteAddress} authenticated`,
    )
    this.connectedAgents.set(agentEntity.id, client)
  }

  handleDisconnect(client: Socket): any {
    const [id] = [...this.connectedAgents.entries()].find(
      ([, value]) => value === client,
    )
    this.logger.log(
      `Connection closed with agent ${id} from ${client.conn.remoteAddress}`,
    )
    this.connectedAgents.delete(id)
  }

  sendMessage(agentId: string, type: MessageType, content: object) {
    if (!this.isConnected(agentId)) {
      this.logger.warn(
        `Trying to send message: Agent ${agentId} is not connected`,
      )
      return
    }
    const agent = this.connectedAgents.get(agentId)
    agent.emit(type, content)
  }

  sendMessageWithAck<T = any>(
    agentId: string,
    type: MessageType,
    content: object,
  ): Promise<T> | null {
    if (!this.isConnected(agentId)) {
      this.logger.warn(
        `Trying to send message: Agent ${agentId} is not connected`,
      )
      return null
    }
    const agent = this.connectedAgents.get(agentId)
    try {
      return agent.emitWithAck(type, content) as Promise<T>
    } catch (error) {
      return null
    }
  }

  isConnected(agentId: string): boolean {
    return this.connectedAgents.has(agentId)
  }
}
