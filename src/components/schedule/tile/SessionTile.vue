<template>
  <div class="sessionTile">
    <div class="sessionTile-header">
      <SessionType :session-type="sessionType" />
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
        :languages="session.language"
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
import Vue, { PropType } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Session, SessionSlot, SessionType, Speaker } from '@/types';
import { Routes } from '@/constants';

import SessionTypeComp from './SessionType.vue';
import SessionAttributes from './SessionAttributes.vue';
import SpeakerGrid from '../SpeakerGrid.vue';
import SessionActions from './SessionActions.vue';

export default Vue.extend({
  components: {
    SessionType: SessionTypeComp,
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
    slotState(): string {
      const now = this.currentDate.getTime();
      const start = this.sessionSlot.start.getTime();
      const end = this.sessionSlot.end.getTime();

      const oneHour = 60 * 60 * 1000;

      if (now < start && now > start - oneHour) return 'soon';

      if (now < start) return 'future';
      if (now > end) return 'past';

      return 'present';
    }
  }
});
</script>

<style lang="scss" scoped>
.sessionTile-header,
.sessionTile-info,
.sessionTile-attributes {
  margin-bottom: 0.5em;
}
.sessionTile-title {
  font-weight: $weight-bold;
  font-size: $size-5;

  a {
    color: $black;
  }
  a:hover {
    text-decoration: underline;
  }
}

.sessionTile-description {
  color: $grey;
  font-size: 0.9em;
  max-width: 800px;
}
</style>
