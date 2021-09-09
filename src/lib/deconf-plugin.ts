import { Session } from '@openlab/deconf-shared';
import { MetricsEvent } from './metrics';

export interface DeconfPlugin {
  getCalendarLink(session: Session): string;
  trackMetric(metric: MetricsEvent): void;
}
