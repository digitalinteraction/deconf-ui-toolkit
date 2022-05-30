import {
  Attendance,
  ConferenceConfig,
  Registration,
  Session,
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Track,
} from '@openlab/deconf-shared';

export interface AuthenticateOptions {
  token: string;
}

/** @deprecated use deconf-shared `UserSessionAttendance` */
export interface SessionAttendance {
  isAttending: boolean;
  attendance: Attendance | null;
  sessionCount: number;
}

/** @deprecated use deconf-shared `UserSessionAttendanceJson` */
export interface SessionAttendanceJson {
  isAttending: boolean;
  attendance: Attendance | null;
  sessionCount: string;
}

/** @deprecated use deconf-shared `UserRegistration` */
export interface ProfileResponse {
  profile: Registration;
}

/** @deprecated use deconf-shared `ScheduleRecord` */
export interface FullSchedule {
  sessions: Session[];
  settings: ConferenceConfig;
  slots: SessionSlot[];
  speakers: Speaker[];
  themes: Theme[];
  tracks: Track[];
  types: SessionType[];
}
