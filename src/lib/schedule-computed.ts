import { ScheduleRecord, Session } from '@openlab/deconf-shared';
import { ScheduleFilterRecord } from './schedule';
import {
  createFilterPredicate,
  DailySessions,
  groupSessionsByDay,
  SessionPredicate,
  SlotWithSessions,
} from './schedule';

export interface ScheduleThis extends ScheduleComputed {
  $i18n: {
    locale: string;
  };
  $t(...args: unknown[]): string;
  filters: ScheduleFilterRecord;
  schedule: ScheduleRecord;
  sessions: Session[];
  userSessions: string[];
  isDuringConference: boolean;
  scheduleDate: Date;
}

export interface ScheduleComputed {
  filterPredicate: SessionPredicate | null;
  filteredSessions: Session[];
  sessionsByDay: DailySessions[];
  previousDays: DailySessions[] | null;
  upcomingDays: DailySessions[] | null;
  searchResults: DailySessions[] | null;
}

type ComputedGenerator<T> = {
  [K in keyof T]: (this: ScheduleThis) => T[K];
};

function filterGroups(
  days: DailySessions[],
  predicate: (group: SlotWithSessions) => boolean,
): DailySessions[] {
  return days
    .map((day) => ({
      title: day.title,
      date: day.date,
      groups: day.groups.filter((g) => predicate(g)),
    }))
    .filter((d) => d.groups.length > 0);
}

export function scheduleComputed(): ComputedGenerator<ScheduleComputed> {
  return {
    filterPredicate() {
      return createFilterPredicate(
        this.$i18n.locale,
        this.filters,
        this.schedule,
      );
    },

    filteredSessions() {
      const showUserSessions = this.filters.viewMode === 'user';
      const userSessions = new Set(this.userSessions);

      return this.sessions.filter((session) => {
        if (showUserSessions && !userSessions.has(session.id)) return false;

        if (this.filterPredicate && !this.filterPredicate(session))
          return false;

        return true;
      });
    },

    sessionsByDay(): DailySessions[] {
      return groupSessionsByDay(this.filteredSessions, this.schedule.slots);
    },

    previousDays() {
      // If outside the conference or there is an active filter, do nothing
      if (!this.isDuringConference || this.filterPredicate) return null;

      const now = this.scheduleDate.getTime();

      return filterGroups(
        this.sessionsByDay,
        (group) => group.slot.end.getTime() < now,
      );
    },
    upcomingDays() {
      if (this.filterPredicate !== null) return this.searchResults;
      if (!this.isDuringConference) return this.sessionsByDay;

      const now = this.scheduleDate.getTime();

      return filterGroups(
        this.sessionsByDay,
        (group) => group.slot.end.getTime() > now,
      );
    },
    searchResults() {
      if (!this.filterPredicate) return null;

      const result = groupSessionsByDay(
        this.filteredSessions,
        this.schedule.slots,
      );

      // Add "search result" text to each day's title
      // written in a backwards-compatable array, so it still works
      // if the i18n string isn't set
      for (const item of result) {
        const newTitle = this.$t('deconf.schedule.resultHeading', [item.title]);

        item.title =
          newTitle !== 'deconf.schedule.resultHeading'
            ? newTitle
            : `${item.title} - Search Results`;
      }

      return result;
    },
  };
}
