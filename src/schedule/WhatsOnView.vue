<template>
  <div class="whatsOnView">
    <div class="whatsOnView-header">
      <h1 class="whatsOnView-title">
        {{ $t('deconf.whatsOn.title') }}
      </h1>
      <div class="whatsOnView-content">
        <p>{{ $t('deconf.whatsOn.infoText') }}</p>
      </div>
      <ScheduleFilters
        :schedule="schedule"
        :filters="filters"
        @filter="onFilter"
        :enabled-filters="enabledFilters"
        :language-options="languageOptions"
      />
    </div>
    <div class="whatsOnView-sessions">
      <NoResults v-if="filteredSessions.length === 0">
        {{ $t('deconf.whatsOn.noResults') }}
      </NoResults>

      <SessionBoard>
        <SessionTile
          v-for="session in filteredSessions"
          :key="session.id"
          :slot-state="slotState"
          :session="session"
          :schedule="schedule"
          :config="config"
          :readonly="true"
        />
      </SessionBoard>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { ScheduleRecord, Session } from '@openlab/deconf-shared';
import {
  createFilterPredicate,
  loadScheduleFilters,
  ScheduleConfig,
  SlotState
} from '../lib/module';
import ScheduleFilters from './filtering/ScheduleFilters.vue';
import SessionTile from './tile/SessionTile.vue';
import SessionBoard from './SessionBoard.vue';
import NoResults from './NoResults.vue';
import { SelectOption } from '../form/select-option';
import { ScheduleFilterRecord } from '../lib/module';

// TODO: review module inter-dependencies

//
// i18n
// - deconf.whatsOn.title
// - deconf.whatsOn.infoText
// - deconf.whatsOn.noResults
//
// icons
// - n/a
//
// sass
// - $whatsOn-background
// - $whatsOn-titleSize
// - $whatsOn-titleWeight
// - $whatsOn-titleFamily
//

interface Data {
  filters: ScheduleFilterRecord;
}

export default {
  name: 'WhatsOnView',
  components: { ScheduleFilters, SessionTile, SessionBoard, NoResults },
  props: {
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    filtersKey: { type: String, required: true },
    enabledFilters: {
      type: Array as PropType<Array<keyof ScheduleFilterRecord>>,
      default: undefined
    },
    config: { type: Object as PropType<ScheduleConfig>, required: true },
    slotState: { type: String as PropType<SlotState>, required: true },
    languageOptions: {
      type: Array as PropType<SelectOption[]>,
      default: () => []
    }
  },
  data(): Data {
    return {
      filters: loadScheduleFilters(this.filtersKey)
    };
  },
  computed: {
    filteredSessions(): Session[] {
      const predicate = createFilterPredicate(
        this.$i18n.locale,
        this.filters,
        this.schedule
      );

      if (!predicate) return this.sessions;

      return this.sessions.filter(s => predicate(s));
    }
  },
  methods: {
    onFilter(filters: ScheduleFilterRecord) {
      this.filters = filters;

      window.setTimeout(() => {
        const json = JSON.stringify(filters);
        localStorage.setItem(this.filtersKey, json);
      });
    }
  }
};
</script>

<style lang="scss">
$whatsOn-background: $background !default;
$whatsOn-titleSize: $size-3 !default;
$whatsOn-titleWeight: bold !default;
$whatsOn-titleFamily: $family-title !default;

.whatsOnView {
  flex: 1; // Fill AppLayout
  background: $whatsOn-background;
  padding-bottom: $block-spacing * 5;
}

.whatsOnView-header {
  padding: $block-spacing;
  background-color: $white;
  border-bottom: 1px solid $border;
}

.whatsOnView-title {
  font-size: $whatsOn-titleSize;
  font-weight: $whatsOn-titleWeight;
  font-family: $whatsOn-titleFamily;
}
.whatsOnView-content {
  margin-bottom: 0.5rem;
}
</style>
