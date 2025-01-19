import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { AgentService } from './agent.service'
import { AgentGateway } from './agent.gateway'

@Controller('agent')
export class AgentController {
  constructor(
    private agentService: AgentService,
    private agentGateway: AgentGateway,
  ) {}

  @Get(':id')
  async getAgent(@Param('id') id: string) {
    const agent = await this.agentService.findAgentById(id)

    if (!agent) {
      throw new NotFoundException('Agent Not Found')
    }
    return {
      ...agent,
      isConnected: this.agentGateway.isConnected(agent.id)
    }
  }
}
