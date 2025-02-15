import { Injectable } from '@nestjs/common'
import { BaseMonitor } from './monitors/monitor.interface'
import { HttpMonitor } from './monitors/http.monitor'
import { CpuMonitor } from './monitors/cpu.monitor'
import { MonitorType } from '../../../service/src/monitor/model/monitorType.enum'
import { MonitorResult } from '@app/shared/model/monitor-result.type'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

const availableMonitors: Record<MonitorType, BaseMonitor> = {
  [MonitorType.HTTP]: new HttpMonitor(),
  [MonitorType.CPU]: new CpuMonitor()
}

@Injectable()
export class MonitoringService {
  runMonitor(
    type: MonitorType,
    dataIn: any
  ): Promise<MonitorResult> | MonitorResult {
    try {
      return availableMonitors[type].run(dataIn)
    } catch (e) {
      return {
        status: MonitorStatus.DOWN,
        metric: {
          primary: 0
        }
      }
    }
  }
}
