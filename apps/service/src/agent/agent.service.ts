import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AgentEntity } from './model/agent.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HashService } from '../utility/hash.service'

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity) private repository: Repository<AgentEntity>,
    private hashService: HashService,
  ) {}

  async findByAccessKey(accessKey: string) {
    const hashedAccessKey = this.hashService.defaultHash(accessKey)
    return await this.repository.findOneBy({
      hashedAccessKey: hashedAccessKey
    })
  }
}
