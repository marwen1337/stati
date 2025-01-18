
export enum MonitorStatus {
  OK = 'OK',
  ERROR = 'ERROR'
}

export type BaseMonitorIn = object

export type BaseMonitorOut = {
  status: MonitorStatus,
  metric: {
    primary: number
  }
}

export interface BaseMonitor<V extends BaseMonitorIn = BaseMonitorIn, T extends BaseMonitorOut = BaseMonitorOut> {
  run(input: V): T | Promise<T>;
}
