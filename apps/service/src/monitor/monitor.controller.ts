import { Controller, Get, Param } from '@nestjs/common'
import { MonitorService } from './monitor.service'
import { ResultService } from '../result/result.service'

@Controller('monitor')
export class MonitorController {
  constructor(
    private monitorService: MonitorService,
    private resultService: ResultService,
  ) {}

  @Get(':id')
  async getMonitor(@Param('id') id: string) {
    const monitor = await this.monitorService.findOne({
      where: {
        id
      }
    })

    const lastResult = await this.resultService.findLastResultFor(monitor.id)

    return {
      ...monitor,
      status: lastResult.status
    }
  }
}
