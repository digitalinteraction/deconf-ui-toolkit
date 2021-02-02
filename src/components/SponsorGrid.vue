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
import { SponsorGroup } from '@/types';
import Vue, { PropType } from 'vue';

import SponsorRow from './SponsorRow.vue';

export default Vue.extend({
  components: { SponsorRow },
  props: {
    groups: { type: Array as PropType<SponsorGroup[]>, required: true }
  }
});
</script>

<style lang="scss">
.sponsorGrid {
  .sponsorRow:not(:last-child) {
    margin-bottom: 3em;
  }
}
</style>
