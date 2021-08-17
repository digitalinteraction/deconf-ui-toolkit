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
  Session,
  SessionSlot,
  localiseFromObject,
  Routes,
  getCountdown
} from '../../lib/module';
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Location } from 'vue-router';

//
// I18n
// - deconf.miniSession.view
//

export default {
  components: { FontAwesomeIcon },
  props: {
    session: { type: Object as PropType<Session>, required: true },
    sessionSlot: {
      type: Object as PropType<SessionSlot>,
      required: true
    },
    currentDate: { type: Date as PropType<Date>, required: true }
  },
  computed: {
    localeTitle(): string | null {
      return localiseFromObject(this.$i18n.locale, this.session.title);
    },
    localeDate(): string {
      return this.sessionSlot.start.toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    },
    sessionRoute(): Location {
      return {
        name: Routes.Session,
        params: { sessionId: this.session.id }
      };
    },
    isLive(): boolean {
      return (
        this.currentDate.getTime() > this.sessionSlot.start.getTime() &&
        this.currentDate.getTime() < this.sessionSlot.end.getTime()
      );
    },
    localeCountdown(): string {
      const { hours, minutes, seconds } = getCountdown(
        this.currentDate,
        this.sessionSlot.start
      );

      return [
        hours + ' ' + this.$tc('deconf.general.hours', hours),
        minutes + ' ' + this.$tc('deconf.general.minutes', minutes),
        seconds + ' ' + this.$tc('deconf.general.seconds', seconds)
      ].join(', ');
    }
  }
};
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
