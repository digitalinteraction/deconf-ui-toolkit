<template>
  <div class="atriumPage">
    <div class="container">
      <AtriumHero
        :title="heroTitle"
        :subtitle="heroSubtitle"
        :cover-image="coverImage"
      />
      <div class="columns">
        <div class="column is-two-thirds">
          <BoxContent :title="pageTitle" :content="content" />
        </div>
        <div class="column is-one-third">
          <AtriumWidget
            v-for="widget in widgets"
            :key="widget.title"
            v-bind="widget"
          />
        </div>
      </div>
      <div class="atriumPage-sponsors">
        <SponsorGrid :groups="sponsors" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import BoxContent from '../components/BoxContent.vue';
import SponsorGrid, { SponsorGroup } from '../components/SponsorGrid.vue';
import AtriumWidget from './AtriumWidget.vue';
import AtriumHero from './AtriumHero.vue';

export interface AtriumWidget {
  kind: 'primary' | 'secondary' | 'twitter';
  title: string;
  icon: string | string[];
  subtitle: string;
  href: string | null;
}

export default Vue.extend({
  components: { AtriumHero, AtriumWidget, BoxContent, SponsorGrid },
  props: {
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    pageTitle: { type: String, required: true },
    coverImage: { type: String, required: true },
    content: { type: [Object, Function], required: true },
    widgets: { type: Array as PropType<AtriumWidget[]>, required: true },
    sponsors: { type: Array as PropType<SponsorGroup[]>, required: true }
  },
  computed: {
    heroStyle() {
      return { 'background-image': `url(${this.coverImage})` };
    }
  }
});
</script>

<style lang="scss">
.atriumPage {
  background-color: #f2f2f2;
  padding: $block-spacing;
  position: relative;
  @include mobile {
    padding: 0;
  }
}
.atriumPage-sponsors {
  margin-top: 7em;
}
</style>
