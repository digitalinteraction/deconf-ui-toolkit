<template>
  <div class="sessionTile">
    <div class="sessionTile-header">
      <SessionHeader v-bind="headerAttributes" />
    </div>
    <div class="sessionTile-info">
      <h2 class="sessionTile-title">
        <template v-if="readonly">
          {{ localeTitle }}
        </template>
        <template v-else>
          <router-link :to="sessionRoute">
            {{ localeTitle }}
          </router-link>
        </template>
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
    <div class="sessionTile-actions" v-if="!readonly">
      <div class="buttons is-right">
        <!--
          Add to MySchedule
        -->
        <template v-if="canAddToMySchedule">
          <InterestButton
            class="is-small"
            :is-interested="isInterested"
            :is-processing="isProcessing"
            @toggle="toggleInterest"
          />
        </template>
        <!-- 
          Add to calendar
        -->
        <template v-if="canAddToCalendar">
          <AddToCalendar class="is-small is-link" :session="session" />
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
import { defineComponent, PropType } from 'vue';
import {
  ScheduleConfig,
  SlotState,
  Routes,
  localiseFromObject,
  stripMarkdown,
  ScheduleConfigAction,
  namespaceForApi,
} from '../lib/module';
import {
  SessionHeader,
  SessionAttributes,
  AddToCalendar,
  JoinSession,
  SpeakerGrid,
  InterestButton,
} from '../core/module';

import {
  Localised,
  ScheduleRecord,
  Session,
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Track,
} from '@openlab/deconf-shared';
import { RouteLocationRaw } from 'vue-router';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $sessionTile-titleWeight
// - $sessionTile-titleSize
// - $sessionTile-titleColor
// - $sessionTile-descriptionColor
// - $sessionTile-textWidth
//

function mapById<T extends { id: string }>(records: T[]): Map<string, T> {
  return new Map(records.map((r) => [r.id, r]));
}

function lookup<T extends { id: string }>(records: T[], query: string) {
  return records.find((r) => r.id === query) as T;
}

// NOTE — typescript complains if this isn't exported
export interface _Data {
  isProcessing: boolean;
}

export default defineComponent({
  name: 'SessionTile',
  components: {
    SessionHeader,
    SessionAttributes,
    SpeakerGrid,
    AddToCalendar,
    JoinSession,
    InterestButton,
  },
  props: {
    slotState: { type: String as PropType<SlotState>, required: true },
    session: { type: Object as PropType<Session>, required: true },
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    config: { type: Object as PropType<ScheduleConfig>, required: true },
    readonly: { type: Boolean, default: false },
  },
  data(): _Data {
    return { isProcessing: false };
  },
  computed: {
    userSessions(): string[] {
      return this.$store.getters[namespaceForApi(this.$deconf, 'userSessions')];
    },
    isSignedIn(): boolean {
      return this.$store.getters[namespaceForApi(this.$deconf, 'isSignedIn')];
    },

    isInterested(): boolean {
      return this.userSessions.includes(this.session.id);
    },
    speakers(): Speaker[] {
      const map = mapById(this.schedule.speakers);
      return this.session.speakers
        .map((id) => map.get(id) as Speaker)
        .filter((s) => Boolean(s));
    },
    themes(): Theme[] {
      const map = mapById(this.schedule.themes);
      return this.session.themes
        .map((id) => map.get(id) as Theme)
        .filter((t) => Boolean(t));
    },
    sessionType(): SessionType {
      return lookup(this.schedule.types, this.session.type);
    },
    sessionSlot(): SessionSlot {
      return lookup(this.schedule.slots, this.session.slot as string);
    },
    track(): Track {
      return lookup(this.schedule.tracks, this.session.track);
    },
    sessionRoute(): RouteLocationRaw {
      if (this.config.getSessionRoute) {
        return this.config.getSessionRoute(this.session);
      }
      return { name: Routes.Session, params: { sessionId: this.session.id } };
    },
    sessionSpeakers(): Speaker[] {
      return this.session.speakers
        .map((id) => this.speakers.find((s) => s.id === id) as Speaker)
        .filter((s) => Boolean(s));
    },
    localeTitle(): string | null {
      return this.localise(this.session.title);
    },
    localeContent(): string | null {
      const content = this.localise(this.session.content);
      return content ? this.trim(stripMarkdown(content), 300) : null;
    },
    actions(): Set<ScheduleConfigAction> {
      return new Set(this.config.tileActions ?? ['join', 'addToCalendar']);
    },
    canAddToCalendar(): boolean {
      return (
        this.actions.has('addToCalendar') &&
        ['soon', 'future'].includes(this.slotState)
      );
    },
    canJoinSession(): boolean {
      return this.actions.has('join');
    },
    canAddToMySchedule(): boolean {
      return this.isSignedIn && this.actions.has('addToMySchedule');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headerAttributes(): any {
      const set = new Set(this.config.tileHeader);

      return {
        sessionType: set.has('type') ? this.sessionType : null,
        track: set.has('track') ? this.track : null,
        themes: set.has('themes') ? this.themes : null,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributesAttributes(): any {
      const set = new Set(this.config.tileAttributes);

      return {
        languages: set.has('languages') ? this.session.hostLanguages : null,
        isRecorded: set.has('recorded') ? this.session.isRecorded : null,
        track: set.has('track') ? this.track : null,
        themes: set.has('themes') ? this.themes : null,
        organisation: set.has('organisation')
          ? this.localise(this.session.hostOrganisation)
          : null,
      };
    },
  },
  methods: {
    trim(value: string, length: number): string {
      if (value.length < length) return value;
      return `${value.substring(0, length)}…`;
    },
    localise(object: Localised) {
      const fallbacks = [...this.session.hostLanguages];
      if (!fallbacks.includes('en')) fallbacks.push('en');
      return localiseFromObject(this.$i18n.locale, object, { fallbacks });
    },
    async toggleInterest() {
      const action = namespaceForApi(
        this.$deconf,
        this.isInterested ? 'unattend' : 'attend',
      );
      this.isProcessing = true;
      await this.$store.dispatch(action, this.session.id);
      this.isProcessing = false;
    },
  },
});
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
