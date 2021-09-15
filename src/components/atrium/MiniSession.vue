<template>
  <div class="miniSession">
    <!-- Countdown "tags" -->
    <div class="tags">
      <span class="tag is-danger is-uppercase" v-if="isLive">
        {{ $t('deconf.miniSession.live') }}
      </span>
      <span class="tag is-grey" v-else>
        {{ localeCountdown }}
      </span>
    </div>

    <!-- Session title -->
    <p class="miniSession-title">
      <router-link :to="sessionRoute">
        {{ localeTitle }}
      </router-link>
    </p>

    <div class="miniSession-columns">
      <!-- Session date -->
      <p class="miniSession-date">
        {{ localeDate }}
      </p>

      <!-- Session button -->
      <p class="miniSession-actions">
        <router-link class="button is-link is-light" :to="sessionRoute">
          <span>
            {{ $t('deconf.miniSession.view') }}
          </span>
          <span class="icon">
            <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
          </span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  localiseFromObject,
  Routes,
  getCountdown,
  getCountdownMessage,
  RouterLocation,
  FontAwesomeIcon,
} from '../../lib/module'
import { defineComponent, PropType } from 'vue'
import { Session, SessionSlot } from '@openlab/deconf-shared'

//
// i18n
// - deconf.miniSession.live - Live tag on a mini session
// - deconf.miniSession.view - Action to view a mini session
// - deconf.general.hours
// - deconf.general.minutes
// - deconf.general.seconds
//
// icons
// - fas arrow-right
//
// sass
// - $miniSession-titleSize
// - $miniSession-titleWeight
//

export default defineComponent({
  name: 'MiniSession',
  components: { FontAwesomeIcon },
  props: {
    session: { type: Object as PropType<Session>, required: true },
    sessionSlot: {
      type: Object as PropType<SessionSlot>,
      required: true,
    },
    currentDate: { type: Date as PropType<Date>, required: true },
  },
  computed: {
    localeTitle(): string | null {
      return localiseFromObject(this.$i18n.locale, this.session.title)
    },
    localeDate(): string {
      return this.sessionSlot.start.toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    },
    sessionRoute(): RouterLocation {
      return {
        name: Routes.Session,
        params: { sessionId: this.session.id },
      }
    },
    isLive(): boolean {
      return (
        this.currentDate.getTime() > this.sessionSlot.start.getTime() &&
        this.currentDate.getTime() < this.sessionSlot.end.getTime()
      )
    },
    localeCountdown(): string {
      return getCountdownMessage(
        getCountdown(this.currentDate, this.sessionSlot.start),
        (key, value) => this.$tc(key, value)
      )
    },
  },
})
</script>

<style lang="scss">
$miniSession-titleSize: $size-3 !default;
$miniSession-titleWeight: $weight-semibold !default;

.miniSession {
  .tags {
    font-weight: $weight-bold;
    margin-bottom: 0;
  }
}
.miniSession-title {
  font-size: $miniSession-titleSize;
  font-weight: $miniSession-titleWeight;

  line-height: 1;
  font-size: $size-5;
  margin-bottom: 0.5rem;

  a {
    color: $black;
  }
  a:hover {
    text-decoration: underline;
  }
}
.miniSession-columns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
</style>
