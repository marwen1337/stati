import { Module } from '@nestjs/common'
import { MonitorService } from './monitor.service'
import { MonitorController } from './monitor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MonitorEntity } from './model/monitor.entity'
import { ResultModule } from '../result/result.module'

@Module({
  controllers: [MonitorController],
  providers: [MonitorService],
  imports: [TypeOrmModule.forFeature([MonitorEntity]), ResultModule],
  exports: [MonitorService]
})
export class MonitorModule {}
