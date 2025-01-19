import { MonitorStatus } from '@app/shared/model/monitor-status.enum'
import { MonitorEntity } from '../../monitor/model/monitor.entity'

export interface NotificationProvider {
  sendStatusUpdate(
    monitor: MonitorEntity,
    newStatus: MonitorStatus,
  ): void | Promise<void>;
}
