<template>
  <div class="whatsOnView">
    <div class="whatsOnView-header">
      <h1 class="whatsOnView-title">
        {{ $t('deconf.whatsOn.title') }}
      </h1>
      <div class="content">
        <p>{{ $t('deconf.whatsOn.infoText') }}</p>
      </div>
      <ScheduleFilters
        :schedule="schedule"
        :filters="filters"
        @filter="onFilter"
        :enabled-filters="enabledFilters"
      />
    </div>
    <div class="whatsOnView-sessions">
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
import { Session } from '@openlab/deconf-shared';
import {
  createFilterPredicate,
  FullSchedule,
  loadScheduleFilters,
  ScheduleConfig,
  SlotState
} from '../../lib/module';
import {
  ScheduleFilterRecord,
  ScheduleFilters,
  SessionTile,
  SessionBoard
} from '../../components/module';

//
// i18n
// - deconf.whatsOn.title
// - deconf.whatsOn.infoText
//
// icons
// - n/a
//
// sass
// - n/a
//

interface Data {
  filters: ScheduleFilterRecord;
}

export default {
  name: 'WhatsOnView',
  components: { ScheduleFilters, SessionTile, SessionBoard },
  props: {
    schedule: { type: Object as PropType<FullSchedule>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    filtersKey: { type: String, required: true },
    enabledFilters: {
      type: Array as PropType<Array<keyof ScheduleFilterRecord>>,
      default: undefined
    },
    config: { type: Object as PropType<ScheduleConfig>, required: true },
    slotState: { type: String as PropType<SlotState>, required: true }
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
  // TODO: font-family
  font-size: $whatsOn-titleSize;
  font-weight: $whatsOn-titleWeight;
}
</style>
