import { ConfigService } from '@app/config'

const defaultResultConfig = {
  keepFor: 86400 * 30
}

export class ResultConfigService extends ConfigService<
  typeof defaultResultConfig
> {
  constructor() {
    super(defaultResultConfig, 'results')
  }
}
