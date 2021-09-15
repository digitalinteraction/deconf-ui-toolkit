<template>
  <div class="scheduleView" v-if="schedule">
    <div class="scheduleView-header">
      <div class="scheduleView-headerSplit">
        <h1 class="scheduleView-title">
          {{ $t('deconf.schedule.title') }}
        </h1>
        <div class="scheduleView-viewControl">
          <!-- <SegmentField
              v-model="filters.viewMode"
              :options="viewModeOptions"
            /> -->
        </div>
      </div>
      <p class="scheduleView-content">
        <!-- <FilterContent /> -->
      </p>
      <ScheduleFilters
        :session-types="schedule.types"
        :session-slots="schedule.slots"
        :tracks="schedule.tracks"
        :themes="schedule.themes"
        :filters="filters"
        :enabledFilters="enabledFilters"
        @filter="onFilter"
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
        {{ $t('deconf.schedule.noResults') }}
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
import { PropType, defineComponent } from 'vue'
import {
  ScheduleFilterRecord,
  SelectOption,
  ScheduleFilters,
  StickyHeading,
  ScheduleBlock,
  NoResults,
} from '../../components/module'
import {
  FullSchedule,
  loadScheduleFilters,
  scheduleComputed,
  ScheduleConfig,
} from '../../lib/module'
import { Session } from '@openlab/deconf-shared'

//
// i18n
// - deconf.schedule.title
// - deconf.schedule.noResults
// - deconf.schedule.allSessions
// - deconf.schedule.userSessions
// - deconf.schedule.hidePast
// - deconf.schedule.showPast
//
// icons
// - n/a
//
// sass
// - $scheduleView-titleSize
// - $scheduleView-titleWeight
// - $scheduleView-headingHeight
// - $scheduleView-background
//
// TODO:
// - refactor to one v-for
// - user sessions toggle
//

interface Data {
  showPastSessions: boolean
  filters: ScheduleFilterRecord
  viewModeOptions: SelectOption[]
}

export default defineComponent({
  name: 'ScheduleView',
  components: { ScheduleFilters, StickyHeading, ScheduleBlock, NoResults },
  props: {
    schedule: { type: Object as PropType<FullSchedule>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    filtersKey: { type: String, required: true },
    enabledFilters: {
      type: Array as PropType<Array<keyof ScheduleFilterRecord>>,
      default: undefined,
    },
    // userSessions: {
    //   type: Array as PropType<string[]>,
    //   required: true
    // },
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
  },
  data(): Data {
    return {
      showPastSessions: false,
      filters: loadScheduleFilters(this.filtersKey),
      viewModeOptions: [
        { value: 'all', text: this.$t('deconf.schedule.allSessions') },
        { value: 'user', text: this.$t('deconf.schedule.userSessions') },
      ],
    }
  },
  computed: {
    localePastAction(): string {
      return this.showPastSessions
        ? this.$t('deconf.schedule.hidePast')
        : this.$t('deconf.schedule.showPast')
    },
    ...scheduleComputed(),
    showOtherSessions(): boolean {
      return this.filteredSessions.length < 50
    },
  },
  methods: {
    onFilter(filters: ScheduleFilterRecord) {
      this.filters = filters

      window.setTimeout(() => {
        const json = JSON.stringify(filters)
        localStorage.setItem(this.filtersKey, json)
      })
    },
    togglePastSessions() {
      this.showPastSessions = !this.showPastSessions
    },
  },
})
</script>

<style lang="scss">
$scheduleView-titleSize: $size-3 !default;
$scheduleView-titleWeight: bold !default;
$scheduleView-headingHeight: 42px !default;
$scheduleView-background: $background !default;

.scheduleView {
  flex: 1; // Fill AppLayout
  background: $scheduleView-background;
  padding-bottom: $block-spacing * 5;

  .scheduleBlock-slot {
    top: calc(#{$navbar-height} + $scheduleView-headingHeight);
  }
}
.scheduleView-header {
  padding: $block-spacing;
  background-color: $white;
  border-bottom: 1px solid $border;
}
.scheduleView-toggleHistory {
  background: $scheduleView-background;
  padding: $block-spacing 0;
}
.scheduleView-title {
  // TODO: font-family
  font-size: $scheduleView-titleSize;
  font-weight: $scheduleView-titleWeight;
}
</style>
