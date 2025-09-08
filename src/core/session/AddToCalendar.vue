<template>
  <button v-if="session" class="addToCalendar button" @click="onClickButton">
    <span class="icon">
      <FontAwesomeIcon :icon="['fas', 'calendar-plus']" />
    </span>
    <span>
      {{ $t('deconf.addToCalendar.action') }}
    </span>
  </button>
  <a
    v-else-if="calendarLink"
    class="addToCalendar button"
    :href="calendarLink"
    target="_blank"
    rel="noopener"
    @click="onClickLink"
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
import FontAwesomeIcon from '../FontAwesomeIcon.vue';
import { defineComponent, PropType } from 'vue';
import { Session } from '@openlab/deconf-shared';
import AddToCalendarDialog from './AddToCalendarDialog.vue';

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
// notes
// - passing the `calendar-link` prop is deprecated, pass a `session` instead
//

export default defineComponent({
  name: 'AddToCalendar',
  components: { FontAwesomeIcon },
  props: {
    calendarLink: { type: String as PropType<string | null>, default: null },
    session: { type: Object as PropType<Session | null>, default: null },
  },
  methods: {
    onClickLink(event: MouseEvent): void {
      // deprecated
      this.$emit('click', event);
    },
    onClickButton(): void {
      this.$deconf.showDialog(
        AddToCalendarDialog,
        { session: this.session },
        { size: 'small' },
      );
    },
  },
});
</script>

<style lang="scss">
@include mobile {
  .addToCalendar.button {
    width: 100%;
  }
}
</style>
