<template>
  <div class="stickyHeading">
    <div class="stickyHeading-header" :style="styles">
      <ScheduleHeader :class="titleClass">
        {{ title }}
      </ScheduleHeader>
    </div>
    <div class="stickyHeading-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import ScheduleHeader from './schedule/ScheduleHeader.vue';

export default {
  components: { ScheduleHeader },
  props: {
    title: { type: String, required: true },
    titleClass: { type: String, default: 'is-primary' },
    navbarHeight: { type: String, default: null }
  },
  computed: {
    styles(): unknown {
      return {
        top: this.navbarHeight
      };
    }
  }
};
</script>

<style lang="scss">
.stickyHeading {
  position: relative;
}

.stickyHeading-header {
  position: sticky;
  left: 0;
  top: $navbar-height;
  right: 0;
  z-index: 5;
}

.stickyHeading-content {
}
</style>
