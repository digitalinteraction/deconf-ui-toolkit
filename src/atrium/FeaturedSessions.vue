<template>
  <div class="featuredSessions">
    <p class="featuredSessions-title">
      {{ $t('deconf.featuredSessions.title') }}
    </p>
    <div class="featuredSessions-sessions">
      <!-- Each featured session -->
      <MiniSession
        class="featuredSessions-session"
        v-for="group in featured"
        :key="group.session.id"
        :session="group.session"
        :session-slot="group.slot"
        :current-date="currentDate"
      />
    </div>

    <!-- Post-sessions action -->
    <div class="buttons" v-if="showAction">
      <router-link class="button is-link is-fullwidth" :to="scheduleRoute">
        {{ $t('deconf.featuredSessions.action') }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { Routes, SessionAndSlot } from '../lib/module'

import MiniSession from './MiniSession.vue'

//
// i18n
// - deconf.featuredSessions.title - Title of featured sessions section
// - deconf.featuredSessions.action - Action of featured sessions section
//
// icons
// - n/a
//
// sass
// - $featuredSessions-titleSize
// - $featuredSessions-titleWeight
//

export default defineComponent({
  name: 'FeaturedSessions',
  components: { MiniSession },
  props: {
    featured: { type: Array as PropType<SessionAndSlot[]>, required: true },
    currentDate: { type: Date as PropType<Date>, required: true },
    showAction: { type: Boolean, default: true },
  },
  computed: {
    scheduleRoute(): RouteLocationRaw {
      return { name: Routes.Schedule }
    },
  },
})
</script>

<style lang="scss">
$featuredSessions-titleSize: $size-4 !default;
$featuredSessions-titleWeight: $weight-semibold !default;

.featuredSessions {
  background: $white;
  padding: 1.5rem;
  border-radius: $radius-large;

  .miniSession:not(:last-child) {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid $border;
    margin-bottom: 0.75rem;
  }
}

.featuredSessions-title {
  color: $primary;
  font-size: $featuredSessions-titleSize;
  font-weight: $featuredSessions-titleWeight;
  line-height: 1;
  margin-bottom: 1rem;
}

.featuredSessions-sessions {
  margin-bottom: $gap;
}
</style>
