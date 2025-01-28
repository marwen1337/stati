import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@app/config/config.service'

interface SharedConfig {
  port: number;
  cors: {
    origin: string;
  };
}

const initialSharedConfig = {
  port: 8080,
  cors: {
    origin: '*'
  }
}

@Injectable()
export class SharedConfigService extends ConfigService<SharedConfig> {
  protected logger: Logger

  constructor() {
    super(initialSharedConfig)
  }
}
