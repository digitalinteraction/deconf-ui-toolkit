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

      <!-- Embed -->
      <div class="sessionView-embed" v-if="showPrimaryLink">
        <SessionEmbed :link="primaryLink.url" />
      </div>

      <!-- Attributes -->
      <div class="sessionView-attributes">
        <!-- TODO: allow what is shown to be customisable -->
        <SessionAttributes
          :languages="session.hostLanguages"
          :is-recorded="session.isRecorded"
          :track="sessionTrack"
          :themes="sessionThemes"
        />
      </div>
      <div class="sessionView-content">
        <div class="content">
          {{ localeContent }}
        </div>
      </div>
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
      <template v-if="showSecondaryLinks">
        <SidebarItem :title="$t('deconf.session.links')">
          <Stack direction="vertical" gap="regular" align="stretch">
            <SessionLink
              v-for="link in secondaryLinks"
              :key="link.url"
              :link="link.url"
              :title="link.title || guessLinkName(link.url)"
              @click="trackLinkClick(link.url)"
              @copy="trackLinkCopy(link.url)"
            />
          </Stack>
        </SidebarItem>
      </template>

      <!-- Session Actions -->
      <template v-if="showCalendar || showAttendance">
        <SidebarItem :title="$t('deconf.session.actions')">
          <Stack direction="vertical" gap="regular" align="stretch">
            <AttendanceSection
              v-if="showAttendance && loggedIn"
              :session="session"
              :session-cap="session.participantCap"
              :attendance="attendance"
              :is-processing="isLoading"
              @attend="attend"
              @unattend="unattend"
            />
            <div
              class="notification is-danger is-light"
              v-if="showAttendance && !loggedIn"
            >
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
  SessionAttendance,
  SessionLink as ISessionLink,
  SessionSlot,
  SessionType,
  Speaker,
  Theme
} from '@openlab/deconf-shared';
import { PropType } from 'vue';
import { FullSchedule } from '../../lib/api';
import {
  createICalEvent,
  createSessionLinkEvent,
  getSlotState,
  localiseFromObject,
  parseEmbedLink,
  SlotState
} from '../../lib/module';
import { SessionLayout } from '../../layouts/module';
import {
  SessionAttributes,
  SessionHeader,
  SessionEmbed,
  SessionState,
  Countdown,
  SidebarItem,
  SessionLink,
  TimeSlot,
  AddToCalendar,
  AttendanceSection,
  SpeakerGrid,
  Stack
} from '../../components/module';

// 30 seconds
const LINKS_INTERVAL = 60 * 1000;

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
// - fas calendar-plus
//
// sass
// - n/a
//

interface Data {
  timerId: number | null;
  links: ISessionLink[] | null;
  attendance: null | SessionAttendance;
  isLoading: boolean;
}

export default {
  components: {
    SessionLayout,
    SessionAttributes,
    SessionHeader,
    SessionEmbed,
    SessionState,
    Countdown,
    SidebarItem,
    SessionLink,
    TimeSlot,
    AddToCalendar,
    AttendanceSection,
    SpeakerGrid,
    Stack
  },
  props: {
    apiModule: { type: String, required: true },
    session: { type: Object as PropType<Session>, required: true },
    loggedIn: { type: Boolean, required: true },
    schedule: { type: Object as PropType<FullSchedule>, required: true },
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
    primaryLink(): ISessionLink | null {
      if (!this.links) return null;
      return this.links.find(l => (parseEmbedLink(l.url) ? l : null)) || null;
    },
    secondaryLinks(): ISessionLink[] | null {
      if (!this.links) return null;

      return this.links.filter(l => l !== this.primaryLink);
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
      return localiseFromObject(this.$i18n.locale, this.session.title);
    },
    localeContent(): string | null {
      return localiseFromObject(this.$i18n.locale, this.session.content);
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
    showSecondaryLinks(): boolean {
      return this.canShowLinks && (this.secondaryLinks || []).length > 0;
    },
    showAttendance(): boolean {
      return this.slotState !== 'past' && this.session.participantCap !== null;
    },
    showCalendar(): boolean {
      return (
        ['future', 'soon'].includes(this.slotState) &&
        Boolean(this.calendarLink) &&
        !this.showSecondaryLinks
      );
    },
    calendarLink(): string | null {
      return this.$deconf.getCalendarLink(this.session);
    },
    stateAttendance(): number | null {
      if (this.attendance === null) return null;
      if (this.session.participantCap === null) return null;

      return this.attendance.count;
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
      console.log('fetchLinks', this.loggedIn);
      if (!this.loggedIn) return;
      this.links = await this.$store.dispatch(
        `${this.apiModule}/fetchLinks`,
        this.session.id
      );
    },
    async fetchAttendance() {
      this.attendance = await this.$store.dispatch(
        `${this.apiModule}/fetchSessionAttendance`,
        this.session.id
      );
    },
    async attend() {
      this.$store.dispatch(`${this.apiModule}/attend`, this.session.id);
      this.fetchSessionData();
    },
    async unattend() {
      this.$store.dispatch(`${this.apiModule}/unattend`, this.session.id);
      this.fetchSessionData();
    },
    guessLinkName(link: string) {
      if (link.includes('zoom')) return this.$t('deconf.session.zoomLink');
      if (link.includes('teams')) return this.$t('deconf.session.teamsLink');
      if (link.includes('miro')) return this.$t('deconf.session.miroLink');
      return this.$t('deconf.session.generalLink');
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
    }
  }
};
</script>

<style lang="scss">
.sessionView {
  flex: 1; // Fill AppLayout
}

.sessionView-header {
}
.sessionView-title {
  // TODO: @include title-font
  font-size: $size-3;
  font-weight: bold;
  line-height: 1;
}

.sessionView-title,
.sessionView-embed,
.sessionView-attributes {
  padding-bottom: 1rem;
}

// TODO: move more from MozFest
</style>
