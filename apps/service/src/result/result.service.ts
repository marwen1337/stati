import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultEntity } from './model/result.entity'
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'
import { MonitorEntity } from '../monitor/model/monitor.entity'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'
import { Cron } from '@nestjs/schedule'
import { ResultConfigService } from './result-config.service'
import { MonitorResult } from '@app/shared/model/monitor-result.type'

@Injectable()
export class ResultService {
  private logger: Logger = new Logger(ResultService.name)
  constructor(
    @InjectRepository(ResultEntity)
    private resultRepository: Repository<ResultEntity>,
    private resultConfig: ResultConfigService
  ) {}

  async findLastResultFor(monitorId: string) {
    const lastResult = await this.resultRepository.findOne({
      where: {
        monitor: {
          id: monitorId
        }
      },
      order: {
        createdAt: 'DESC'
      }
    })

    if (!lastResult) {
      return ResultEntity.getEmpty()
    }

    return lastResult
  }

  async findForMonitor(
    monitorId: string,
    fromDate: Date = new Date(Date.now() - 3600 * 1000),
    toDate: Date = new Date()
  ) {
    return this.resultRepository.find({
      where: {
        monitor: {
          id: monitorId
        },
        createdAt: And(MoreThanOrEqual(fromDate), LessThanOrEqual(toDate))
      },
      order: {
        createdAt: 'ASC'
      }
    })
  }

  async storeResult(
    monitor: MonitorEntity,
    status: MonitorStatus,
    metrics: MonitorResult['metric']
  ) {
    const result = this.resultRepository.create({
      monitor,
      status,
      metrics
    })
    return this.resultRepository.save(result)
  }

  // Every 10 minutes
  @Cron('*/10 * * * *')
  async cleanUpResults() {
    this.logger.log('Cleaning up results...')

    const minimalDate = new Date(
      Date.now() - this.resultConfig.get('keepForSeconds') * 1000
    )

    const deleteResult = await this.resultRepository.delete({
      createdAt: LessThanOrEqual(minimalDate)
    })
    this.logger.log(`Cleaned up ${deleteResult.affected} results`)
  }
}
