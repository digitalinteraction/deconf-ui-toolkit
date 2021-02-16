<template>
  <div class="sessionTile">
    <div class="sessionTile-header">
      <SessionHeader :session-type="sessionType" />
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
      <SessionAttributes
        :languages="session.hostLanguages"
        :is-recorded="session.isRecorded"
        :track="track"
      />
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
            class="is-small"
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
  Session,
  SessionSlot,
  SessionType,
  SlotState,
  Speaker,
  Track
} from '@/types';
import { Routes } from '@/constants';
import { localiseFromObject } from '@/utils';

import SessionHeader from './SessionHeader.vue';
import SessionAttributes from './SessionAttributes.vue';
import SpeakerGrid from '../SpeakerGrid.vue';
import AddToCalendar from '../actions/AddToCalendar.vue';
import JoinSession from '../actions/JoinSession.vue';

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
    sessionType: { type: Object as PropType<SessionType>, required: true },
    sessionSlot: { type: Object as PropType<SessionSlot>, required: true },
    track: { type: Object as PropType<Track>, required: true },
    speakers: { type: Array as PropType<Speaker[]>, required: true }
  },
  computed: {
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
    }
  },
  methods: {
    trim(value: string, length: number): string {
      if (value.length < length) return value;
      return `${value.substring(0, length)}…`;
    },
    trackCalendar(): void {
      // Track the clicking of a calendar
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
