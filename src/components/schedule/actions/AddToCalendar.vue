<template>
  <a
    class="addToCalendar button"
    :href="calendarLink"
    target="_blank"
    rel="noopener"
    @click="onClick"
  >
    <span class="icon">
      <FontAwesomeIcon :icon="['fas', 'calendar-plus']" />
    </span>
    <span>
      {{ $t('deconf.addToCalendar.action') }}
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FontAwesomeIcon } from '../../../lib/module'

//
// i18n
// - deconf.addToCalendar.action - Button to add to calendar
//
// icons
// - fas calendar-plus
//
// sass
// - n/a
//

export default defineComponent({
  name: 'AddToCalendar',
  components: { FontAwesomeIcon },
  props: {
    calendarLink: { type: String, required: true },
  },
  methods: {
    onClick(event: MouseEvent): void {
      this.$emit('click', event)
    },
  },
})
</script>

<style lang="scss">
@include mobile {
  .addToCalendar.button {
    width: 100%;
  }
}
</style>
