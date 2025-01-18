import { BaseMonitor } from './monitor.interface'
import { loadavg } from 'node:os'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

type CpuMonitorIn = {
  maxUsageThreshold: number;
};

export class CpuMonitor implements BaseMonitor<CpuMonitorIn> {
  run(input: CpuMonitorIn) {
    const oneMinuteCpuUsage = loadavg()[0]

    let status = MonitorStatus.OK

    if (oneMinuteCpuUsage >= input.maxUsageThreshold) {
      status = MonitorStatus.ERROR
    }

    return {
      status,
      metric: {
        primary: oneMinuteCpuUsage
      }
    }
  }
}
