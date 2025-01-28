import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SharedConfigService } from '@app/config/shared-config.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(SharedConfigService)

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: configService.get('cors.origin')
  })
  await app.listen(configService.get('port'))
}
bootstrap()
