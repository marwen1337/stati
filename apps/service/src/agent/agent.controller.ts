import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common'
import { AgentService } from './agent.service'
import { AgentGateway } from './agent.gateway'
import { CreateAgentDto } from './dto/create-agent.dto'
import { AgentEntity } from './model/agent.entity'

@Controller('agent')
export class AgentController {
  constructor(
    private agentService: AgentService,
    private agentGateway: AgentGateway,
  ) {}

  @Get()
  async getAllAgents() {
    const agents = await this.agentService.findAll()
    return agents.map((a) => this.mapWithConnectionStatus(a))
  }

  @Post()
  async createAgent(@Body() body: CreateAgentDto) {
    return this.agentService.create(body)
  }

  @Get(':id')
  async getAgent(@Param('id') id: string) {
    const agent = await this.agentService.findById(id)

    if (!agent) {
      throw new NotFoundException('Agent Not Found')
    }

    return this.mapWithConnectionStatus(agent)
  }

  @Delete(':id')
  async deleteAgent(@Param('id') id: string) {
    const agent = await this.agentService.findById(id)

    if (!agent) {
      throw new NotFoundException('Agent Not Found')
    }

    await this.agentService.deleteAgent(agent)
  }

  private mapWithConnectionStatus(
    agent: AgentEntity,
  ): AgentEntity & { isConnected: boolean } {
    return {
      ...agent,
      isConnected: this.agentGateway.isConnected(agent.id)
    }
  }
}
