<template>
  <div class="stickyHeading">
    <div class="stickyHeading-header">
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
import ScheduleHeader from './ScheduleHeader.vue';

//
// A heading that is sticky around a set of inner-content in it's slot
//

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $stickyHeading-top
// - $stickyHeading-left
// - $stickyHeading-right
// - $stickyHeading-z
//

export default {
  name: 'StickyHeading',
  components: { ScheduleHeader },
  props: {
    title: { type: String, required: true },
    titleClass: { type: String, default: 'is-primary' },
  },
};
</script>

<style lang="scss">
$stickyHeading-top: $navbar-height !default;
$stickyHeading-left: 0 !default;
$stickyHeading-right: 0 !default;
$stickyHeading-z: 5 !default;

.stickyHeading {
  position: relative;
}

.stickyHeading-header {
  position: sticky;
  left: $stickyHeading-left;
  top: $stickyHeading-top;
  right: $stickyHeading-right;
  z-index: $stickyHeading-z;
}

.stickyHeading-content {
}
</style>
