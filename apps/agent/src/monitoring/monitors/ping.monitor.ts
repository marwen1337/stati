import { BaseMonitor } from './monitor.interface'
import * as ping from 'ping'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

type PingMonitorIn = {
  host: string;
};

export class PingMonitor implements BaseMonitor<PingMonitorIn> {
  async run(input: PingMonitorIn) {
    const res = await ping.promise.probe(input.host)

    return {
      status: res.alive ? MonitorStatus.UP : MonitorStatus.DOWN,
      metric: {
        primary: res.time
      }
    }
  }
}
