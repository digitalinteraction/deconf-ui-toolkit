<template>
  <div class="atriumPage">
    <div class="container">
      <div class="atriumPage-top">
        <slot name="top" />
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="atriumPage-left">
            <slot name="left" />
          </div>
        </div>
        <div class="column is-one-third">
          <div class="atriumPage-right">
            <slot name="right" />
          </div>
        </div>
      </div>
      <div class="atriumPage-bottom">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

// export interface AtriumWidget {
//   kind: 'primary' | 'secondary' | 'twitter';
//   title: string;
//   icon: string | string[];
//   subtitle: string;
//   href: string | null;
// }

export default Vue.extend({
  // props: {
  //   heroTitle: { type: String, required: true },
  //   heroSubtitle: { type: String, required: true },
  //   pageTitle: { type: String, required: true },
  //   coverImage: { type: String, required: true },
  //   content: { type: [Object, Function], required: true },
  //   widgets: { type: Array as PropType<AtriumWidget[]>, required: true },
  //   sponsors: { type: Array as PropType<SponsorGroup[]>, required: true }
  // },
  // computed: {
  //   heroStyle(): object {
  //     return { 'background-image': `url(${this.coverImage})` };
  //   }
  // }
});
</script>

<style lang="scss">
.atriumPage {
  background-color: $background;
  padding: $block-spacing;
  position: relative;
  @include mobile {
    padding: 0;
  }
}
.atriumPage-bottom {
  margin-top: 7em;
}
</style>
