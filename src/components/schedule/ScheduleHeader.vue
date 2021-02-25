<template>
  <div class="scheduleHeader">
    <h2 class="scheduleHeader-title">
      <slot />
    </h2>
  </div>
</template>

<script lang="ts">
//
// TODO: should this take a theme prop rather than use classes?
//

export default {
  name: 'ScheduleHeader'
};
</script>

<style lang="scss">
.scheduleHeader {
  padding: 0.75em 1.5rem;

  &.is-primary {
    color: $white;
    background-color: $primary;
  }

  &.is-dark {
    color: $white-bis;
    background-color: $black-ter;
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
