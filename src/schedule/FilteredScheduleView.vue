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
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:noResults>
      <slot name="noResults"></slot>
    </template>
    <template v-slot:infoText>
      <slot name="infoText"></slot>
    </template>
  </ScheduleView>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ScheduleRecord, Session } from '@openlab/deconf-shared';
import {
  decodeUrlScheduleFilters,
  encodeScheduleFilters,
  ScheduleFilterRecord,
  filterScheduleFromSessions,
  getScheduleStartAndEnd,
  isInRange,
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

export interface _Data {
  urlFilters: ScheduleFilterRecord | null;
}

export default defineComponent({
  name: 'FilteredScheduleView',
  components: { ScheduleView },
  props: {
    schedule: {
      type: Object as PropType<ScheduleRecord>,
      required: true,
    },
    userSessions: {
      type: Array as PropType<string[]>,
      required: false,
    },
    options: {
      type: Object as PropType<FilteredScheduleOptions>,
      required: true,
    },
    scheduleDate: {
      type: Date as PropType<Date>,
      required: true,
    },
    routeQuery: {
      type: Object,
      default: () => ({}),
    },
  },
  data(): _Data {
    return {
      urlFilters: decodeUrlScheduleFilters(this.routeQuery),
    };
  },
  computed: {
    filteredSessions(): Session[] {
      return this.schedule.sessions.filter(
        (s) => s.slot && this.options.predicate(s),
      );
    },
    isDuringConference(): boolean {
      const range = getScheduleStartAndEnd(
        this.filteredSessions,
        this.schedule,
      );
      if (!range) return false;
      return isInRange(range, this.scheduleDate);
    },
    filteredSchedule(): ScheduleRecord {
      return filterScheduleFromSessions(this.schedule, this.filteredSessions);
    },
  },
  methods: {
    onFilter(filters: ScheduleFilterRecord) {
      this.$emit('filter', encodeScheduleFilters(filters));
    },
  },
});
</script>
