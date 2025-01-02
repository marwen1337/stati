import { Injectable, Logger } from '@nestjs/common'
import { MonitorService } from '../monitor/monitor.service'
import { MonitorEntity } from '../monitor/model/monitor.entity'
import { SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class MonitoringService {
  private logger: Logger = new Logger(this.constructor.name)
  constructor(
    private monitorService: MonitorService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.log('Loading all existing monitors')
    this.loadAllMonitors().then((amount) =>
      this.logger.log(`Done loading all existing monitors (${amount})`),
    )
  }

  loadMonitor(monitor: MonitorEntity) {
    const callback = () => {
      this.logger.debug(`Running ${this.getCronjobName(monitor)}`)
    }
    const interval = setInterval(callback, monitor.intervalSeconds * 1000)
    this.schedulerRegistry.addInterval(this.getCronjobName(monitor), interval)
    this.logger.debug(`Added monitor ${monitor.name} (${monitor.id})`)
  }

  getCronjobName(monitor: MonitorEntity) {
    return `monitor_job_${monitor.id}`
  }

  private async loadAllMonitors() {
    const monitors = await this.monitorService.findAll({
      relations: {
        agent: true
      }
    })
    if (!monitors.length) {
      this.logger.log('No monitors found during loading.')
      return
    }
    for (const monitor of monitors) {
      this.loadMonitor(monitor)
    }
    return monitors.length
  }
}
