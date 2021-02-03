<template>
  <a
    class="button is-small is-secondary"
    :href="calendarLink"
    target="_blank"
    rel="noopener"
    @click="onClick"
  >
    <div class="icon-text">
      <span class="icon">
        <FontAwesomeIcon :icon="['fas', 'calendar-plus']" />
      </span>
      <span>
        {{ $t('deconf.session.addToCalendar') }}
      </span>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//
// I18n used:
// - deconf.session.addToCalendar
//

export default Vue.extend({
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
});
</script>
