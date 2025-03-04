import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@app/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgentModule } from './agent/agent.module'
import { MonitorModule } from './monitor/monitor.module'
import { ResultModule } from './result/result.module'
import { UtilityModule } from './utility/utility.module'
import { MonitoringModule } from './monitoring/monitoring.module'
import { ScheduleModule } from '@nestjs/schedule'
import { NotificationModule } from './notification/notification.module'
import { SqliteDatasourceOptions } from './app.datasource'
import * as process from 'node:process'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...SqliteDatasourceOptions,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
      migrationsRun: true
    }),
    ScheduleModule.forRoot(),
    ConfigModule,
    AgentModule,
    MonitorModule,
    ResultModule,
    UtilityModule,
    MonitoringModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
