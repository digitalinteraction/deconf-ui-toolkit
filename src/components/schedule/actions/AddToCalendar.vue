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
        Add to calendar
      </span>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
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
