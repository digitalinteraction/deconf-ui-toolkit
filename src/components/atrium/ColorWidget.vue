<template>
  <component
    class="colorWidget"
    :class="classes"
    :is="rootComponent"
    v-bind="extraArgs"
  >
    <h2 class="colorWidget-title">
      <FontAwesomeIcon :icon="icon" class="fa-fw" />
      {{ title }}
    </h2>
    <p class="colorWidget-subtitle">
      {{ subtitle }}
    </p>
  </component>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'ColorWidget',
  components: { FontAwesomeIcon },
  props: {
    kind: {
      type: String,
      required: true,
      validator(v) {
        return ['primary', 'secondary', 'twitter', 'custom'].includes(v);
      }
    },
    icon: { type: [String, Array], required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    href: { type: String, default: null }
  },
  computed: {
    rootComponent(): string {
      return this.href ? 'a' : 'div';
    },
    extraArgs(): object {
      return this.href ? { href: this.href } : {};
    },
    classes(): string[] {
      return [`is-${this.kind}`, this.href ? 'is-hoverable' : ''];
    }
  }
};
</script>

<style lang="scss">
.colorWidget {
  display: block;
  border-radius: $radius;
  box-shadow: $box-shadow;
  padding: 1.25rem;

  @include mobile {
    margin-inline-start: $block-spacing;
    margin-inline-end: $block-spacing;
  }

  &.is-twitter {
    background-color: $twitter-blue;
    &.is-hoverable:hover {
      background-color: darken($twitter-blue, 7%);
      box-shadow: none;
    }
    .colorWidget-title,
    .colorWidget-subtitle {
      color: $white;
    }
  }

  &.is-primary {
    background-color: $primary;
    &.is-hoverable:hover {
      background-color: darken($primary, 7%);
      box-shadow: none;
    }
    .colorWidget-title,
    .colorWidget-subtitle {
      color: $white;
    }
  }

  &.is-secondary {
    background-color: $secondary;
    &.is-hoverable:hover {
      background-color: darken($secondary, 7%);
      box-shadow: none;
    }
    .colorWidget-title,
    .colorWidget-subtitle {
      color: $white;
    }
  }

  &.is-hoverable {
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .colorWidget-title {
    font-size: 1.8em;
    font-weight: $weight-bold;
  }
  .colorWidget-subtitle {
    font-size: 1em;
    font-weight: $weight-bold;
  }
}
a.colorWidget .title {
  text-decoration: underline;
}
</style>
