import { MonitorConfiguration } from '@app/shared/model/monitor-configuration.type'
import { MonitorResult } from '@app/shared/model/monitor-result.type'

export interface BaseMonitor<
  V extends MonitorConfiguration = MonitorConfiguration,
  T extends MonitorResult = MonitorResult,
> {
  run(input: V): T | Promise<T>;
}
