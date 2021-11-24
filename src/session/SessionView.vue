<template>
  <SessionLayout class="sessionView">
    <!-- Back button -->
    <slot name="backButton" slot="backButton" />

    <!-- state bit -->
    <SessionState
      slot="state"
      :slot-state="slotState"
      :attendance="stateAttendance"
    />

    <!-- Main bit -->
    <div slot="main" class="sessionView-main">
      <!-- Session header -->
      <div class="sessionView-header">
        <SessionHeader v-if="sessionType" :session-type="sessionType" />
      </div>

      <!-- Title -->
      <h1 class="sessionView-title">
        {{ localeTitle }}
      </h1>

      <!-- Language warning -->
      <div class="sessionView-langWarning" v-if="showLanguageWarning">
        <LanguageWarning :available-languages="session.hostLanguages" />
      </div>

      <!-- Embed -->
      <div class="sessionView-embed" v-if="showPrimaryLink">
        <PrimaryEmbed
          :link="primaryLink.url"
          @click="trackLinkClick(primaryLink.url)"
        />
      </div>

      <slot name="afterEmbed" />

      <!-- Attributes -->
      <div class="sessionView-attributes">
        <SessionAttributes
          :languages="session.hostLanguages"
          :is-recorded="session.isRecorded"
          :track="sessionTrack"
          :themes="sessionThemes"
          :organisation="localisedSessionOrg"
        />
      </div>

      <slot name="afterAttributes" />

      <div class="sessionView-content">
        <div class="content">
          {{ localeContent }}
        </div>
      </div>

      <slot name="afterContent" />
    </div>

    <!-- Sidebar -->
    <div slot="sidebar" class="sessionView-sidebar">
      <!-- Slot -->
      <template v-if="sessionSlot">
        <SidebarItem :title="$t('deconf.session.slot')">
          <TimeSlot
            :slot-state="slotState"
            :start-date="sessionSlot.start"
            :end-date="sessionSlot.end"
          />
        </SidebarItem>
      </template>

      <!-- Countdown -->
      <template v-if="showCountdown">
        <SidebarItem :title="$t('deconf.session.countdown')">
          <Countdown
            :current-date="scheduleDate"
            :target-date="sessionSlot.start"
          />
        </SidebarItem>
      </template>

      <!-- Link preview -->
      <template v-if="showLinkPreview && !canShowLinks">
        <SidebarItem :title="$t('deconf.session.links')">
          <div class="notification is-warning">
            {{ $t('deconf.session.linkPreview') }}
          </div>
        </SidebarItem>
      </template>

      <!-- Links -->
      <template v-if="showLinksSection">
        <SidebarItem :title="$t('deconf.session.links')">
          <Stack direction="vertical" gap="regular" align="stretch">
            <slot name="beforeLinks" />
            <SecondaryEmbed v-if="secondaryLink" :link="secondaryLink.url" />
            <SessionLink
              v-for="link in otherLinks"
              :key="link.url"
              :link="link.url"
              :title="link.title || getLinkName(link)"
              @click="trackLinkClick(link.url)"
              @copy="trackLinkCopy(link.url)"
            />
            <slot name="afterLinks" />
          </Stack>
        </SidebarItem>
      </template>

      <!-- Session Actions -->
      <template
        v-if="showAttendance || showInterest || !loggedIn || showCalendar"
      >
        <SidebarItem :title="$t('deconf.session.actions')">
          <Stack direction="vertical" gap="regular" align="stretch">
            <AttendanceSection
              v-if="showAttendance"
              :session="session"
              :session-cap="session.participantCap"
              :attendance="attendance"
              :is-processing="isLoading"
              @attend="attend"
              @unattend="unattend"
            />
            <InterestSection
              v-if="showInterest"
              :session="session"
              :attendance="attendance"
              :is-processing="isLoading"
              @attend="attend"
              @unattend="unattend"
            />
            <div class="notification is-danger is-light" v-if="!loggedIn">
              {{ $t('deconf.session.logIn') }}
            </div>
            <AddToCalendar
              v-if="showCalendar"
              class="is-fullwidth is-link"
              :calendar-link="calendarLink"
              @click="trackCalendar"
            />
          </Stack>
        </SidebarItem>
      </template>

      <!-- Speakers -->
      <template v-if="sessionSpeakers.length > 0">
        <SidebarItem :title="$t('deconf.session.speakers')">
          <SpeakerGrid :speakers="sessionSpeakers" />
        </SidebarItem>
      </template>
    </div>
  </SessionLayout>
</template>

<script lang="ts">
import {
  Session,
  LocalisedLink,
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Localised,
  ScheduleRecord,
  UserSessionAttendance
} from '@openlab/deconf-shared';
import { PropType } from 'vue';
import {
  createAttendanceEvent,
  createICalEvent,
  createSessionLinkEvent,
  getLocaleLinks,
  getSlotState,
  localiseFromObject,
  parsePrimaryLink,
  parseSecondaryLink,
  SlotState
} from '../lib/module';
import SessionLayout from './SessionLayout.vue';

import PrimaryEmbed from './PrimaryEmbed.vue';
import SessionState from './SessionState.vue';
import Countdown from './Countdown.vue';
import SidebarItem from './SidebarItem.vue';
import SessionLink from './SessionLink.vue';
import AttendanceSection from './AttendanceSection.vue';
import LanguageWarning from './LanguageWarning.vue';
import SecondaryEmbed from './SecondaryEmbed.vue';
import InterestSection from './InterestSection.vue';

import { SpeakerGrid, TimeSlot } from '../schedule/module';
import {
  Stack,
  SessionAttributes,
  SessionHeader,
  AddToCalendar
} from '../core/module';

// 30 seconds
const LINKS_INTERVAL = 60 * 1000;

const LANGUAGES: Record<string, string | undefined> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ar: 'عربى'
};

//
// i18n
// - deconf.session.slot
// - deconf.session.countdown
// - deconf.session.links
// - deconf.session.linkPreview
// - deconf.session.actions
// - deconf.session.logIn
// - deconf.session.speakers
// - deconf.session.zoomLink
// - deconf.session.teamsLink
// - deconf.session.miroLink
// - deconf.session.generalLink
//
// icons
// - n/a
//
// sass
// - $sessionView-titleSize
// - $sessionView-titleWeight
// - $sessionView-titleFamily
//

interface Data {
  timerId: number | null;
  links: LocalisedLink[] | null;
  attendance: null | UserSessionAttendance;
  isLoading: boolean;
}

export default {
  name: 'SessionView',
  components: {
    AddToCalendar,
    AttendanceSection,
    Countdown,
    InterestSection,
    LanguageWarning,
    PrimaryEmbed,
    SecondaryEmbed,
    SessionAttributes,
    SessionHeader,
    SessionLayout,
    SessionLink,
    SessionState,
    SidebarItem,
    SpeakerGrid,
    Stack,
    TimeSlot
  },
  props: {
    apiModule: { type: String, required: true },
    session: { type: Object as PropType<Session>, required: true },
    loggedIn: { type: Boolean, required: true },
    schedule: { type: Object as PropType<ScheduleRecord>, required: true },
    scheduleDate: { type: Date as PropType<Date>, required: true }
  },
  data(): Data {
    return {
      timerId: null,
      links: null,
      attendance: null,
      isLoading: false
    };
  },
  computed: {
    sessionSlot(): SessionSlot | null {
      return this.schedule.slots.find(s => s.id === this.session.slot) || null;
    },
    sessionType(): SessionType | null {
      return this.schedule.types.find(s => s.id === this.session.type) || null;
    },
    sessionTrack(): SessionType | null {
      return this.schedule.types.find(s => s.id === this.session.type) || null;
    },
    sessionSpeakers(): Speaker[] {
      const ids = new Set(this.session.speakers);
      return this.schedule.speakers.filter(s => ids.has(s.id));
    },
    sessionThemes(): Theme[] {
      const ids = new Set(this.session.themes);
      return this.schedule.themes.filter(t => ids.has(t.id));
    },
    localisedSessionOrg(): string | null {
      return this.localise(this.session.hostOrganisation);
    },
    localeLinks(): LocalisedLink[] | null {
      if (!this.links) return null;
      return getLocaleLinks(this.links, this.$i18n.locale, 'en');
    },
    primaryLink(): LocalisedLink | undefined {
      if (!this.localeLinks) return undefined;
      return this.localeLinks.find(l => Boolean(parsePrimaryLink(l.url)));
    },
    secondaryLink(): LocalisedLink | undefined {
      if (!this.localeLinks) return undefined;
      return this.localeLinks.find(l => Boolean(parseSecondaryLink(l.url)));
    },
    otherLinks(): LocalisedLink[] | null {
      if (!this.localeLinks) return null;
      return this.localeLinks.filter(
        l => l !== this.primaryLink && l !== this.secondaryLink
      );
    },
    slotState(): SlotState {
      if (!this.sessionSlot) return 'future';
      return getSlotState(
        this.scheduleDate,
        this.sessionSlot.start,
        this.sessionSlot.end
      );
    },
    localeTitle(): string | null {
      return this.localise(this.session.title);
    },
    localeContent(): string | null {
      return this.localise(this.session.content);
    },
    showCountdown(): boolean {
      return this.slotState === 'soon';
    },
    showLinkPreview(): boolean {
      if (!this.links) return false;
      return this.links.length > 0 && this.slotState === 'soon';
    },

    /** Whether links can be shown at all (ie <= 15m before the session) */
    canShowLinks(): boolean {
      if (!this.sessionSlot) return false;

      const enableTime = new Date(this.sessionSlot.start.getTime());
      enableTime.setMinutes(enableTime.getMinutes() - 15);

      return this.scheduleDate.getTime() > enableTime.getTime();
    },
    showPrimaryLink(): boolean {
      return this.canShowLinks && Boolean(this.primaryLink);
    },
    showLinksSection(): boolean {
      if (!this.canShowLinks) return false;
      return Boolean(this.secondaryLink) || (this.otherLinks || []).length > 0;
    },
    showAttendance(): boolean {
      return (
        this.slotState !== 'past' &&
        this.session.participantCap !== null &&
        this.loggedIn
      );
    },
    showInterest(): boolean {
      return (
        this.slotState !== 'past' &&
        this.session.participantCap === null &&
        this.loggedIn
      );
    },
    showCalendar(): boolean {
      return (
        ['future', 'soon'].includes(this.slotState) &&
        Boolean(this.calendarLink) &&
        !this.showLinksSection
      );
    },
    calendarLink(): string | null {
      return this.$deconf.getCalendarLink(this.session);
    },
    stateAttendance(): number | null {
      if (this.attendance === null) return null;
      if (this.session.participantCap !== null) return null;

      return this.attendance.sessionCount;
    },
    showLanguageWarning(): boolean {
      if (!this.session) return false;
      return !this.session.hostLanguages.includes(this.$i18n.locale);
    }
  },
  mounted() {
    // initially fetch links and attendance
    this.fetchSessionData();

    // Setup a timers to regularly pull links and updatre the current date
    this.timerId = window.setInterval(() => {
      this.fetchLinks();
    }, LINKS_INTERVAL);
  },
  destroyed() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  },
  methods: {
    async fetchSessionData() {
      this.isLoading = true;

      await Promise.all([this.fetchLinks(), this.fetchAttendance()]);

      this.isLoading = false;
    },
    async fetchLinks() {
      if (!this.loggedIn) return;
      const result = await this.$store.dispatch(
        `${this.apiModule}/fetchLinks`,
        this.session.id
      );
      this.links = result ? result.links : null;
    },
    async fetchAttendance() {
      this.attendance = await this.$store.dispatch(
        `${this.apiModule}/fetchSessionAttendance`,
        this.session.id
      );
    },
    async attend() {
      this.isLoading = true;

      await this.$store.dispatch(`${this.apiModule}/attend`, this.session.id);
      this.$deconf.trackMetric(
        createAttendanceEvent('attend', this.session.id)
      );
      this.fetchSessionData();

      this.isLoading = false;
    },
    async unattend() {
      this.isLoading = true;

      await this.$store.dispatch(`${this.apiModule}/unattend`, this.session.id);
      this.$deconf.trackMetric(
        createAttendanceEvent('unattend', this.session.id)
      );
      this.fetchSessionData();

      this.isLoading = false;
    },
    getLinkName(link: LocalisedLink) {
      let name = this.$t('deconf.session.generalLink');
      if (link.url.includes('zoom')) {
        name = this.$t('deconf.session.zoomLink');
      }
      if (link.url.includes('teams')) {
        name = this.$t('deconf.session.teamsLink');
      }
      if (link.url.includes('miro')) {
        name = this.$t('deconf.session.miroLink');
      }
      return `${name} – ${LANGUAGES[link.language] || link.language}`;
    },
    trackCalendar() {
      this.$deconf.trackMetric(createICalEvent(this.session.id));
    },
    trackLinkClick(link: string) {
      this.$deconf.trackMetric(
        createSessionLinkEvent(this.session.id, 'click', link)
      );
    },
    trackLinkCopy(link: string) {
      this.$deconf.trackMetric(
        createSessionLinkEvent(this.session.id, 'copy', link)
      );
    },
    localise(object: Localised): string | null {
      const fallbacks = [...this.session.hostLanguages];
      if (!fallbacks.includes('en')) fallbacks.push('en');
      return localiseFromObject(this.$i18n.locale, object, { fallbacks });
    }
  }
};
</script>

<style lang="scss">
$sessionView-titleSize: $size-3 !default;
$sessionView-titleWeight: bold !default;
$sessionView-titleFamily: $family-title !default;

.sessionView {
  flex: 1; // Fill AppLayout
}

.sessionView-title {
  font-size: $sessionView-titleSize;
  font-weight: $sessionView-titleWeight;
  font-family: $sessionView-titleFamily;
  line-height: 1;
}

.sessionView-title,
.sessionView-embed,
.sessionView-attributes,
.sessionView-langWarning {
  padding-bottom: 1rem;
}
</style>