<template>
  <div class="speakerGrid">
    <div
      class="speakerGrid-speaker"
      v-for="speaker in speakers"
      :key="speaker.id"
      @click="showDialog(speaker)"
    >
      <div class="speakerGrid-headshot">
        <img :src="speaker.headshot" width="42" height="42" />
      </div>
      <div class="speakerGrid-speakerInfo">
        <div class="speakerGrid-name">{{ speaker.name }}</div>
        <div class="speakerGrid-role">{{ localiseRole(speaker) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { localiseFromObject } from '../lib/module';
import { Speaker } from '@openlab/deconf-shared';
import SpeakerDialog from './SpeakerDialog.vue';

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - $speakerGrid-rounding
// - $speakerGrid-cellWidth
//

export default {
  name: 'SpeakerGrid',
  props: {
    speakers: { type: Array as PropType<Speaker[]>, required: true },
  },
  methods: {
    localiseRole(speaker: Speaker): string | null {
      return localiseFromObject(this.$i18n.locale, speaker.role);
    },
    showDialog(speaker: Speaker): void {
      this.$deconf.showDialog(SpeakerDialog, { speaker });
    },
  },
};
</script>

<style lang="scss">
$speakerGrid-rounding: $radius-rounded !default;
$speakerGrid-cellWidth: 280px !default;

.speakerGrid {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
}

.speakerGrid-speaker {
  display: flex;
  flex-basis: $speakerGrid-cellWidth;
  flex-grow: 0;
  padding-bottom: 15px;
  vertical-align: top;

  @include mobile {
    width: 100%;
  }
}

.speakerGrid-headshot {
  padding-inline-end: 8px;

  img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: $speakerGrid-rounding;
  }
}

.speakerGrid-speakerInfo {
  flex: 1;
  padding-inline-end: 2rem;
}

.speakerGrid-name {
  min-height: 1.5em;
  margin-bottom: 0;
  font-weight: $weight-bold;
  color: $text-strong;
}

.speakerGrid-role {
  color: $text-light;
  font-size: $size-7;
}
</style>
