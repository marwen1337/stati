import { Module } from '@nestjs/common'
import { MonitorService } from './monitor.service'
import { MonitorController } from './monitor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MonitorEntity } from './model/monitor.entity'

@Module({
  controllers: [MonitorController],
  providers: [MonitorService],
  imports: [TypeOrmModule.forFeature([MonitorEntity])],
  exports: [MonitorService]
})
export class MonitorModule {}
