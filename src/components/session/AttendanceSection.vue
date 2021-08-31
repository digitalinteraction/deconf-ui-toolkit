<template>
  <div class="attendanceSection">
    <p class="attendanceSection-message">
      {{ localeMessage }}
    </p>
    <button
      class="attendanceSection-button button"
      @click="register"
      :class="buttonClasses"
      :disabled="disabled"
    >
      <span class="icon">
        <FontAwesomeIcon :icon="icon" />
      </span>
      <span>
        {{ localeAction }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { TranslateResult } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { Session, SessionAttendance } from '../../lib/module';

//
// i18n
// - deconf.attendanceSection.loading - Message when attendance is being loaded
// - deconf.attendanceSection.processing - Message when attendance is being changed
// - deconf.attendanceSection.registered - Message when registered for a session
// - deconf.attendanceSection.full - Message when a session is full
// - deconf.attendanceSection.spacesLeft - How many seats are available ^2
// - deconf.attendanceSection.registerButton - Action to take a seat
// - deconf.attendanceSection.unregisterButton - Action to release a seat
//
// icons
// - fas times
// - fas user-plus
//
// sass
// - n/a
//

export default {
  name: 'AttendanceSection',
  components: { FontAwesomeIcon },
  props: {
    session: { type: Object as PropType<Session>, required: true },
    sessionCap: { type: Number, required: true },
    attendance: {
      type: Object as PropType<SessionAttendance | null>,
      default: null
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRegistered(): boolean {
      if (!this.attendance) return false;
      return this.attendance.isAttending;
    },
    isFull(): boolean {
      if (!this.attendance) return false;
      return this.attendance.sessionCount >= this.sessionCap;
    },
    isInactive(): boolean {
      return this.isProcessing || this.attendance === null;
    },
    buttonClasses(): string {
      if (this.isInactive) return 'is-loading';
      if (this.isRegistered) return 'is-danger is-outlined';
      return 'is-primary';
    },
    disabled(): boolean {
      return this.isInactive || (this.isFull && !this.isRegistered);
    },
    icon(): string[] {
      return this.isRegistered ? ['fas', 'times'] : ['fas', 'user-plus'];
    },
    localeMessage(): TranslateResult {
      if (!this.attendance) return this.$t('deconf.attendanceSection.loading');

      if (this.isInactive) {
        return this.$t('deconf.attendanceSection.processing');
      }

      if (this.isRegistered) {
        return this.$t('deconf.attendanceSection.registered');
      }

      if (this.isFull) {
        return this.$t('deconf.attendanceSection.full');
      }

      const spacesLeft = this.sessionCap - this.attendance.sessionCount;
      return this.$t('deconf.attendanceSection.spacesLeft', [
        spacesLeft,
        this.sessionCap
      ]);
    },
    localeAction(): TranslateResult {
      return this.isRegistered
        ? this.$t('deconf.attendanceSection.unregisterButton')
        : this.$t('deconf.attendanceSection.registerButton');
    }
  },
  methods: {
    async register(): Promise<void> {
      if (this.disabled) return;
      this.$emit(this.isRegistered ? 'unattend' : 'attend');
    }
  }
};
</script>

<style lang="scss">
.attendanceSection {
  // ...
}
.attendanceSection-message {
  font-weight: $weight-bold;
  margin-bottom: 0.3em;
}
.attendanceSection-button {
  width: 100%;
}
</style>
