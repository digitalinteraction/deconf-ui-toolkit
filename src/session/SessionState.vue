<template>
  <div class="sessionState">
    <!-- 
      Live now
    -->
    <span class="tag is-danger" v-if="isLive">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'circle']" />
        </span>
        <span>
          {{ $t('deconf.sessionState.liveNow') }}
        </span>
      </span>
    </span>

    <!--
      Session Ended
    -->
    <span class="tag is-dark" v-else-if="isOver">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" />
        </span>
        <span>
          {{ $t('deconf.sessionState.sessionOver') }}
        </span>
      </span>
    </span>

    <!--
      Attendance
    -->
    <span class="tag is-white" v-else-if="isFuture">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'fire']" />
        </span>
        <span>
          {{ $tc('deconf.sessionState.interest', attendance) }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// i18n
// - deconf.sessionState.liveNow - State text when a session is live
// - deconf.sessionState.sessionOver - State text when a session is in the past
// - deconf.sessionState.interest - State text to show registrations (^c)
//
// icons
// - fas circle
// - fas exclamation-triangle
// - fas fire
//
// sass
// - n/a
//

export default {
  name: 'SessionState',
  components: { FontAwesomeIcon },
  props: {
    attendance: { type: Number, default: null },
    slotState: { type: String, required: true },
  },
  computed: {
    isLive(): boolean {
      return this.slotState === 'present';
    },
    isOver(): boolean {
      return this.slotState === 'past';
    },
    isFuture(): boolean {
      return (
        ['future', 'soon'].includes(this.slotState) && this.attendance !== null
      );
    },
  },
};
</script>

<style lang="scss">
.sessionState {
  font-weight: $weight-bold;
  text-transform: uppercase;

  > .tag {
    padding: 1.1em;
  }
}
</style>
