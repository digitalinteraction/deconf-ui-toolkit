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
import Vue, { PropType } from 'vue';

import SponsorRow, { Sponsor } from './SponsorRow.vue';

export type SponsorSize = 'large' | 'medium' | 'regular' | 'small';

export interface SponsorGroup {
  title: string;
  size: SponsorSize;
  sponsors: Sponsor[];
}

export default Vue.extend({
  components: { SponsorRow },
  props: {
    groups: { type: Array as PropType<SponsorGroup[]>, required: true }
  }
});
</script>

<style lang="scss" scoped>
.sponsorRow:not(:last-child) {
  margin-bottom: 3em;
}
</style>
