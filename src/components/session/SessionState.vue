<template>
  <div class="slotState">
    <!-- 
      Live now
    -->
    <span class="tag is-danger" v-if="isLive">
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'circle']" />
        </span>
        <span>
          {{ $t('deconf.session.liveNow') }}
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
          {{ $t('deconf.session.sessionOver') }}
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
          {{ $tc('deconf.session.interest', attendance) }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n Strings
// - deconf.session.liveNow
// - deconf.session.sessionOver
// - deconf.session.interest
//

export default {
  name: 'SessionState',
  components: { FontAwesomeIcon },
  props: {
    attendance: { type: Number, default: null },
    slotState: { type: String, required: true }
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
    }
  }
};
</script>

<style lang="scss">
.slotState {
  font-weight: $weight-bold;
  text-transform: uppercase;

  > .tag {
    padding: 1.1em;
  }
}
</style>
