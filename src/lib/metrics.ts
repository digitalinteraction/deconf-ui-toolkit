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

export function createLoginStartEvent(emailHash: string): MetricsEvent {
  return {
    eventName: 'login/start',
    payload: { emailHash }
  };
}

export function createLoginFinishEvent(): MetricsEvent {
  return {
    eventName: 'login/finish',
    payload: {}
  };
}

export function createLogoutEvent(): MetricsEvent {
  return {
    eventName: 'login/logout',
    payload: {}
  };
}

export function createRegisterStartEvent(country: string): MetricsEvent {
  return {
    eventName: 'register/start',
    payload: { country }
  };
}

export function createUnregisterEvent(confirmed: boolean): MetricsEvent {
  return {
    eventName: 'login/unregister',
    payload: { confirmed }
  };
}

export function createPageViewEvent(
  routeName: string,
  params: unknown
): MetricsEvent {
  return {
    eventName: 'general/pageView',
    payload: {
      routeName,
      params
    }
  };
}

export function createSessionLinkEvent(
  sessionId: string,
  action: 'click' | 'copy',
  link: string
): MetricsEvent {
  return {
    eventName: 'session/link',
    payload: { sessionId, action, link }
  };
}

export function createAtriumWidgetEvent(widget: string): MetricsEvent {
  return {
    eventName: 'atrium/widget',
    payload: { widget }
  };
}
