import { Session } from '@openlab/deconf-shared';
import { SelectOption } from '../form/module';
import { ScheduleConfig, ScheduleFilterRecord } from '../lib/module';

export interface FilteredScheduleOptions {
  predicate(s: Session): boolean;
  filtersKey: string;
  scheduleConfig: ScheduleConfig;
  enabledFilters: (keyof ScheduleFilterRecord)[];
  languages: SelectOption[];
}
