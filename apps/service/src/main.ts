import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SharedConfigService } from '@app/config/shared-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(SharedConfigService)
  await app.listen(configService.get('port'))
}
bootstrap()
