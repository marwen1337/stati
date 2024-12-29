import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@app/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgentModule } from './agent/agent.module'
import { MonitorModule } from './monitor/monitor.module'
import { ResultModule } from './result/result.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule,
    AgentModule,
    MonitorModule,
    ResultModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
