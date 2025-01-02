import { Module } from '@nestjs/common'
import { MonitoringService } from './monitoring.service'
import { MonitorModule } from '../monitor/monitor.module'

@Module({
  providers: [MonitoringService],
  imports: [MonitorModule]
})
export class MonitoringModule {}
