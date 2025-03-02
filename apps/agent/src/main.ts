import { NestFactory } from '@nestjs/core'
import { AgentModule } from './agent.module'
import { io } from 'socket.io-client'
import { AgentConfigService } from './agent-config.service'
import { Logger } from '@nestjs/common'
import { MonitoringService } from './monitoring/monitoring.service'
import { MessageType } from '@app/shared/model/message-type.enum'

async function bootstrap() {
  const logger = new Logger('main')
  const app = await NestFactory.createApplicationContext(AgentModule)
  const config = app.get(AgentConfigService)
  const monitoringService = app.get(MonitoringService)

  const url = new URL(config.get('server.url'))
  const server = `${url.protocol}//${url.host}`
  const socket = io(server, {
    auth: { accessKey: config.get('accesskey') },
    path: `${url.pathname}/socket.io`
  })

  socket.on('connect', () => {
    logger.log(`Connected to ${url}`)
  })
  socket.on('connect_error', (err) => {
    logger.log(`Error connecting to ${url}`, err)
  })
  socket.on('disconnect', (reason) => {
    logger.log(`Disconnected from ${url}`, reason)
  })

  socket.on(MessageType.RUN_MONITOR, async (content, callback) => {
    logger.log(`Running Monitor: ${content.monitorId!}`)
    const result = await monitoringService.runMonitor(
      content.monitorType!,
      content.data!
    )
    logger.log(`Sending result to server for Monitor ${content.monitorId!}`)
    callback({
      monitorId: content.monitorId,
      data: result
    })
  })
}
bootstrap()
