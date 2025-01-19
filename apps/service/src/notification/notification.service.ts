import { Injectable, Logger } from '@nestjs/common'
import { NotificationConfigService } from './notification-config.service'
import { PushoverNotificationProvider } from './providers/pushover-notification.provider'
import { NotificationProvider } from './providers/notification-provider.interface'
import { MonitorEntity } from '../monitor/model/monitor.entity'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'

@Injectable()
export class NotificationService {
  private logger: Logger = new Logger(NotificationService.name)
  private notificationProviders: NotificationProvider[] = []
  constructor(configService: NotificationConfigService) {
    const config = configService.getObject()

    if (config.pushover.enabled) {
      this.notificationProviders.push(
        new PushoverNotificationProvider(
          config.pushover.token,
          config.pushover.user,
          config.pushover.device,
        ),
      )
    }
    this.logger.log(
      `Done loading configured notification providers (${this.notificationProviders.length})`,
    )
  }

  sendStatusNotification(monitor: MonitorEntity, newStatus: MonitorStatus) {
    for (const notificationService of this.notificationProviders) {
      notificationService.sendStatusUpdate(monitor, newStatus)
    }
  }
}
