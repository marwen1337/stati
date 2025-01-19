import { ConfigService } from '@app/config'

const defaultResultConfig = {
  keepForSeconds: 86400 * 30
}

export class ResultConfigService extends ConfigService<
  typeof defaultResultConfig
> {
  constructor() {
    super(defaultResultConfig, 'results')
  }
}
