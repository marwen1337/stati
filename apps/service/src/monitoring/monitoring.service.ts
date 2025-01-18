import { Injectable, Logger } from '@nestjs/common'
import { MonitorService } from '../monitor/monitor.service'
import { MonitorEntity } from '../monitor/model/monitor.entity'
import { SchedulerRegistry } from '@nestjs/schedule'
import { AgentCommunicationService } from '../agent/agent-communication.service'
import { ResultService } from '../result/result.service'
import { MonitorResult } from '@app/shared/model/monitor-result.type'

@Injectable()
export class MonitoringService {
  private logger: Logger = new Logger(this.constructor.name)
  constructor(
    private monitorService: MonitorService,
    private schedulerRegistry: SchedulerRegistry,
    private communicationService: AgentCommunicationService,
    private resultService: ResultService,
  ) {
    this.logger.log('Loading all existing monitors')
    this.loadAllMonitors().then((amount) =>
      this.logger.log(`Done loading all existing monitors (${amount})`),
    )
  }

  loadMonitor(monitor: MonitorEntity) {
    const callback = () => this.runMonitor(monitor)
    const interval = setInterval(callback, monitor.intervalSeconds * 1000)
    this.schedulerRegistry.addInterval(this.getCronjobName(monitor), interval)
    this.logger.debug(`Added monitor ${monitor}`)
  }

  async runMonitor(monitor: MonitorEntity) {
    this.logger.debug(`Running ${this.getCronjobName(monitor)}`)
    const response = (await this.communicationService.requestMonitorResult(
      monitor.agent,
      {
        monitorId: monitor.id,
        monitorType: monitor.type,
        data: monitor.configuration
      },
    )) as { monitorId: string; data: MonitorResult }

    if (!response) {
      this.logger.error(`No monitor result received from ${monitor.id}`)
      return
    }

    await this.resultService.storeResult(
      monitor,
      response.data.status,
      response.data.metric,
    )
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
