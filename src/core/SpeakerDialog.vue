<template>
  <div class="speakerDialog">
    <div class="speakerDialog-header">
      <img class="speakerDialog-headshot" :src="speaker.headshot" />
      <div>
        <h1 class="speakerDialog-name">{{ speaker.name }}</h1>
        <p class="speakerDialog-role">{{ localeRole }}</p>
      </div>
    </div>
    <p class="speakerDialog-bio content" v-html="localeContent"></p>
    <div class="buttons">
      <button class="button is-link" @click="onClose">
        {{ $t('deconf.general.closeDialog') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { marked } from 'marked';
import { defineComponent, PropType } from 'vue';
import { Speaker } from '@openlab/deconf-shared';
import { localiseFromObject, stripMarkdown } from '../lib/module';

//
// i18n
// - deconf.general.closeDialog
//
// icons
// - n/a
//
// sass
// - $speakerDialog-nameSize
// - $speakerDialog-nameWeight
// - $speakerDialog-nameFamily
//

export default defineComponent({
  name: 'SpeakerDialog',
  props: {
    speaker: { type: Object as PropType<Speaker>, required: true },
  },
  computed: {
    localeRole(): string | null {
      const content = localiseFromObject(this.$i18n.locale, this.speaker.role);
      return content ? stripMarkdown(content) : null;
    },
    localeContent(): string | null {
      const content = localiseFromObject(this.$i18n.locale, this.speaker.bio);
      return content ? (marked(content) as string) : null;
    },
  },
  methods: {
    onClose() {
      this.$deconf.closeDialog();
    },
  },
});
</script>

<style lang="scss">
$speakerDialog-nameSize: $size-3 !default;
$speakerDialog-nameWeight: $weight-bold !default;
$speakerDialog-nameFamily: $family-title !default;

.speakerDialog {
}
.speakerDialog-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.speakerDialog-headshot {
  width: 64px;
  height: 64px;
  border-radius: $radius-rounded;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.speakerDialog-name {
  flex: 1;
  font-size: $speakerDialog-nameSize;
  font-weight: $speakerDialog-nameWeight;
  font-family: $speakerDialog-nameFamily;
  line-height: 1;
}
.speakerDialog-role {
  line-height: 1;
  font-size: $size-5;
}
.speakerDialog-bio {
  margin: $gap 0;
  font-size: $size-6;
}
.speakerDialog {
}
</style>
