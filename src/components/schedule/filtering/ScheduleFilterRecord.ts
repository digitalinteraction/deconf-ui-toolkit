// TODO: be exported in the module

export interface ScheduleFilterRecord {
  query: string;
  sessionType: string | null;
  track: string | null;
  theme: string | null;
  date: Date | null;
  isRecorded: boolean | null;
  viewMode: 'all' | 'user';
}
