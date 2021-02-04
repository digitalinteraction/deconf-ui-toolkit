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
        {{ item.enabled ? item.title : $t('deconf.appLayout.unavailable') }}
      </span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { AppRoute } from '@/types';

//
// I18n keys
// - deconf.appLayout.unavailable
//
export default {
  name: 'SideTabs',
  props: {
    routes: {
      type: Array as PropType<AppRoute[]>,
      required: true
    }
  }
};
</script>

<style lang="scss">
$sideTabs-background: #252525 !default;
$sideTabs-color: $white !default;
$sideTabs-active: $primary !default;

.sideTabs {
  background-color: $sideTabs-background;
  width: $tabbar-width;

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

  color: $sideTabs-color;

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
    color: $sideTabs-color;
    .sideTabs-tabText {
      opacity: 1;
    }
    .sideTabs-tabIcon {
      opacity: 1;
    }
  }

  &.is-active {
    background-color: $sideTabs-color;
    color: $sideTabs-active;
  }
}
</style>
