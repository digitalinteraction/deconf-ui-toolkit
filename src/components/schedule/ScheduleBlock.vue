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
        />
      </div>
      <div class="scheduleBlock-session" v-if="otherSessions.length > 0">
        <div class="scheduleBlock-workshopInfo">
          <h3 class="scheduleBlock-workshopTitle">
            {{ $t('deconf.scheduleBlock.workshopTitle') }}
          </h3>
          <p class="scheduleBlock-workshopDescription">
            {{ $t('deconf.scheduleBlock.workshopDescription') }}
          </p>
        </div>

        <ToggleContents
          :title="$tc('deconf.scheduleBlock.workshops', otherSessions.length)"
          :show-button="$t('deconf.scheduleBlock.showWorkshops')"
          :hide-button="$t('deconf.scheduleBlock.hideWorkshops')"
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
            />
          </div>
        </ToggleContents>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import {
  ScheduleConfig,
  SlotState,
  getSlotState,
  FullSchedule
} from '../../lib/module';

import {
  Speaker,
  Theme,
  Track,
  Session,
  SessionSlot,
  SessionType
} from '@openlab/deconf-shared';

import TimeSlot from './TimeSlot.vue';
import SessionTile from './tile/SessionTile.vue';
import ToggleContents from '../ToggleContents.vue';

//
// i18n
// - deconf.scheduleBlock.workshopTitle - Heading for workshops
// - deconf.scheduleBlock.workshopDescription - Subtitle for workshops
// - deconf.scheduleBlock.workshops - Number of workshops (^c)
// - deconf.scheduleBlock.showWorkshops - Button to show workshops
// - deconf.scheduleBlock.hideWorkshops - Button to hide workshops
//
// icons
// - n/a
//
// sass
// - $scheduleBlock-background
//

export default {
  name: 'ScheduleBlock',
  components: { TimeSlot, SessionTile, ToggleContents },
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    sessionSlot: { type: Object as PropType<SessionSlot>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    showOtherSessions: { type: Boolean, default: false },
    schedule: { type: Object as PropType<FullSchedule>, required: true },
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
      return new Map(this.schedule.types.map(s => [s.id, s]));
    },
    trackMap(): Map<string, Track> {
      return new Map(this.schedule.tracks.map(t => [t.id, t]));
    },
    themeMap(): Map<string, Theme> {
      return new Map(this.schedule.themes.map(t => [t.id, t]));
    },
    plenaryTypes(): Set<string> {
      return new Set<string>(
        this.schedule.types.filter(t => t.layout === 'plenary').map(t => t.id)
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
    max-width: 960px;
    margin-inline-end: auto;
  }
}
@include touch {
  .scheduleBlock {
    padding-bottom: $block-spacing;
  }
  .scheduleBlock-sessions {
  }
}

.scheduleBlock {
  background-color: $scheduleBlock-background;

  padding: 12px 0;

  &:first-child {
    padding-top: 24px;
  }
  &:last-child {
    padding-bottom: 24px;
  }

  &.is-present {
    background: $white;
    box-shadow: $box-shadow;
    padding: 0;
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
