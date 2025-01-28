import { Controller, Get, Param, Query } from '@nestjs/common'
import { MonitorService } from './monitor.service'
import { ResultService } from '../result/result.service'
import { MonitorEntity } from './model/monitor.entity'

@Controller('monitor')
export class MonitorController {
  constructor(
    private monitorService: MonitorService,
    private resultService: ResultService
  ) {}

  @Get()
  async getMonitors() {
    const monitors = await this.monitorService.findAll()

    return Promise.all(
      monitors.map(async (m) => await this.mapToMonitorWithStatus(m))
    )
  }

  @Get(':id')
  async getMonitor(@Param('id') id: string) {
    const monitor = await this.monitorService.findOne({
      where: {
        id
      }
    })

    return this.mapToMonitorWithStatus(monitor)
  }

  @Get(':id/metrics')
  async getMonitorMetrics(
    @Param('id') id: string,
    @Query('limit') limit: number = 100
  ) {
    const results = await this.resultService.findForMonitor(id, {
      take: limit
    })
    return results.map((r) => ({
      timestamp: r.createdAt,
      status: r.status,
      metrics: r.metrics
    }))
  }

  async mapToMonitorWithStatus(monitor: MonitorEntity) {
    const lastResult = await this.resultService.findLastResultFor(monitor.id)
    return {
      ...monitor,
      status: lastResult.status
    }
  }
}
