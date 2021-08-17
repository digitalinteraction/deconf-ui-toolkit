<template>
  <div class="sponsorGrid">
    <SponsorRow
      v-for="group in groups"
      :key="group.size"
      :size="group.size"
      :title="group.title"
      :sponsors="group.sponsors"
    />
  </div>
</template>

<script lang="ts">
import { SponsorGroup } from '../lib/module';
import { PropType } from 'vue';

import SponsorRow from './SponsorRow.vue';

export default {
  name: 'SponsorGrid',
  components: { SponsorRow },
  props: {
    groups: { type: Array as PropType<SponsorGroup[]>, required: true }
  }
};
</script>

<style lang="scss">
$sponsorGrid-spacing: 3rem !default;

.sponsorGrid {
  .sponsorRow:not(:last-child) {
    margin-bottom: $sponsorGrid-spacing;
  }
}
</style>
