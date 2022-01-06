<template>
  <div class="speakerDialog">
    <div class="speakerDialog-header">
      <img class="speakerDialog-headshot" :src="speaker.headshot" />
      <div>
        <h1 class="speakerDialog-name">{{ speaker.name }}</h1>
        <p class="speakerDialog-role">{{ localeRole }}</p>
      </div>
    </div>
    <p class="speakerDialog-bio">{{ localeContent }}</p>
    <div class="buttons">
      <button class="button is-link" @click="onClose">
        {{ $t('deconf.general.closeDialog') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Speaker } from '@openlab/deconf-shared/dist/conference';
import { localiseFromObject } from '../lib/locales';

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

export default {
  name: 'SpeakerDialog',
  props: {
    speaker: { type: Object as PropType<Speaker>, required: true }
  },
  computed: {
    localeRole(): string | null {
      return localiseFromObject(this.$i18n.locale, this.speaker.role);
    },
    localeContent(): string | null {
      return localiseFromObject(this.$i18n.locale, this.speaker.bio);
    }
  },
  methods: {
    onClose() {
      this.$deconf.closeDialog();
    }
  }
};
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