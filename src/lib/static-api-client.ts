import {
  CarbonCalculation,
  LocalisedContent,
  LocalisedLink,
  PrivateCalendar,
  ScheduleRecord,
  SessionLinks,
  UserAttendance,
  UserRegistration,
  UserSessionAttendance,
} from '@openlab/deconf-shared';
import { DeconfApiClient } from './api-client';

export type DeconfStaticFiles = {
  'attendance.json': Record<string, number | undefined>;
  'schedule.json': ScheduleRecord; // Not really a ScheduleRecord but bad types
  'links.json': Record<string, LocalisedLink[] | undefined>;
  'content.json': Record<string, LocalisedContent | undefined>;
};

export class StaticDeconfApiClient<
  T extends DeconfStaticFiles = DeconfStaticFiles,
> extends DeconfApiClient {
  staticFiles = new Map<keyof T, unknown>();

  async getStaticFile<K extends keyof T>(path: K) {
    if (!this.staticFiles.has(path)) {
      this.staticFiles.set(path, await this.fetchJson(path as string));
    }
    return this.staticFiles.get(path) as T[K];
  }

  //
  // Attendance
  //
  override async attend() {
    return false;
  }
  override async unattend() {
    return false;
  }
  override async getSessionAttendance(
    sessionId: string,
  ): Promise<UserSessionAttendance | null> {
    const attendance = await this.getStaticFile('attendance.json');
    return {
      isAttending: false,
      sessionCount: attendance[sessionId] ?? 0,
    };
  }
  override async getUserAttendance(): Promise<UserAttendance | null> {
    return { attendance: [] };
  }

  //
  // Carbon?
  //
  override getCarbon(): Promise<CarbonCalculation | null> {
    throw new Error('Not implemented');
  }

  //
  // Calendar?
  //
  override createUserCalendar(): Promise<PrivateCalendar | null> {
    throw new Error('Not implemented');
  }

  //
  // Conference
  //
  override getSchedule(): Promise<ScheduleRecord | null> {
    return this.getStaticFile('schedule.json');
  }
  override async getLinks(sessionId: string): Promise<SessionLinks | null> {
    const links = await this.getStaticFile('links.json');
    return { links: links[sessionId] ?? [] };
  }

  //
  // Content
  //
  override async getContent(slug: string): Promise<LocalisedContent | null> {
    const content = await this.getStaticFile('content.json');
    return content[slug] ?? null;
  }

  //
  // Registration
  //
  override getRegistration(): Promise<UserRegistration | null> {
    throw new Error('Not implemented');
  }
  override startEmailLogin(): Promise<boolean> {
    throw new Error('Not implemented');
  }
  override startRegister(): Promise<boolean> {
    throw new Error('Not implemented');
  }
  override unregister(): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
