import { NotificationProvider } from './notification-provider.interface'
import { MonitorEntity } from '../../monitor/model/monitor.entity'
import { MonitorStatus } from '@app/shared/model/monitor-status.enum'
import { Logger } from '@nestjs/common'

export class PushoverNotificationProvider implements NotificationProvider {
  private logger: Logger = new Logger(PushoverNotificationProvider.name)
  private apiEndpoint = 'https://api.pushover.net/1/messages.json'
  constructor(
    private token: string,
    private user: string,
    private device?: string,
  ) {}

  async sendStatusUpdate(monitor: MonitorEntity, newStatus: MonitorStatus) {
    const formData = new FormData()
    formData.set('token', this.token)
    formData.set('user', this.user)
    formData.set('title', `${newStatus}: ${monitor.name}`)
    formData.set('html', '1')
    formData.set(
      'message',
      `The status of the monitor <b>${monitor.name}</b> changed to <b>${newStatus}</b>`,
    )
    if (!!this.device) {
      formData.set('device', this.device)
    }

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        ContentType: 'application/json'
      },
      body: formData
    })

    if (!response.ok) {
      this.logger.error(
        `Error sending Pushover notification: ${response.status} ${response.statusText}`,
      )
      this.logger.debug(await response.json())
    }
  }
}
