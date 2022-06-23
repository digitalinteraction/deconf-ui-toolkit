import {
  CarbonCalculation,
  LocalisedContent,
  PrivateCalendar,
  ScheduleRecord,
  SessionLinks,
  UserAttendance,
  UserRegistration,
  UserSessionAttendance,
} from '@openlab/deconf-shared';

export type DeconfEndpointRecord = Record<
  string,
  ((...keys: string[]) => string) | undefined
>;

// prettier-ignore
export const deconfDefaultEndpoints: DeconfEndpointRecord = {
  'AttendanceRoutes.attend': (sessionId) => `attendance/${sessionId}/attend`,
  'AttendanceRoutes.unattend': (sessionId) => `attendance/${sessionId}/unattend`,
  'AttendanceRoutes.getSessionAttendance': (sessionId) => `attendance/${sessionId}`,
  'AttendanceRoutes.getUserAttendance': () => `attendance/me`,

  'CarbonRoutes.getCarbon': () => `carbon/estimate`,

  'CalendarRoutes.getSessionIcsFile': (sessionId) => `calendar/ical/${sessionId}`,
  'CalendarRoutes.getGoogleCalendarUrl': (sessionId) => `calendar/google/${sessionId}`,
  'CalendarRoutes.getUserIcs': (token) => `calendar/me/${token}`,
  'CalendarRoutes.createUserCalendar': () => `calendar/me`,

  'ConferenceRoutes.generateIcs': (sessionId) => `schedule/${sessionId}/ics`,
  'ConferenceRoutes.getSchedule': () => `schedule`,
  'ConferenceRoutes.getLinks': (sessionId) => `schedule/${sessionId}/links`,
  'ConferenceRoutes.lintSessions': () => 'schedule/lint',

  'ContentRoutes.getContent': (slug) => `content/${slug}`,

  'RegistrationRoutes.getRegistration': () => `auth/me`,
  'RegistrationRoutes.startEmailLogin': () => `auth/login`,
  'RegistrationRoutes.finishEmailLogin': (token) => `auth/login/${token}`,
  'RegistrationRoutes.startRegister': () => `auth/register`,
  'RegistrationRoutes.finishRegister': (token) => `auth/register/${token}`,
  'RegistrationRoutes.unregister': () => `auth/unregister`,
};

const jsonHeaders = { 'Content-Type': 'application/json' };

interface DeconfApiClientOptions {
  endpointMap?: DeconfEndpointRecord;
}

export class DeconfApiClient {
  authToken: string | null = null;

  constructor(
    public baseUrl: string,
    public options: DeconfApiClientOptions = {}
  ) {}

  //
  // Helpers
  //
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }
  applyAuthToken(init: RequestInit): void {
    if (this.authToken) {
      const headers = (init.headers = new Headers(init.headers));
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
  }
  getEndpoint(key: string, ...args: string[]): string {
    const getter =
      this.options?.endpointMap?.[key] ?? deconfDefaultEndpoints[key];
    if (!getter) throw new Error(`Unknown endpoint '${key}'`);
    return getter(...args);
  }
  async fetch(endpoint: string, init: RequestInit = {}): Promise<boolean> {
    this.applyAuthToken(init);
    return fetch(new URL(endpoint, this.baseUrl).toString(), init).then(
      (r) => r.ok
    );
  }
  async fetchJson<T>(
    endpoint: string,
    init: RequestInit = {}
  ): Promise<T | null> {
    this.applyAuthToken(init);
    return fetch(new URL(endpoint, this.baseUrl).toString(), init).then(
      (r) => r.json() as Promise<T>,
      (error) => (console.error(error), null)
    );
  }

  //
  // Attendance
  //
  attend(sessionId: string): Promise<boolean> {
    return this.fetch(this.getEndpoint('AttendanceRoutes.attend', sessionId), {
      method: 'POST',
    });
  }
  unattend(sessionId: string): Promise<boolean> {
    return this.fetch(
      this.getEndpoint('AttendanceRoutes.unattend', sessionId),
      { method: 'POST' }
    );
  }
  getSessionAttendance(
    sessionId: string
  ): Promise<UserSessionAttendance | null> {
    return this.fetchJson(
      this.getEndpoint('AttendanceRoutes.getSessionAttendance', sessionId)
    );
  }
  getUserAttendance(): Promise<UserAttendance | null> {
    return this.fetchJson(
      this.getEndpoint('AttendanceRoutes.getUserAttendance')
    );
  }

  //
  // Carbon
  //
  getCarbon(): Promise<CarbonCalculation | null> {
    return this.fetchJson(this.getEndpoint('CarbonRoutes.getCarbon'));
  }

  //
  // Calendar
  //
  createUserCalendar(): Promise<PrivateCalendar | null> {
    return this.fetchJson(
      this.getEndpoint('CalendarRoutes.createUserCalendar')
    );
  }

  //
  // Conference
  //
  getSchedule(): Promise<ScheduleRecord | null> {
    return this.fetchJson(this.getEndpoint('ConferenceRoutes.getSchedule'));
  }
  getLinks(sessionId: string): Promise<SessionLinks | null> {
    return this.fetchJson(
      this.getEndpoint('ConferenceRoutes.getLinks', sessionId)
    );
  }

  //
  // Content
  //
  getContent(slug: string): Promise<LocalisedContent | null> {
    return this.fetchJson(this.getEndpoint('ContentRoutes.getContent', slug));
  }

  //
  // Registration
  //
  getRegistration(): Promise<UserRegistration | null> {
    return this.fetchJson(
      this.getEndpoint('RegistrationRoutes.getRegistration')
    );
  }
  startEmailLogin(email: string): Promise<boolean> {
    return this.fetch(this.getEndpoint('RegistrationRoutes.startEmailLogin'), {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { ...jsonHeaders },
    });
  }
  startRegister(body: Record<string, unknown>): Promise<boolean> {
    return this.fetch(this.getEndpoint('RegistrationRoutes.startRegister'), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { ...jsonHeaders },
    });
  }
  unregister(): Promise<boolean> {
    return this.fetch(this.getEndpoint('RegistrationRoutes.unregister'));
  }
}
