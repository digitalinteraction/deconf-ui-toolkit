<template>
  <div class="sponsorRow" :class="classes">
    <h3 class="sponsorRow-title">{{ title }}</h3>
    <div class="sponsorRow-sponsors">
      <component
        v-for="sponsor in sponsors"
        :is="sponsorComponent(sponsor)"
        class="sponsorRow-sponsor"
        :key="sponsor.title"
        :href="sponsor.href"
      >
        <img
          class="sponsorRow-image"
          :src="sponsor.image"
          :alt="sponsor.title"
          :title="sponsor.title"
        />
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { Sponsor } from '../lib/module';
import { PropType } from 'vue';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $sponsorRow-regularHeight
// - $sponsorRow-largeHeight
// - $sponsorRow-mediumHeight
// - $sponsorRow-smallHeight
//

const sizes = ['large', 'medium', 'regular', 'small'];

export default {
  name: 'SponsorRow',
  props: {
    title: { type: String, required: true },
    size: { type: String, required: true, validator: (v) => sizes.includes(v) },
    sponsors: { type: Array as PropType<Sponsor[]>, required: true },
  },
  computed: {
    classes(): string {
      return `is-${this.size}`;
    },
  },
  methods: {
    sponsorComponent(sponsor: Sponsor) {
      return sponsor.href ? 'a' : 'span';
    },
  },
};
</script>

<style lang="scss">
$sponsorRow-regularHeight: 36px !default;
$sponsorRow-largeHeight: 54px !default;
$sponsorRow-mediumHeight: 42px !default;
$sponsorRow-smallHeight: 28px !default;

.sponsorRow {
  // is-regular is the default
  .sponsorRow-image {
    height: $sponsorRow-regularHeight;
  }

  &.is-large .sponsorRow-sponsor .sponsorRow-image {
    height: $sponsorRow-largeHeight;
  }
  &.is-medium .sponsorRow-sponsor .sponsorRow-image {
    height: $sponsorRow-mediumHeight;
  }
  &.is-small .sponsorRow-sponsor .sponsorRow-image {
    height: $sponsorRow-smallHeight;
  }
}

.sponsorRow-title {
  font-weight: $weight-bold;
  font-size: $size-6;
  color: $text-light;
  text-align: center;
  padding-bottom: 2em;
  margin: 0;
  text-transform: uppercase;
}

.sponsorRow-sponsors {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.sponsorRow-sponsor {
  margin: 0 1em 1em;
}
</style>
