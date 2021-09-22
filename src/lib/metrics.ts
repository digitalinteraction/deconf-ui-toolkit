// TODO: review use of this against new Metrics structs
// - could they be classes?
// - or a class with static methods?
//   so MetricsEvent.ical(sessionId)

// class MetricsEvent {
//   constructor(public eventName: string, public payload: unknown) {}
// }
//
// class CalendarMetric extends MetricsEvent {
//   constructor(sessionId: string) {
//     super('session/ical', { sessionId })
//   }
// }

// class MetricsEvent2 {
//   constructor(public eventName: string, public payload: unknown) {}
//
//   static ical(sessionId: string): MetricsEvent2 {
//     return {
//       eventName: 'session/ical',
//       payload: { sessionId }
//     }
//   }
// }

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
