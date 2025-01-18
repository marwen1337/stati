import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultEntity } from './model/result.entity'
import { Repository } from 'typeorm'
import { MonitorEntity } from '../monitor/model/monitor.entity'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

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
