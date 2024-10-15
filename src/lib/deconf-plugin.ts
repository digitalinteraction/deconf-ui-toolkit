import { Session } from '@openlab/deconf-shared';
import { Component } from 'vue';
import { MetricsEvent } from './metrics';

export interface ShowDialogOptions {
  size: 'small' | 'regular';
}

export interface DeconfPlugin {
  getCalendarLink(session: Session, kind: 'ical' | 'google'): string | null;

  /** @deprecated pass `kind` paremeter */
  getCalendarLink(session: Session): string | null;

  trackMetric(metric: MetricsEvent): void;

  showDialog(
    component: Component,
    props: Record<string, unknown>,
    options?: ShowDialogOptions,
  ): void;
  closeDialog(): void;

  /** @experimental — stablise in next major-version */
  apiModule?: string;
}
