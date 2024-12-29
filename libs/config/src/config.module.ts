import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { SharedConfigService } from '@app/config/shared-config.service'

@Module({
  providers: [ConfigService, SharedConfigService],
  exports: [ConfigService, SharedConfigService]
})
export class ConfigModule {}
