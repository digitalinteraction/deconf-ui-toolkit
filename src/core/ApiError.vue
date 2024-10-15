<template>
  <UtilLayout :home-route="homeRoute">
    <template v-slot:brand>
      <slot name="brand"></slot>
    </template>
    <template v-slot:main>
      <div class="content">
        <h1 class="title">{{ $t('deconf.apiError.title') }}</h1>
        <p>{{ $t('deconf.apiError.content') }}</p>
        <p>{{ $t('deconf.apiError.retry', [localeCountdown]) }}</p>
      </div>
    </template>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
  </UtilLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCountdown, getCountdownMessage } from '../lib/module.js'
import UtilLayout from './UtilLayout.vue'

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

const TICK_INTERVAL = 500

interface Data {
  timerId: number | null
  retryDate: Date
  currentDate: Date
}

export default defineComponent({
  name: 'ApiError',
  components: { UtilLayout },
  props: {
    homeRoute: { type: Object, required: true },
    retry: { type: Number, default: 1 },
  },
  data(): Data {
    const retryDate = new Date()
    retryDate.setMinutes(retryDate.getMinutes() + this.retry)

    return {
      timerId: null,
      retryDate,
      currentDate: new Date(),
    }
  },
  computed: {
    localeCountdown(): string | null {
      return getCountdownMessage(
        getCountdown(this.currentDate, this.retryDate),
        (key, value) => this.$tc(key, value),
      )
    },
  },
  mounted(): void {
    this.timerId = window.setInterval(() => {
      this.currentDate = new Date()
      const timeLeft = this.retryDate.getTime() - this.currentDate.getTime()

      if (timeLeft < 1500) {
        window.location.reload()
      }
    }, TICK_INTERVAL)
  },
  unmounted(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId)
    }
  },
})
</script>
