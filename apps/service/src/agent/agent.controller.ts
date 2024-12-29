import { Controller } from '@nestjs/common'
import { AgentService } from './agent.service'

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}
}
