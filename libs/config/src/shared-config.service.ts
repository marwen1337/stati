import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@app/config/config.service'

interface SharedConfig {
  port: number
}

const initialSharedConfig = {
  port: 8080
}

@Injectable()
export class SharedConfigService extends ConfigService<SharedConfig> {
  protected logger: Logger

  constructor() {
    super(initialSharedConfig)
  }
}
