<template>
  <UtilLayout :home-route="homeRoute">
    <slot name="brand" slot="brand" />
    <div class="content" slot="main">
      <h1 class="title">{{ $t('deconf.apiError.title') }}</h1>
      <p>{{ $t('deconf.apiError.content') }}</p>
      <p>{{ $t('deconf.apiError.retry', [timeMessage]) }}</p>
    </div>
    <slot name="footer" slot="footer" />
  </UtilLayout>
</template>

<script lang="ts">
import { getCountdown } from '../../lib/module';
import UtilLayout from '../../layouts/UtilLayout.vue';

//
// I18n keys
// - deconf.apiError.title
// - deconf.apiError.content
// - deconf.apiError.retry
//

const TICK_INTERVAL = 500;

interface Data {
  timerId: number | null;
  retryDate: Date;
  currentDate: Date;
}

export default {
  components: { UtilLayout },
  props: {
    homeRoute: { type: Object, required: true },
    retry: { type: Number, default: 1 }
  },
  data(): Data {
    const retryDate = new Date();
    retryDate.setMinutes(retryDate.getMinutes() + this.retry);

    return {
      timerId: null,
      retryDate,
      currentDate: new Date()
    };
  },
  computed: {
    timeMessage(): string {
      const { hours, minutes, seconds } = getCountdown(
        this.currentDate,
        this.retryDate
      );
      const tc = (value: number, unit: string) => {
        if (!value) return null;
        return `${value} ${this.$tc(`deconf.general.${unit}`, value)}`;
      };
      return [
        tc(hours, 'hours'),
        tc(minutes, 'minutes'),
        tc(seconds, 'seconds')
      ]
        .filter(t => Boolean(t))
        .join(' ');
    }
  },
  mounted(): void {
    this.timerId = window.setInterval(() => {
      this.currentDate = new Date();
      const timeLeft = this.retryDate.getTime() - this.currentDate.getTime();

      if (timeLeft <= 1) window.location.reload();
    }, TICK_INTERVAL);
  },
  destroyed(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }
};
</script>
