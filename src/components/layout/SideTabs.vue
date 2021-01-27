<template>
  <div class="sideTabs">
    <router-link
      v-for="item in routes"
      :key="item.name"
      :to="{ name: item.name }"
      :disabled="!item.enabled"
      :title="item.title"
      class="sideTabs-tab"
      :class="{ 'is-active': item.active }"
    >
      <component :is="item.icon" class="sideTabs-tabIcon" />
      <span class="sideTabs-tabText">
        {{ item.title }}
      </span>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue, { Component, PropType } from 'vue';

interface Route {
  name: string;
  title: string;
  enabled: boolean;
  icon?: Component;
}

export default Vue.extend({
  props: {
    routes: {
      type: Array as PropType<Route[]>,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.sideTabs {
  background-color: #252525;
  // position: fixed;
  // top: 0;
  // bottom: 0;
  width: $tabbar-width;
  // z-index: $z-appwrapper-tabbar;

  padding-top: calc(#{$navbar-height} + 1em);

  @include insetInlineStart(0);

  display: flex;
  flex-direction: column;
}

@include touch {
  .sideTabs {
    display: none;
  }
}

.sideTabs-tab {
  transition: 'background-color' 0.3s ease;

  font-size: $size-7;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: $white;

  margin: 6px;
  padding: 6px 0;
  border-radius: $radius-large;

  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }

  .sideTabs-tabText,
  .sideTabs-tabIcon {
    transition: all 0.3s ease;
    opacity: 0.8;
    pointer-events: none;
  }

  .sideTabs-tabText {
    text-align: center;
  }
  .sideTabs-tabIcon {
    height: 3rem;
    width: 3rem;
  }

  &.is-active,
  &:hover {
    cursor: pointer !important;
    color: white;
    .sideTabs-tabText {
      opacity: 1;
    }
    .sideTabs-tabIcon {
      opacity: 1;
    }
  }

  &.is-active {
    background-color: white;
    color: $primary;
    border-inline-start-color: white;
    border-inline-start-color: $primary;
  }
}
</style>
