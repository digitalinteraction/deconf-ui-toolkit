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
      {{ $t('deconf.session.addToCalendar') }}
    </span>
  </a>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n used:
// - deconf.session.addToCalendar
//

export default {
  name: 'AddToCalendar',
  components: { FontAwesomeIcon },
  props: {
    calendarLink: { type: String, required: true }
  },
  methods: {
    onClick(event: MouseEvent): void {
      this.$emit('click', event);
    }
  }
};
</script>

<style lang="scss">
@include mobile {
  .addToCalendar.button {
    width: 100%;
  }
}
</style>
