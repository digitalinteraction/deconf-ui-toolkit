<template>
  <component
    class="atriumWidget"
    :class="classes"
    :is="rootComponent"
    v-bind="extraArgs"
  >
    <h2 class="title">
      <FontAwesomeIcon :icon="icon" class="fa-fw" />
      {{ title }}
    </h2>
    <p class="subtitle">
      {{ subtitle }}
    </p>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    kind: {
      type: String,
      required: true
      // validator(v) {
      //   return ['primary', 'secondary', 'twitter'].includes(v);
      // }
    },
    icon: { type: [String, Array], required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    href: { type: String, default: null }
  },
  computed: {
    rootComponent() {
      return this.href ? 'a' : 'div';
    },
    extraArgs() {
      return this.href ? { href: this.href } : {};
    },
    classes() {
      return [`is-${this.kind}`, this.href ? 'is-hoverable' : ''];
    }
  }
});
</script>

<style lang="scss" scoped>
.atriumWidget {
  display: block;
  margin-bottom: 1.5rem;
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
    .title,
    .subtitle {
      color: white;
    }
  }

  &.is-primary {
    background-color: royalblue;
    &.is-hoverable:hover {
      background-color: darken(royalblue, 7%);
      box-shadow: none;
    }
    .title,
    .subtitle {
      color: white;
    }
  }

  &.is-secondary {
    background-color: rebeccapurple;
    &.is-hoverable:hover {
      background-color: darken(rebeccapurple, 7%);
      box-shadow: none;
    }
    .title,
    .subtitle {
      color: white;
    }
  }

  &.is-hoverable {
    cursor: pointer;
  }
}

.title {
  font-size: 1.8em;
  font-weight: bold;
}
.subtitle {
  font-size: 1em;
  font-weight: bold;
}
</style>
