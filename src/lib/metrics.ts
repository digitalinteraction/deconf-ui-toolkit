export interface MetricsEvent {
  eventName: string;
  payload: unknown;
}

export function createICalEvent(sessionId: string): MetricsEvent {
  return {
    eventName: `session/ical`,
    payload: { sessionId }
  };
}

export function createAttendanceEvent(
  action: 'attend' | 'unattend',
  sessionId: string
): MetricsEvent {
  return {
    eventName: `attendance/${action}`,
    payload: {
      sessionId
    }
  };
}

export function createLoginStartEvent(): MetricsEvent {
  return {
    eventName: 'login/start',
    payload: {}
  };
}

export function createLoginFinishEvent(): MetricsEvent {
  return {
    eventName: 'login/finish',
    payload: {}
  };
}

export function createLinkClickEvent(
  sessionId: string,
  link: string
): MetricsEvent {
  return {
    eventName: `session/link-clicked`,
    payload: {
      sessionId,
      link
    }
  };
}

export function createLinkCopyEvent(
  sessionId: string,
  link: string
): MetricsEvent {
  return {
    eventName: `session/link-copied`,
    payload: {
      sessionId,
      link
    }
  };
}

export function createLogoutEvent(): MetricsEvent {
  return {
    eventName: 'login/logout',
    payload: {}
  };
}
