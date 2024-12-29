import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MonitorEntity } from './model/monitor.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private repository: Repository<MonitorEntity>,
  ) {}
}
