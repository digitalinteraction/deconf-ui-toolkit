import { Attendance, Registration } from '@openlab/deconf-shared';

export enum ApiState {
  init = 'init',
  ready = 'ready',
  error = 'error'
}

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
