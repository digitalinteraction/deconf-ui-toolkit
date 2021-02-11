<template>
  <div class="countdown">
    <div class="countdown-component">
      <div class="countdown-number">{{ hoursRemaining }}</div>
      <div class="countdown-unit">
        {{ $tc('deconf.general.hours', hoursRemaining) }}
      </div>
    </div>
    <div class="countdown-component">
      <div class="countdown-number">{{ minutesRemaining }}</div>
      <div class="countdown-unit">
        {{ $tc('deconf.general.minutes', minutesRemaining) }}
      </div>
    </div>
    <div class="countdown-component">
      <div class="countdown-number">{{ secondsRemaining }}</div>
      <div class="countdown-unit">
        {{ $tc('deconf.general.seconds', secondsRemaining) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

//
// I18n used:
// - deconf.general.hours
// - deconf.general.minutes
// - deconf.general.seconds
//

export default {
  name: 'Countdown',
  props: {
    currentDate: { type: Date as PropType<Date>, required: true },
    targetDate: { type: Date as PropType<Date>, required: true }
  },
  computed: {
    remaining(): { hours: number; minutes: number; seconds: number } {
      let remaining = this.targetDate.getTime() - this.currentDate.getTime();

      // Remaining hours
      const hours = Math.floor(remaining / 3600000);
      remaining = remaining - hours * 3600000;

      // Remaining minutes
      const minutes = Math.floor(remaining / 60000);
      remaining = remaining - minutes * 60000;

      // Remaining seconds
      const seconds = Math.floor(remaining / 1000);
      remaining = remaining - seconds * 1000;

      return { hours, minutes, seconds };
    },
    hoursRemaining(): number {
      return this.remaining.hours;
    },
    minutesRemaining(): number {
      return this.remaining.minutes;
    },
    secondsRemaining(): number {
      return this.remaining.seconds;
    }
  }
};
</script>

<style lang="scss">
$countdown-background: $success !default;
$countdown-color: $white !default;

.countdown {
  display: flex;
  background-color: $countdown-background;
  color: $countdown-color;
  border-radius: $radius-large;
}
.countdown-component {
  flex: 1;
  text-align: center;
  padding: 20px 10px;
}
.countdown-number {
  font-size: 2.5em;
  font-weight: $weight-bold;
  line-height: 1;
}
.countdown-unit {
  font-size: 0.9em;
  text-transform: uppercase;
  opacity: 0.8;
  line-height: 1;
}
</style>
