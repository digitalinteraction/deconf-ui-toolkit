import { Session, SessionType, Speaker } from '../types';
import {
  Attendance,
  ConfigSettings,
  Registration,
  SessionSlot,
  Theme,
  Track
} from './types';

//
// TODO: move these to @openlab/deconf-shared
//
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
  settings: ConfigSettings;
  slots: SessionSlot[];
  speakers: Speaker[];
  themes: Theme[];
  tracks: Track[];
  types: SessionType[];
}
