import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SharedConfigService } from '@app/config/shared-config.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(SharedConfigService)
  await app.listen(configService.get('port'))
}
bootstrap()
