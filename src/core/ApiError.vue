<template>
  <div class="content">
    <h1 class="title">{{ $t('deconf.apiError.title') }}</h1>
    <p>{{ $t('deconf.apiError.content') }}</p>
    <p>{{ $t('deconf.apiError.retry', [localeCountdown]) }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { getCountdown, getCountdownMessage } from '../lib/module.js';

//
// i18n
// - deconf.apiError.title - Title if the API is unreachable
// - deconf.apiError.content - Text if an the API is unreachable
// - deconf.apiError.retry - Message for retrying if the API is unreachable (^1)
// - deconf.general.hours
// - deconf.general.minutes
// - deconf.general.seconds
//
// icons
// - n/a
//
// sass
// - n/a
//

const TICK_INTERVAL = 500;

export interface _Data {
  timerId: number | null;
  retryDate: Date;
  currentDate: Date;
}

export default defineComponent({
  name: 'ApiError',
  props: {
    homeRoute: { type: Object as PropType<RouteLocationRaw>, required: true },
    retry: { type: Number, default: 1 },
  },
  data(): _Data {
    const retryDate = new Date();
    retryDate.setMinutes(retryDate.getMinutes() + this.retry);

    return {
      timerId: null,
      retryDate,
      currentDate: new Date(),
    };
  },
  computed: {
    localeCountdown(): string | null {
      return getCountdownMessage(
        getCountdown(this.currentDate, this.retryDate),
        (key, value) => this.$tc(key, value),
      );
    },
  },
  mounted(): void {
    this.timerId = window.setInterval(() => {
      this.currentDate = new Date();
      const timeLeft = this.retryDate.getTime() - this.currentDate.getTime();

      if (timeLeft < 1500) {
        window.location.reload();
      }
    }, TICK_INTERVAL);
  },
  unmounted(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  },
});
</script>
