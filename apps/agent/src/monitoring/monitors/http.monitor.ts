import { BaseMonitor } from './monitor.interface'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

type HttpMonitorIn = {
  url: string;
};

export class HttpMonitor implements BaseMonitor<HttpMonitorIn> {
  async run(input: HttpMonitorIn) {
    const start = Date.now()
    const response = await fetch(input.url)
    const responseTime = Date.now() - start

    return {
      status: response.ok ? MonitorStatus.UP : MonitorStatus.DOWN,
      metric: {
        primary: responseTime
      }
    }
  }
}
