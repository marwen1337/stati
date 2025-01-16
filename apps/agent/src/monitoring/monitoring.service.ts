import { Injectable } from '@nestjs/common'
import { BaseMonitor } from './monitors/monitor.interface'
import { HttpMonitor } from './monitors/http.monitor'
import { CpuMonitor } from './monitors/cpu.monitor'
import { MonitorType } from '../../../service/src/monitor/model/monitorType.enum'

const availableMonitors: Record<MonitorType, BaseMonitor> = {
  [MonitorType.HTTP]: new HttpMonitor(),
  [MonitorType.CPU]: new CpuMonitor()
}

@Injectable()
export class MonitoringService {
  runMonitor(type: MonitorType, dataIn: any) {
    return availableMonitors[type].run(dataIn)
  }
}
