import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AgentEntity } from './model/agent.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity) private repository: Repository<AgentEntity>,
  ) {}
}
