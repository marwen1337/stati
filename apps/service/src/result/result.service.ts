import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultEntity } from './model/result.entity'
import { Repository } from 'typeorm'
import { MonitorStatus } from '../../../agent/src/monitoring/monitors/monitor.interface'
import { MonitorEntity } from '../monitor/model/monitor.entity'

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultEntity)
    private resultRepository: Repository<ResultEntity>,
  ) {}

  async storeResult(
    monitor: MonitorEntity,
    status: MonitorStatus,
    metrics: object,
  ) {
    const result = this.resultRepository.create({
      monitor,
      status,
      metrics
    })
    await this.resultRepository.save(result)
  }
}
