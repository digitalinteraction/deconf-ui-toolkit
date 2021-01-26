<template>
  <div class="sponsorRow" :class="classes">
    <h3 class="sponsorRow-title">{{ title }}</h3>
    <div class="sponsorRow-sponsors">
      <a
        v-for="sponsor in sponsors"
        class="sponsorRow-sponsor"
        :key="sponsor.title"
        :href="sponsor.href || '#'"
      >
        <img :src="sponsor.image" :alt="sponsor.title" :title="sponsor.title" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export interface Sponsor {
  title: string;
  image: string;
  href?: string;
}

const sizes = ['large', 'medium', 'regular', 'small'];

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    size: { type: String, required: true, validator: v => sizes.includes(v) },
    sponsors: { type: Array as PropType<Sponsor[]>, required: true }
  },
  computed: {
    classes() {
      return `is-${this.size}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.sponsorRow {
  // is-regular is the default
  img {
    height: 36px;
  }

  &.is-large .sponsorRow-sponsor img {
    height: 54px;
  }
  &.is-medium .sponsorRow-sponsor img {
    height: 42px;
  }
  &.is-small .sponsorRow-sponsor img {
    height: 28px;
  }
}

.sponsorRow-title {
  font-weight: bold;
  font-size: $size-6;
  color: $grey;
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
