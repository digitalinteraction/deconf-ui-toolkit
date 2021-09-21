<template>
  <div class="scheduleFilters">
    <div class="scheduleFilters-row">
      <!-- Query -->
      <div class="inlineField" v-if="isEnabled('query')">
        <div class="button is-static">
          {{ $t('deconf.scheduleFilters.query') }}
        </div>
        <input
          type="text"
          class="input"
          :value="filters.query"
          :placeholder="$t('deconf.scheduleFilters.query')"
          @input="onQuery"
        />
      </div>

      <!-- Show / hide filters -->
      <div class="field" v-if="!showExtraFilters">
        <div class="control">
          <button class="button is-primary is-light" @click="toggleFilters">
            <span>
              {{ $t('deconf.scheduleFilters.showFilters') }}
            </span>
          </button>
        </div>
      </div>

      <!-- Clear filters -->
      <div class="field" v-if="hasFilters">
        <div class="control">
          <div class="button is-danger" @click="clearFilters">
            <span> {{ $t('deconf.scheduleFilters.clearFilters') }} </span>
          </div>
        </div>
      </div>
    </div>

    <div class="scheduleFilters-row" v-if="showExtraFilters">
      <!-- Date  -->
      <InlineFilter
        class="scheduleFilters-date"
        v-if="isEnabled('date')"
        v-model="filters.date"
        :label="$t('deconf.scheduleFilters.dateFilter')"
        :off-label="$t('deconf.scheduleFilters.offLabel')"
        :options="dateOptions"
      />

      <!-- Session Type  -->
      <InlineFilter
        v-if="isEnabled('sessionType')"
        class="scheduleFilters-type"
        v-model="filters.sessionType"
        :label="$t('deconf.scheduleFilters.typeFilter')"
        :off-label="$t('deconf.scheduleFilters.offLabel')"
        :options="sessionTypeOptions"
      />

      <!-- Track -->
      <InlineFilter
        class="scheduleFilters-track"
        v-if="isEnabled('track')"
        v-model="filters.track"
        :label="$t('deconf.scheduleFilters.trackFilter')"
        :off-label="$t('deconf.scheduleFilters.offLabel')"
        :options="trackOptions"
      />

      <!-- Theme -->
      <InlineFilter
        class="scheduleFilters-theme"
        v-if="isEnabled('theme')"
        v-model="filters.theme"
        :label="$t('deconf.scheduleFilters.themeFilter')"
        :off-label="$t('deconf.scheduleFilters.offLabel')"
        :options="themeOptions"
      />

      <!-- Recorded -->
      <InlineFilter
        class="scheduleFilters-recorded"
        v-if="isEnabled('isRecorded')"
        v-model="filters.isRecorded"
        :label="$t('deconf.scheduleFilters.recordedFilter')"
        :off-label="$t('deconf.scheduleFilters.offLabel')"
        :options="recordedOptions"
      />

      <div class="field" v-if="showExtraFilters">
        <div class="control">
          <button class="button is-primary is-light" @click="toggleFilters">
            <span>
              {{ $t('deconf.scheduleFilters.hideFilters') }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

import {
  startOfDay,
  friendlyDate,
  localiseFromObject,
  debounce,
  Debounced,
  FullSchedule
} from '../../../lib/module';
import InlineFilter from './InlineFilter.vue';
import { ScheduleFilterRecord } from './ScheduleFilterRecord';
import { FilterOption } from './FilterOption';
import { Localised } from '@openlab/deconf-shared';

type FilterKey = keyof ScheduleFilterRecord;

const QUERY_DEBOUNCE = 500;

const DEFAULT_FILTERS: FilterKey[] = [
  'query',
  'sessionType',
  'track',
  'theme',
  'date',
  'isRecorded'
];

//
// i18n
// - deconf.scheduleFilters.query - Label of the search field
// - deconf.scheduleFilters.showFilters - Button to show the extra filters
// - deconf.scheduleFilters.hideFilters - Button to hide the extra filters
// - deconf.scheduleFilters.clearFilters - Button to reset filtering
// - deconf.scheduleFilters.dateFilter - The label of the date filter
// - deconf.scheduleFilters.typeFilter - The label of the type filter
// - deconf.scheduleFilters.trackFilter - The label of the track filter
// - deconf.scheduleFilters.themeFilter - The label of the theme filter
// - deconf.scheduleFilters.recordedFilter - The label of the "is recorded" filter
// - deconf.scheduleFilters.offLabel - The label when no value is applied, e.g. "All"
// - deconf.scheduleFilters.yes - "Yes" option
// - deconf.scheduleFilters.no - "No" option
//
// icons
// - n/a
//
// sass
// - n/a
//

interface Data {
  showExtraFilters: boolean;
  queryHandler: null | Debounced<[string]>;
}

export default {
  name: 'ScheduleFilters',
  components: { InlineFilter },
  props: {
    schedule: {
      type: Object as PropType<FullSchedule>,
      required: true
    },
    filters: {
      type: Object as PropType<ScheduleFilterRecord>,
      required: true
    },
    enabledFilters: {
      type: Array as PropType<FilterKey[]>,
      default: () => DEFAULT_FILTERS
    }
  },
  data(): Data {
    return {
      showExtraFilters: false,
      queryHandler: null
    };
  },
  computed: {
    dateOptions(): FilterOption[] {
      const dates = new Map(
        this.schedule.slots.map(s => [
          startOfDay(s.start).toISOString(),
          s.start
        ])
      );
      return [...dates.values()].map(date => ({
        value: date,
        text: friendlyDate(date)
      }));
    },
    sessionTypeOptions(): FilterOption[] {
      return this.schedule.types.map(t => ({
        value: t.id,
        text: this.localise(t.title) as string
      }));
    },
    trackOptions(): FilterOption[] {
      return this.schedule.tracks.map(t => ({
        value: t.id,
        text: this.localise(t.title) as string
      }));
    },
    themeOptions(): FilterOption[] {
      return this.schedule.themes.map(t => ({
        value: t.id,
        text: this.localise(t.title) as string
      }));
    },
    recordedOptions(): FilterOption[] {
      return [
        { value: true, text: this.$t('deconf.scheduleFilters.yes') as string },
        { value: false, text: this.$t('deconf.scheduleFilters.no') as string }
      ];
    },
    hasFilters(): boolean {
      if (!this.filters) return false;
      return (
        Boolean(this.filters.query) ||
        this.filters.sessionType !== null ||
        this.filters.track !== null ||
        this.filters.theme !== null ||
        this.filters.date !== null ||
        this.filters.isRecorded !== null
      );
    },
    enabledFiltersSet(): Set<FilterKey> {
      return new Set(this.enabledFilters);
    }
  },
  watch: {
    filters: {
      deep: true,
      handler(newValue: ScheduleFilterRecord) {
        this.$emit('filter', newValue);
      }
    }
  },
  mounted() {
    this.showExtraFilters = this.showExtraFilters || this.hasFilters;

    this.queryHandler = debounce(QUERY_DEBOUNCE, (value: string) => {
      this.filters.query = value;
    });
  },
  destroyed() {
    if (this.queryHandler) {
      this.queryHandler.cancel();
    }
    this.queryHandler = null;
  },
  methods: {
    localise(object: Localised): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    },
    toggleFilters(): void {
      this.showExtraFilters = !this.showExtraFilters;
    },
    clearFilters(): void {
      this.showExtraFilters = false;
      this.filters.query = '';
      this.filters.sessionType = null;
      this.filters.track = null;
      this.filters.theme = null;
      this.filters.date = null;
      this.filters.isRecorded = null;
    },
    onQuery(e: InputEvent): void {
      if (!this.queryHandler) return;
      this.queryHandler((e.target as HTMLInputElement).value);
    },
    isEnabled(filterName: FilterKey) {
      return this.enabledFiltersSet.has(filterName);
    }
  }
};
</script>

<style lang="scss">
.scheduleFilters {
}

.scheduleFilters-row {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;

  > * {
    margin-block-end: 12px;
  }
  > *:not(:last-child) {
    margin-inline-end: 12px;
  }

  @include mobile {
    margin-bottom: 12px;
  }

  &:last-child {
    margin-bottom: -12px;
    // margin-bottom: $block-spacing;
  }
}

@include tablet {
  .scheduleFilters-fieldGap {
    flex: 1;
  }
}
</style>
