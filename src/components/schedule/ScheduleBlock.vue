<template>
  <div class="scheduleBlock" :class="classes">
    <div class="scheduleBlock-slotColumn">
      <div class="scheduleBlock-slot">
        <TimeSlot
          :slot-state="slotState"
          :start-date="sessionSlot.start"
          :end-date="sessionSlot.end"
        />
      </div>
    </div>
    <div class="scheduleBlock-sessions">
      <div
        class="scheduleBlock-session"
        v-for="session in plenarySessions"
        :key="session.id"
      >
        <SessionTile
          :slot-state="slotState"
          :session="session"
          :schedule="schedule"
          :config="config"
          @track-ical="trackIcal"
        />
      </div>
      <div class="scheduleBlock-session" v-if="otherSessions.length > 0">
        <div class="scheduleBlock-workshopInfo">
          <h3 class="scheduleBlock-workshopTitle">
            {{ $t('deconf.schedule.workshopTitle') }}
          </h3>
          <p class="scheduleBlock-workshopDescription">
            {{ $t('deconf.schedule.workshopDescription') }}
          </p>
        </div>

        <ToggleContents
          :title="$tc('deconf.schedule.workshops', otherSessions.length)"
          :show-button="$t('deconf.schedule.showWorkshops')"
          :hide-button="$t('deconf.schedule.hideWorkshops')"
          :force-open="showOtherSessions || shouldOpenWorkshops"
        >
          <div
            class="scheduleBlock-session"
            v-for="session in otherSessions"
            :key="session.id"
          >
            <SessionTile
              :slot-state="slotState"
              :session="session"
              :schedule="schedule"
              :config="config"
              @track-ical="trackIcal"
            />
          </div>
        </ToggleContents>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ScheduleConfig,
  ScheduleRecord,
  Session,
  SessionSlot,
  SessionType,
  SlotState,
  Speaker,
  Theme,
  Track
} from '@/types';
import { PropType } from 'vue';
import { getSlotState } from '@/utils';

import TimeSlot from './TimeSlot.vue';
import SessionTile from './tile/SessionTile.vue';
import ToggleContents from '../ToggleContents.vue';

//
// I18n used:
// - deconf.schedule.workshopTitle
// - deconf.schedule.workshopDescription
// - deconf.schedule.workshops
// - deconf.schedule.showWorkshops
// - deconf.schedule.hideWorkshops
//

export default {
  name: 'ScheduleBlock',
  components: { TimeSlot, SessionTile, ToggleContents },
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    sessionSlot: { type: Object as PropType<SessionSlot>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    showOtherSessions: { type: Boolean, default: false },
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    config: { type: Object as PropType<ScheduleConfig>, required: true }
  },
  computed: {
    classes(): string {
      const isNow =
        this.currentDate.getTime() > this.sessionSlot.start.getTime() &&
        this.currentDate.getTime() < this.sessionSlot.end.getTime();
      return isNow ? 'is-present' : '';
    },
    speakerMap(): Map<string, Speaker> {
      return new Map(this.schedule.speakers.map(s => [s.id, s]));
    },
    sessionTypeMap(): Map<string, SessionType> {
      return new Map(this.schedule.sessionTypes.map(s => [s.id, s]));
    },
    trackMap(): Map<string, Track> {
      return new Map(this.schedule.tracks.map(t => [t.id, t]));
    },
    themeMap(): Map<string, Theme> {
      return new Map(this.schedule.themes.map(t => [t.id, t]));
    },
    plenaryTypes(): Set<string> {
      return new Set<string>(
        this.schedule.sessionTypes
          .filter(t => t.layout === 'plenary')
          .map(t => t.id)
      );
    },
    plenarySessions(): Session[] {
      return this.sessions.filter(s => this.plenaryTypes.has(s.type));
    },
    otherSessions(): Session[] {
      return this.sessions.filter(s => !this.plenaryTypes.has(s.type));
    },
    slotState(): SlotState {
      return getSlotState(
        this.currentDate,
        this.sessionSlot.start,
        this.sessionSlot.end
      );
    },
    shouldOpenWorkshops(): boolean {
      if (this.slotState === 'present') return true;
      return false;
    }
  },
  methods: {
    getSessionType(session: Session): SessionType {
      // TODO: handle not found
      return this.sessionTypeMap.get(session.type) as SessionType;
    },
    getSessionSpeakers(session: Session): Speaker[] {
      // TODO: handle not found better
      return session.speakers
        .map(id => this.speakerMap.get(id) as Speaker)
        .filter(s => Boolean(s));
    },
    getSessionTrack(session: Session): Track {
      // TODO: handle not found better too
      return this.trackMap.get(session.track) as Track;
    },
    getSessionThemes(session: Session): Theme[] {
      return session.themes
        .map(t => this.themeMap.get(t) as Theme)
        .filter(t => Boolean(t));
    },
    trackIcal(sessionId: string) {
      this.$emit('track-ical', sessionId);
    }
  }
};
</script>

<style lang="scss">
$scheduleBlock-background: $background !default;

@include desktop {
  .scheduleBlock {
    display: flex;
  }
  .scheduleBlock-slotColumn {
    width: 20%;
  }
  .scheduleBlock-slot {
    position: sticky;
    top: 0;
  }
  .scheduleBlock-sessions {
    flex: 1;
    margin: 24px 0;
    max-width: 960px;
    margin-inline-end: auto;
  }
}
@include touch {
  .scheduleBlock {
    padding-bottom: $block-spacing;
  }
  .scheduleBlock-sessions {
    margin: 0 6px;
  }
}

.scheduleBlock {
  background-color: $scheduleBlock-background;

  &.is-present {
    background: $white;
    box-shadow: $box-shadow;
  }
}

.scheduleBlock-slot {
  padding: 25px;
}

.scheduleBlock-sessions {
  padding: 24px;

  @include mobile {
    padding: 15px;
  }
}

.scheduleBlock:not(.is-present) .scheduleBlock-sessions {
  background: $white;
  border-radius: $radius;
  box-shadow: $box-shadow;
}

.scheduleBlock-session {
  &:not(:last-child) {
    padding-bottom: 24px;
    border-bottom: 1px solid $border;
    margin-bottom: 24px;
  }
}

.scheduleBlock-workshop {
  &:not(:last-child) {
    margin-bottom: 18px;
  }
}

.scheduleBlock-workshopInfo {
  max-width: 800px;
  margin-bottom: 12px;
}
.scheduleBlock-workshopTitle {
  color: $text-strong;
  font-size: $size-5;
  font-weight: $weight-bold;
  line-height: 20px;
}
.scheduleBlock-workshopDescription {
  color: $text-light;
  font-size: 0.9em;
}
</style>
