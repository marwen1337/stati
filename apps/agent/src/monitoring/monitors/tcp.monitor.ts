import { BaseMonitor } from './monitor.interface'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'
import * as net from 'net'

type TcpMonitorIn = {
  host: string;
  port: number;
};

type TcpAvailabilityCheckResponse = {
  available: boolean;
  latency: number;
};

export class TcpMonitor implements BaseMonitor<TcpMonitorIn> {
  async run(input: TcpMonitorIn) {
    const res = await this.checkTcpAvailability(input.host, input.port)

    return {
      status: res.available ? MonitorStatus.UP : MonitorStatus.DOWN,
      metric: {
        primary: res.latency
      }
    }
  }

  private checkTcpAvailability(
    host: string,
    port: number
  ): Promise<TcpAvailabilityCheckResponse> {
    return new Promise((resolve) => {
      const startTime = Date.now()
      const socket = new net.Socket()
      socket.setTimeout(5000)

      socket.connect(port, host, () => {
        socket.destroy()
        resolve({ available: true, latency: this.getLatency(startTime) })
      })

      socket.on('error', () => {
        socket.destroy()
        resolve({ available: false, latency: 0 })
      })

      socket.on('timeout', () => {
        socket.destroy()
        resolve({ available: false, latency: 0 })
      })
    })
  }

  private getLatency(startTime: number) {
    return Date.now() - startTime
  }
}
