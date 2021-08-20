<template>
  <div class="stack" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
//
// A reusable component to quickly flex between items without needing styles
//

/** Create a Vue enum-based prop w/ validation  */
function enumProp(values: string[]) {
  return {
    type: String,
    validator: (v: string) => values.includes(v),
    required: true
  };
}

export default {
  props: {
    direction: enumProp(['horizontal', 'vertical']),
    gap: enumProp(['none', 'small', 'regular', 'medium', 'large']),
    align: enumProp(['start', 'end', 'center', 'stretch'])
  },
  computed: {
    classes(): string[] {
      return [
        `is-${this.gap}`,
        `is-${this.direction}`,
        `is-aligned-${this.align}`
      ];
    }
  }
};
</script>

<style lang="scss">
$stack-smallGap: 4px !default;
$stack-regularGap: 8px !default;
$stack-mediumGap: 18px !default;
$stack-largeGap: 32px !default;

@mixin setInnerMargin($key, $value) {
  > *:not(:last-child) {
    #{$key}: $value;
  }
}

.stack {
  display: flex;
  align-items: center;

  &.is-horizontal {
    flex-direction: row;

    &.is-small {
      @include setInnerMargin('margin-inline-end', $stack-smallGap);
    }
    &.is-regular {
      @include setInnerMargin('margin-inline-end', $stack-regularGap);
    }
    &.is-medium {
      @include setInnerMargin('margin-inline-end', $stack-mediumGap);
    }
    &.is-large {
      @include setInnerMargin('margin-inline-end', $stack-largeGap);
    }
  }
  &.is-vertical {
    flex-direction: column;

    &.is-small {
      @include setInnerMargin('margin-block-end', $stack-smallGap);
    }
    &.is-regular {
      @include setInnerMargin('margin-block-end', $stack-regularGap);
    }
    &.is-medium {
      @include setInnerMargin('margin-block-end', $stack-mediumGap);
    }
    &.is-large {
      @include setInnerMargin('margin-block-end', $stack-largeGap);
    }
  }

  &.is-aligned-start {
    align-items: flex-start;
  }
  &.is-aligned-end {
    align-items: flex-end;
  }
  &.is-aligned-center {
    align-items: center;
  }
  &.is-aligned-stretch {
    align-items: stretch;
  }
}
</style>
