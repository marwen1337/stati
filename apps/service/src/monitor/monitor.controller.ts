import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query
} from '@nestjs/common'
import { MonitorService } from './monitor.service'
import { ResultService } from '../result/result.service'
import { MonitorEntity } from './model/monitor.entity'
import { CreateMonitorDto } from './dto/create-monitor.dto'
import { MonitoringService } from '../monitoring/monitoring.service'

@Controller('monitor')
export class MonitorController {
  constructor(
    private monitorService: MonitorService,
    private resultService: ResultService,
    private monitoringService: MonitoringService
  ) {}

  @Get()
  async getMonitors(@Query('agent') withAgent: string) {
    const monitors = await this.monitorService.findAll({
      relations: {
        agent: !!withAgent
      }
    })

    return Promise.all(
      monitors.map(async (m) => await this.mapToMonitorWithStatus(m))
    )
  }

  @Get(':id')
  async getMonitor(@Param('id') id: string, @Query('agent') withAgent: string) {
    const monitor = await this.monitorService.findOne({
      where: {
        id
      },
      relations: {
        agent: !!withAgent
      }
    })

    return this.mapToMonitorWithStatus(monitor)
  }

  @Get(':id/metrics')
  async getMonitorMetrics(
    @Param('id') id: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number
  ) {
    const fromDate = from
      ? new Date(parseInt(from))
      : new Date(Date.now() - 3600 * 1000)
    const toDate = to ? new Date(parseInt(to)) : new Date()

    let results = await this.resultService.findForMonitor(id, fromDate, toDate)

    if (amount) {
      results = this.resizeArray(results, amount)
    }

    return results.map((r) => ({
      timestamp: r.createdAt,
      status: r.status,
      metrics: r.metrics
    }))
  }

  @Post()
  async createMonitor(@Body() dto: CreateMonitorDto) {
    const monitor = await this.monitorService.create(dto)

    this.monitoringService.loadMonitor(monitor)

    return monitor
  }

  @Delete(':id')
  async deleteMonitor(@Param('id') id: string) {
    const monitor = await this.monitorService.delete(id)
    monitor.id = id
    if (monitor) {
      this.monitoringService.unloadMonitor(monitor)
    }
    return monitor
  }

  async mapToMonitorWithStatus(monitor: MonitorEntity) {
    const lastResult = await this.resultService.findLastResultFor(monitor.id)

    return {
      ...monitor,
      status: lastResult.status
    }
  }

  private resizeArray<T>(arr: T[], newLength: number) {
    return Array.from({ length: newLength }, (_, i) => {
      const index = Math.round((i * (arr.length - 1)) / (newLength - 1))
      return { ...arr[index] } // Neue Kopie des Objekts
    })
  }
}
