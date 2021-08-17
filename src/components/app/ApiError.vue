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
import Vue from 'vue';
import countdown from 'countdown';
import UtilLayout from '../../layouts/UtilLayout.vue';

//
// I18n keys
// - deconf.apiError.title
// - deconf.apiError.content
// - deconf.apiError.retry
//

//
// TODO:
// - better i18n countdown
//

interface Data {
  timerId: number | null;
  retryDate: Date;
  timeLeft: number;
}

export default {
  components: { UtilLayout },
  props: {
    homeRoute: { type: Object }
  },
  data(): Data {
    const retryDate = new Date();
    retryDate.setMinutes(retryDate.getMinutes() + 1);

    return {
      timerId: null,
      retryDate,
      timeLeft: retryDate.getTime() - Date.now()
    };
  },
  computed: {
    timeMessage(): string {
      return countdown(Date.now() + this.timeLeft).toString();
    }
  },
  mounted(): void {
    this.timerId = setInterval(() => {
      this.timeLeft = Math.max(0, this.retryDate.getTime() - Date.now());

      if (this.timeLeft === 0) window.location.reload();
    }, 100);
  },
  destroyed(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
};
</script>
