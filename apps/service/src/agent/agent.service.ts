import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AgentEntity } from './model/agent.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { HashService } from '../utility/hash.service'
import { CreateAgentDto } from './dto/create-agent.dto'

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity) private repository: Repository<AgentEntity>,
    private hashService: HashService,
  ) {}

  findAll() {
    return this.repository.find()
  }

  findById(id: string): Promise<AgentEntity> | null {
    return this.repository.findOneBy({ id })
  }

  async findByAccessKey(accessKey: string) {
    const hashedAccessKey = this.hashService.defaultHash(accessKey)
    return await this.repository.findOneBy({
      hashedAccessKey: hashedAccessKey
    })
  }

  async create(
    data: CreateAgentDto,
  ): Promise<AgentEntity & { accessKey: string }> {
    const agentEntity = this.repository.create(data)
    const accessKey = this.generateRandomString(32)
    agentEntity.hashedAccessKey = this.hashService.defaultHash(accessKey)

    const agentEntitySaved = await this.repository.save(agentEntity)
    return {
      ...agentEntitySaved,
      accessKey
    }
  }

  deleteAgent(agent: AgentEntity) {
    return this.repository.remove(agent)
  }

  private generateRandomString(length: number): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
}
