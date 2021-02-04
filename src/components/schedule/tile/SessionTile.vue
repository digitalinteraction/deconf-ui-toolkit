<template>
  <div class="sessionTile">
    <div class="sessionTile-header">
      <SessionHeader :session-type="sessionType" />
    </div>
    <div class="sessionTile-info">
      <h2 class="sessionTile-title">
        <router-link :to="sessionRoute">
          {{ session.title.en }}
        </router-link>
      </h2>
      <p class="sessionTile-description">
        {{ session.content.en | trim(300) }}
      </p>
    </div>
    <div class="sessionTile-attributes">
      <SessionAttributes
        :languages="session.hostLanguage"
        :is-recorded="session.isRecorded"
      />
    </div>
    <div class="sessionTile-speakers">
      <SpeakerGrid :speakers="sessionSpeakers" />
    </div>
    <div class="sessionTile-actions">
      <SessionActions :session="session" :slot-state="slotState" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Session, SessionSlot, SessionType, SlotState, Speaker } from '@/types';
import { Routes } from '@/constants';
import { getSlotState } from '@/utils';

import SessionHeader from './SessionHeader.vue';
import SessionAttributes from './SessionAttributes.vue';
import SpeakerGrid from '../SpeakerGrid.vue';
import SessionActions from './SessionActions.vue';

export default {
  name: 'SessionTile',
  components: {
    SessionHeader,
    SessionAttributes,
    SpeakerGrid,
    SessionActions
  },
  filters: {
    trim(value: string, length: number) {
      if (value.length < length) return value;
      return `${value.substring(0, length)}…`;
    }
  },
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    session: { type: Object as PropType<Session>, required: true },
    sessionType: { type: Object as PropType<SessionType>, required: true },
    sessionSlot: { type: Object as PropType<SessionSlot>, required: true },
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
    slotState(): SlotState {
      return getSlotState(
        this.currentDate,
        this.sessionSlot.start,
        this.sessionSlot.end
      );
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
