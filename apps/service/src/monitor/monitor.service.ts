import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MonitorEntity } from './model/monitor.entity'
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private repository: Repository<MonitorEntity>,
  ) {}

  findAll(options?: FindManyOptions<MonitorEntity>) {
    return this.repository.find(options)
  }
}
