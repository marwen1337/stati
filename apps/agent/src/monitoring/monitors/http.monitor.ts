import { BaseMonitor, MonitorStatus } from './monitor.interface'

type HttpMonitorIn = {
  url: string;
};

export class HttpMonitor implements BaseMonitor<HttpMonitorIn> {
  async run(input: HttpMonitorIn) {
    const start = Date.now()
    const response = await fetch(input.url)
    const responseTime = Date.now() - start

    return {
      status: response.ok ? MonitorStatus.OK : MonitorStatus.ERROR,
      metric: responseTime
    }
  }
}
