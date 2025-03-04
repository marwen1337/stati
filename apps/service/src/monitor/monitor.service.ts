import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MonitorEntity } from './model/monitor.entity'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { CreateMonitorDto } from './dto/create-monitor.dto'
import { AgentService } from '../agent/agent.service'

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private repository: Repository<MonitorEntity>,
    private agentService: AgentService
  ) {}

  findAll(options?: FindManyOptions<MonitorEntity>) {
    return this.repository.find(options)
  }

  findOne(options: FindOneOptions<MonitorEntity>) {
    return this.repository.findOne(options)
  }

  async create(data: CreateMonitorDto) {
    const agent = await this.agentService.findById(data.agentId)

    if (!agent) {
      throw new NotFoundException(`Agent ${data.agentId} not found`)
    }

    const monitor = this.repository.create({
      name: data.name,
      cronSchedule: data.cronSchedule,
      type: data.type,
      configuration: JSON.parse(data.configuration),
      agent
    })

    return this.repository.save(monitor)
  }

  async delete(monitorId: string) {
    const monitor = await this.findOne({ where: { id: monitorId } })

    if (!monitor) {
      throw new NotFoundException(`Monitor ${monitorId} not found`)
    }

    return this.repository.remove(monitor)
  }
}
