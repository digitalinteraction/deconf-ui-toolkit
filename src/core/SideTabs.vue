<template>
  <div class="sideTabs">
    <div class="sideTabs-tab" v-if="$slots.brand">
      <slot name="brand"></slot>
    </div>
    <component
      v-for="item in routes"
      :key="item.name"
      :is="item.enabled ? 'router-link' : 'span'"
      class="sideTabs-tab"
      v-bind="routeArgs(item)"
    >
      <component :is="item.icon" class="sideTabs-tabIcon" />
      <span class="sideTabs-tabText">
        {{ item.title }}
      </span>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AppRoute } from '../lib/module'

//
// i18n
// - deconf.sideTabs.unavailable - The title when a tab isn't available
//
// icons
// - n/a
//
// sass
// - $sideTabs-background
// - $sideTabs-color
// - $sideTabs-active
// - $sideTabs-activeBackground
//

export default defineComponent({
  name: 'SideTabs',
  props: {
    routes: {
      type: Array as PropType<AppRoute[]>,
      required: true,
    },
  },
  methods: {
    routeArgs(item: AppRoute): Record<string, unknown> {
      if (item.enabled) {
        return {
          to: { name: item.name },
          'active-class': 'is-active',
        }
      } else {
        return {
          disabled: true,
          title: this.$t('deconf.sideTabs.unavailable'),
        }
      }
    },
  },
})
</script>

<style lang="scss">
$sideTabs-background: #252525 !default;
$sideTabs-color: $white !default;
$sideTabs-active: $primary !default;
$sideTabs-activeBackground: $white !default;

.sideTabs {
  background-color: $sideTabs-background;
  width: $tabbar-width;

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
  transition: background-color 0.3s ease;

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
    &:hover {
      cursor: not-allowed;
    }
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
    cursor: pointer;
    color: $sideTabs-color;
    .sideTabs-tabText {
      opacity: 1;
    }
    .sideTabs-tabIcon {
      opacity: 1;
    }
  }

  &.is-active {
    background-color: $sideTabs-activeBackground;
    color: $sideTabs-active;
  }
}
</style>
