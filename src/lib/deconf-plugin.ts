import { Session } from '@openlab/deconf-shared';
import { Component } from 'vue';
import { MetricsEvent } from './metrics';

export interface DeconfPlugin {
  getCalendarLink(session: Session): string | null;
  trackMetric(metric: MetricsEvent): void;

  showDialog(component: Component, props: Record<string, unknown>): void;
  closeDialog(): void;
}
