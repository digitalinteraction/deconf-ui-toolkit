<template>
  <ScheduleView
    :schedule="filteredSchedule"
    :sessions="filteredSessions"
    :user-sessions="userSessions || []"
    :schedule-date="scheduleDate"
    :url-filters="urlFilters"
    @filter="onFilter"
    :filters-key="options.filtersKey"
    :config="options.scheduleConfig"
    :enabled-filters="options.enabledFilters"
    :is-during-conference="isDuringConference"
    :language-options="options.languages"
  >
    <slot name="title" slot="title" />
    <slot name="noResults" slot="noResults" />
    <slot name="infoText" slot="infoText" />
  </ScheduleView>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ScheduleRecord, Session } from '@openlab/deconf-shared';
import {
  decodeUrlScheduleFilters,
  encodeScheduleFilters,
  ScheduleFilterRecord,
  filterScheduleFromSessions,
  getScheduleStartAndEnd,
  isInRange
} from '../lib/module';

import ScheduleView from './ScheduleView.vue';
import { FilteredScheduleOptions } from './filtered-schedule-options';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//
// events
// - filter — when the user changes the filter (useful to update URL parameters)
//

interface Data {
  urlFilters: ScheduleFilterRecord | null;
}

export default {
  name: 'FilteredScheduleView',
  components: { ScheduleView },
  props: {
    schedule: {
      type: Object as PropType<ScheduleRecord>,
      required: true
    },
    userSessions: {
      type: Array as PropType<string[]>,
      required: false
    },
    options: {
      type: Object as PropType<FilteredScheduleOptions>,
      required: true
    },
    scheduleDate: {
      type: Date as PropType<Date>,
      required: true
    },
    routeQuery: {
      type: Object,
      default: () => ({})
    }
  },
  data(): Data {
    return {
      urlFilters: decodeUrlScheduleFilters(this.routeQuery)
    };
  },
  computed: {
    filteredSessions(): Session[] {
      return this.schedule.sessions.filter(
        s => s.slot && this.options.predicate(s)
      );
    },
    isDuringConference(): boolean {
      const range = getScheduleStartAndEnd(
        this.filteredSessions,
        this.schedule
      );
      if (!range) return false;
      return isInRange(range, this.scheduleDate);
    },
    filteredSchedule(): ScheduleRecord {
      return filterScheduleFromSessions(this.schedule, this.filteredSessions);
    }
  },
  methods: {
    onFilter(filters: ScheduleFilterRecord) {
      this.$emit('filter', encodeScheduleFilters(filters));
    }
  }
};
</script>
