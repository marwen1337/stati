import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

export type MonitorResult = {
  status: MonitorStatus;
  metric: {
    primary: number;
    [key: string]: string | number;
  };
};
