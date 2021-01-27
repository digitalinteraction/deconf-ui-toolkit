<template>
  <div class="scheduleHeader">
    <h2 class="scheduleHeader-title">
      <slot />
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

.<style lang="scss" scoped>
.scheduleHeader {
  padding: 0.75em 1.5em;

  &.is-primary {
    color: $white;
    background-color: $primary;
  }

  &.is-dark {
    color: $white;
    background-color: $black;
  }
}

.scheduleHeader-title {
  line-height: 1em;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
