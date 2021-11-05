import {
  Attendance,
  ConferenceConfig,
  Registration,
  Session,
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Track
} from '@openlab/deconf-shared';

export interface AuthenticateOptions {
  token: string;
}
export interface SessionAttendance {
  isAttending: boolean;
  attendance: Attendance | null;
  sessionCount: number;
}
export interface SessionAttendanceJson {
  isAttending: boolean;
  attendance: Attendance | null;
  sessionCount: string;
}
export interface ProfileResponse {
  profile: Registration;
}
export interface FullSchedule {
  sessions: Session[];
  settings: ConferenceConfig;
  slots: SessionSlot[];
  speakers: Speaker[];
  themes: Theme[];
  tracks: Track[];
  types: SessionType[];
}
