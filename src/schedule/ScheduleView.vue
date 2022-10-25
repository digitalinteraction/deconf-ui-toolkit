<template>
  <div class="scheduleView" v-if="schedule">
    <div class="scheduleView-header">
      <div class="scheduleView-headerSplit">
        <h1 class="scheduleView-title">
          <slot name="title">
            {{ $t('deconf.schedule.title') }}
          </slot>
        </h1>
        <div class="scheduleView-viewControl">
          <SegmentControl
            v-model="filters.viewMode"
            :options="viewModeOptions"
          />
        </div>
      </div>
      <p class="scheduleView-content">
        <slot name="infoText">
          {{ $t('deconf.schedule.infoText') }}
        </slot>
      </p>
      <ScheduleFilters
        :schedule="schedule"
        :filters="filters"
        :enabled-filters="enabledFilters"
        @filter="onFilter"
        :language-options="languageOptions"
      />
    </div>
    <div class="scheduleView-blocks">
      <!--
          Space for sessions that have already passed.
          Only shown when "during" the conference
        -->
      <template v-if="previousDays && previousDays.length > 0">
        <template v-if="showPastSessions">
          <div
            class="scheduleView-day is-passed"
            v-for="day in previousDays"
            :key="day.title + '-past'"
          >
            <StickyHeading :title="day.title" title-class="is-dark">
              <ScheduleBlock
                v-for="group of day.groups"
                :key="group.slot.id"
                :current-date="scheduleDate"
                :session-slot="group.slot"
                :sessions="group.sessions"
                :schedule="schedule"
                :config="config"
                :show-other-sessions="showOtherSessions"
              />
            </StickyHeading>
          </div>
        </template>
        <div class="scheduleView-toggleHistory">
          <div class="buttons is-centered">
            <button class="button is-text" @click="togglePastSessions">
              {{ localePastAction }}
            </button>
          </div>
        </div>
      </template>

      <NoResults v-if="filteredSessions.length === 0">
        <slot name="noResults">
          {{ $t('deconf.schedule.noResults') }}
        </slot>
      </NoResults>

      <div
        class="scheduleView-day"
        v-else
        v-for="day of upcomingDays"
        :key="day.title"
      >
        <StickyHeading :title="day.title">
          <ScheduleBlock
            v-for="group of day.groups"
            :key="group.slot.id"
            :current-date="scheduleDate"
            :session-slot="group.slot"
            :sessions="group.sessions"
            :schedule="schedule"
            :config="config"
            :show-other-sessions="showOtherSessions"
          />
        </StickyHeading>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { TranslateResult } from 'vue-i18n';
import { ScheduleRecord, Session } from '@openlab/deconf-shared';

import {
  loadScheduleFilters,
  encodeScheduleFilters,
  scheduleComputed,
  ScheduleConfig,
} from '../lib/module';
import ScheduleFilters from './filtering/ScheduleFilters.vue';
import StickyHeading from './StickyHeading.vue';
import ScheduleBlock from './ScheduleBlock.vue';
import NoResults from './NoResults.vue';
import { SegmentControl, SelectOption } from '../form/module';
import { ScheduleFilterRecord } from '../lib/module';

//
// i18n
// - deconf.schedule.title [or via slot]
// - deconf.schedule.infoText [or via slot]
// - deconf.schedule.noResults [or via slot]
// - deconf.schedule.allSessions
// - deconf.schedule.userSessions
// - deconf.schedule.hidePast
// - deconf.schedule.showPast
// - deconf.schedule.resultHeading
//
// icons
// - n/a
//
// sass
// - $scheduleView-titleSize
// - $scheduleView-titleWeight
// - $scheduleView-titleFamily
// - $scheduleView-headingHeight
// - $scheduleView-background
//

interface Data {
  showPastSessions: boolean;
  filters: ScheduleFilterRecord;
}

export default {
  name: 'ScheduleView',
  components: {
    ScheduleFilters,
    StickyHeading,
    ScheduleBlock,
    NoResults,
    SegmentControl,
  },
  props: {
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    filtersKey: { type: String, required: true },
    enabledFilters: {
      type: Array as PropType<Array<keyof ScheduleFilterRecord>>,
      default: undefined,
    },
    userSessions: {
      type: Array as PropType<string[]>,
      required: true,
    },
    config: {
      type: Object as PropType<ScheduleConfig>,
      required: true,
    },
    scheduleDate: {
      type: Date as PropType<Date>,
      required: true,
    },
    isDuringConference: {
      type: Boolean,
      required: true,
    },
    languageOptions: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    urlFilters: {
      type: Object as PropType<ScheduleFilterRecord | null>,
      default: null,
    },
  },
  data(): Data {
    return {
      showPastSessions: false,
      filters: this.urlFilters || loadScheduleFilters(this.filtersKey),
    };
  },
  computed: {
    localePastAction(): TranslateResult {
      return this.showPastSessions
        ? this.$t('deconf.schedule.hidePast')
        : this.$t('deconf.schedule.showPast');
    },
    ...scheduleComputed(),
    showOtherSessions(): boolean {
      return this.filteredSessions.length < 50;
    },
    viewModeOptions(): SelectOption[] {
      return [
        { value: 'all', text: this.$t('deconf.schedule.allSessions') },
        { value: 'user', text: this.$t('deconf.schedule.userSessions') },
      ];
    },
  },
  methods: {
    onFilter(filters: ScheduleFilterRecord) {
      this.filters = filters;

      this.$emit('filter', filters);

      window.setTimeout(() => {
        const encoded = encodeScheduleFilters(filters);
        localStorage.setItem(this.filtersKey, JSON.stringify(encoded));
      });
    },
    togglePastSessions() {
      this.showPastSessions = !this.showPastSessions;
    },
  },
};
</script>

<style lang="scss">
$scheduleView-titleSize: $size-3 !default;
$scheduleView-titleWeight: bold !default;
$scheduleView-titleFamily: $family-title !default;
$scheduleView-headingHeight: 42px !default;
$scheduleView-background: $background !default;

.scheduleView {
  flex: 1; // Fill AppLayout
  background: $scheduleView-background;
  padding-bottom: $block-spacing * 5;

  .scheduleBlock-slot {
    top: calc(#{$navbar-height} + #{$scheduleView-headingHeight});
  }
}
.scheduleView-header {
  padding: $block-spacing;
  background-color: $white;
  border-bottom: 1px solid $border;
}
.scheduleView-headerSplit {
  display: flex;
  justify-content: space-between;
  @include mobile {
    flex-direction: column-reverse;
    .scheduleView-title {
      width: 100%;
    }
    .inlineField {
      margin-bottom: 1em;
      display: flex;

      > * {
        font-size: 0.75em;
        flex: 1;
      }
    }
  }
}
.scheduleView-toggleHistory {
  background: $scheduleView-background;
  padding: $block-spacing 0;

  position: sticky;
  bottom: 0;
  z-index: 5;
}
.scheduleView-title {
  font-size: $scheduleView-titleSize;
  font-weight: $scheduleView-titleWeight;
  font-family: $scheduleView-titleFamily;
}
.scheduleView-content {
  margin-bottom: 0.5rem;
}
</style>
