import { NestFactory } from '@nestjs/core'
import { AgentModule } from './agent.module'

async function bootstrap() {
  const app = await NestFactory.create(AgentModule)
  await app.listen(process.env.port ?? 3000)
}
bootstrap()
