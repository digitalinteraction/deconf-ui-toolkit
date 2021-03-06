<template>
  <div class="sessionTile">
    <div class="sessionTile-header">
      <SessionHeader v-bind="headerAttributes" />
    </div>
    <div class="sessionTile-info">
      <h2 class="sessionTile-title">
        <router-link :to="sessionRoute">
          {{ localeTitle }}
        </router-link>
      </h2>
      <p class="sessionTile-description">
        {{ localeContent }}
      </p>
    </div>
    <div class="sessionTile-attributes">
      <SessionAttributes v-bind="attributesAttributes" />
    </div>
    <div class="sessionTile-speakers">
      <SpeakerGrid :speakers="sessionSpeakers" />
    </div>
    <div class="sessionTile-actions">
      <div class="buttons is-right">
        <!-- 
          Add to calendar
        -->
        <template v-if="canAddToCalendar">
          <AddToCalendar
            class="is-small is-link"
            :calendar-link="calendarLink"
            @click="trackCalendar"
          />
        </template>
        <!-- 
          Join session
        -->
        <template v-if="canJoinSession">
          <JoinSession
            class="is-small"
            :slot-state="slotState"
            :session-id="session.id"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
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
import { Routes } from '@/constants';
import { localiseFromObject } from '@/utils';

import SessionHeader from './SessionHeader.vue';
import SessionAttributes from './SessionAttributes.vue';
import SpeakerGrid from '../SpeakerGrid.vue';
import AddToCalendar from '../actions/AddToCalendar.vue';
import JoinSession from '../actions/JoinSession.vue';

function mapById<T extends { id: string }>(records: T[]): Map<string, T> {
  return new Map(records.map(r => [r.id, r]));
}

function lookup<T extends { id: string }>(records: T[], query: string) {
  return records.find(r => r.id === query) as T;
}

export default {
  name: 'SessionTile',
  components: {
    SessionHeader,
    SessionAttributes,
    SpeakerGrid,
    AddToCalendar,
    JoinSession
  },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    session: { type: Object as PropType<Session>, required: true },
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    config: { type: Object as PropType<ScheduleConfig>, required: true }
  },
  computed: {
    speakers(): Speaker[] {
      const map = mapById(this.schedule.speakers);
      return this.session.speakers
        .map(id => map.get(id) as Speaker)
        .filter(s => Boolean(s));
    },
    themes(): Theme[] {
      const map = mapById(this.schedule.themes);
      return this.session.themes
        .map(id => map.get(id) as Theme)
        .filter(t => Boolean(t));
    },
    // TODO: handle this failing
    sessionType(): SessionType {
      return lookup(this.schedule.sessionTypes, this.session.type);
    },
    // TODO: handle this failing
    sessionSlot(): SessionSlot {
      return lookup(this.schedule.sessionSlots, this.session.slot as string);
    },
    track(): Track {
      return lookup(this.schedule.tracks, this.session.track);
    },
    sessionRoute(): object {
      return { name: Routes.Session, params: { sessionId: this.session.id } };
    },
    sessionSpeakers(): Speaker[] {
      return this.session.speakers
        .map(id => this.speakers.find(s => s.id === id) as Speaker)
        .filter(s => Boolean(s));
    },
    localeTitle(): string | null {
      return localiseFromObject(this.$i18n.locale, this.session.title);
    },
    localeContent(): string | null {
      const content = localiseFromObject(
        this.$i18n.locale,
        this.session.content
      );
      return content && this.trim(content, 300);
    },
    canAddToCalendar(): boolean {
      return ['soon', 'future'].includes(this.slotState);
    },
    canJoinSession(): boolean {
      return true;
    },
    calendarLink(): string | null {
      return this.$store.getters['api/calendarLink'](this.session) || null;
    },
    headerAttributes(): object {
      const set = new Set(this.config.tileHeader);

      return {
        sessionType: set.has('type') ? this.sessionType : null,
        track: set.has('track') ? this.track : null,
        themes: set.has('themes') ? this.themes : null
      };
    },
    attributesAttributes(): object {
      const set = new Set(this.config.tileAttributes);

      return {
        languages: set.has('languages') ? this.session.hostLanguages : null,
        isRecorded: set.has('recorded') ? this.session.isRecorded : null,
        track: set.has('track') ? this.track : null,
        themes: set.has('themes') ? this.themes : null
      };
    }
  },
  methods: {
    trim(value: string, length: number): string {
      if (value.length < length) return value;
      return `${value.substring(0, length)}…`;
    },
    trackCalendar(): void {
      // Track the clicking of a calendar
      this.$emit('track-ical', this.session.id);
    }
  }
};
</script>

<style lang="scss">
$sessionTile-titleWeight: $weight-bold !default;
$sessionTile-titleSize: $size-5 !default;
$sessionTile-titleColor: $text-strong !default;
$sessionTile-descriptionColor: $grey !default;
$sessionTile-textWidth: 720px !default;

.sessionTile-header,
.sessionTile-info,
.sessionTile-attributes {
  margin-bottom: 0.5em;
}
.sessionTile-title {
  font-weight: $sessionTile-titleWeight;
  font-size: $sessionTile-titleSize;

  a {
    color: $sessionTile-titleColor;
  }
  a:hover {
    text-decoration: underline;
  }
}

.sessionTile-description {
  color: $sessionTile-descriptionColor;
  font-size: 0.9em;
  max-width: $sessionTile-textWidth;
}
</style>
