import { NestFactory } from '@nestjs/core'
import { AgentModule } from './agent.module'
import { io } from 'socket.io-client'
import { AgentConfigService } from './agent-config.service'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('main')
  const app = await NestFactory.createApplicationContext(AgentModule)
  const config = app.get(AgentConfigService)

  const socket = io(
    `ws://${config.get('server.host')}:${config.get('server.port')}`,
    {
      auth: { accessKey: config.get('accesskey') }
    },
  )

  socket.on('connect', () => {
    logger.log(`Connected`)
  })
  socket.on('connect_error', (err) => {
    logger.log(`Error connecting`, err)
  })
  socket.on('disconnect', (reason) => {
    logger.log(`Disconnected`, reason)
  })

  socket.on('runMonitor', (content) => {
    logger.log(`Running Monitor: ${content}`)
  })
}
bootstrap()
