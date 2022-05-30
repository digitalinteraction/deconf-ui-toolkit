<template>
  <div class="scheduleHeader">
    <h2 class="scheduleHeader-title">
      <slot />
    </h2>
  </div>
</template>

<script lang="ts">
//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default {
  name: 'ScheduleHeader',
};
</script>

<style lang="scss">
.scheduleHeader {
  padding: 0.75em 1.5rem;

  &.is-primary {
    color: $primary-invert;
    background-color: $primary;
  }

  &.is-dark {
    color: $dark-invert;
    background-color: $dark;
  }

  @include mobile {
    font-size: $size-7;
  }
}

.scheduleHeader-title {
  line-height: 1em;
  font-size: 1.2em;
  font-weight: $weight-bold;
}
</style>
