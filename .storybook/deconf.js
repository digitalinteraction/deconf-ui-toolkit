import { action } from '@storybook/addon-actions'

export class Deconf {
  getCalendarLink(session) {
    return `/session/${session.id}/ics`
  }
  trackMetric(metric) {
    const { eventName, payload } = metric
    action(`[metric] ${eventName}`)(payload)
  }
}
