import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationConfigService } from './notification-config.service'

@Module({
  providers: [NotificationService, NotificationConfigService],
  exports: [NotificationService]
})
export class NotificationModule {}
