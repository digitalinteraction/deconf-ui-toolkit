<template>
  <div class="sidebarItem">
    <h4 class="sidebarItem-title" v-if="title">
      {{ title }}
    </h4>
    <div class="sidebarItem-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: { type: String, default: null }
  }
});
</script>

<style lang="scss" scoped>
.sidebarItem {
  &:not(:last-child) {
    margin-bottom: 2em;
  }
}
.sidebarItem-title {
  font-size: 1.1em;
  font-weight: $weight-bold;
  text-transform: uppercase;
  color: $grey-dark;
}
.sidebarItem-content {
}
</style>
