
export enum MonitorStatus {
  OK = 'ok',
  ERROR = 'error'
}

export type BaseMonitorIn = object

export type BaseMonitorOut = {
  status: MonitorStatus,
  metric: number
}

export interface BaseMonitor<V extends BaseMonitorIn = BaseMonitorIn, T extends BaseMonitorOut = BaseMonitorOut> {
  run(input: V): T | Promise<T>;
}
