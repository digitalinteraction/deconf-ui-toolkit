<template>
  <div class="scheduleBlock" :class="classes">
    <div class="scheduleBlock-slotColumn">
      <div class="scheduleBlock-slot">
        <TimeSlot
          :current-date="currentDate"
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
          :current-date="currentDate"
          :session="session"
          :session-slot="sessionSlot"
          :session-type="getSessionType(session)"
          :speakers="getSessionSpeakers(session)"
        />
      </div>
      <div class="scheduleBlock-session">
        <div class="scheduleBlock-workshopInfo">
          <h3 class="scheduleBlock-workshopTitle">Interactive workshops</h3>
          <p class="scheduleBlock-workshopDescription">
            Participate in one of the following interactive workshops.
          </p>
        </div>

        <ToggleContents
          :title="workshopTitle"
          show-button="Show all"
          hide-button="Hide all"
        >
          <div
            class="scheduleBlock-session"
            v-for="session in otherSessions"
            :key="session.id"
          >
            <SessionTile
              :current-date="currentDate"
              :session="session"
              :session-slot="sessionSlot"
              :session-type="getSessionType(session)"
              :speakers="getSessionSpeakers(session)"
            />
          </div>
        </ToggleContents>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Session, SessionSlot, SessionType, Speaker } from '@/types';
import Vue, { PropType } from 'vue';

import TimeSlot from './TimeSlot.vue';
import SessionTile from './tile/SessionTile.vue';
import ToggleContents from '../ToggleContents.vue';

export default Vue.extend({
  components: { TimeSlot, SessionTile, ToggleContents },
  data() {
    return {
      showOthers: false
    };
  },
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    sessionSlot: { type: Object as PropType<SessionSlot>, required: true },
    sessions: { type: Array as PropType<Session[]>, required: true },
    speakers: { type: Array as PropType<Speaker[]>, required: true },
    sessionTypes: { type: Array as PropType<SessionType[]>, required: true }
  },
  computed: {
    classes(): string {
      const isNow =
        this.currentDate.getTime() > this.sessionSlot.start.getTime() &&
        this.currentDate.getTime() < this.sessionSlot.end.getTime();
      return isNow ? 'is-present' : '';
    },
    speakerMap(): Map<string, Speaker> {
      return new Map(this.speakers.map(s => [s.id, s]));
    },
    sessionTypeMap(): Map<string, SessionType> {
      return new Map(this.sessionTypes.map(s => [s.id, s]));
    },
    plenaryTypes(): Set<string> {
      const types = new Set<string>();
      for (const type of this.sessionTypes) {
        if (type.layout === 'plenary') types.add(type.id);
      }
      return types;
    },
    plenarySessions(): Session[] {
      return this.sessions.filter(s => this.plenaryTypes.has(s.type));
    },
    otherSessions(): Session[] {
      return this.sessions.filter(s => !this.plenaryTypes.has(s.type));
    },
    workshopTitle(): string {
      const plural = this.sessions.length === 1 ? '' : 's';
      return `${this.sessions.length} workshop${plural}`;
    }
    // toggleText(): string {
    //   return this.showContents ? 'Show all' : 'Hide all';
    // }
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
    }
  }
});
</script>

<style lang="scss" scoped>
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
  }
}
@include touch {
  .scheduleBlock-sessions {
    margin: 0 6px;
  }
}

.scheduleBlock {
  background-color: #f4f4f4;

  &.is-present {
    background: $white;
    // border-radius: $radius;
    box-shadow: $box-shadow;
  }
}

.scheduleBlock-slot {
  padding: 25px;
}

.scheduleBlock-sessions {
  padding: 24px;
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
  color: $black;
  font-size: $size-5;
  font-weight: $weight-bold;
  line-height: 20px;
  // margin: 10px 0 0;
}
.scheduleBlock-workshopDescription {
  color: #757a8a;
  font-size: 0.9em;
  // margin: 10px 0 0;
}
</style>
