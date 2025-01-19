import { ConfigService } from '@app/config'

type NotificationConfig = {
  pushover: {
    enabled: boolean;
    token: string | undefined;
    user: string | undefined;
    device: string | undefined;
  };
};

const defaultNotificationConfig: NotificationConfig = {
  pushover: {
    enabled: false,
    token: undefined,
    user: undefined,
    device: undefined
  }
}

export class NotificationConfigService extends ConfigService<NotificationConfig> {
  constructor() {
    super(defaultNotificationConfig, 'notifications')
  }
}
