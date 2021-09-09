<template>
  <div class="sessionAttributes">
    <!-- 
      Language
    -->
    <span
      class="sessionAttributes-attribute sessionAttributes-attribute-languages"
      v-if="languages !== null"
    >
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'globe']" fixed-width />
        </span>
        <span class="is-uppercase">
          {{ languages.join('/') }}
        </span>
      </span>
    </span>

    <!-- 
      Recorded
    -->
    <span
      class="sessionAttributes-attribute sessionAttributes-attribute-isRecorded"
      v-if="isRecorded !== null"
    >
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'save']" fixed-width />
        </span>
        <span v-if="isRecorded">
          {{ $t('deconf.sessionAttributes.isRecorded') }}
        </span>
        <span v-else>
          {{ $t('deconf.sessionAttributes.notRecorded') }}
        </span>
      </span>
    </span>

    <!--
      Track
    -->
    <span
      class="sessionAttributes-attribute sessionAttributes-attribute-track"
      v-if="track !== null"
    >
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'code-branch']" fixed-width />
        </span>
        <span>
          {{ localise(track.title) }}
        </span>
      </span>
    </span>

    <!--
      Themes
    -->
    <span
      class="sessionAttributes-attribute sessionAttributes-attribute-themes"
      v-if="themes !== null && themes.length > 0"
    >
      <span class="icon-text">
        <span class="icon">
          <FontAwesomeIcon :icon="['fas', 'tags']" fixed-width />
        </span>
        <span>
          {{ themes.map(t => localise(t.title)).join(', ') }}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { localiseFromObject } from '../../../lib/module';
import { Theme, Track } from '@openlab/deconf-shared';

//
// i18n
// - deconf.sessionAttributes.isRecorded
// - deconf.sessionAttributes.notRecorded
//
// icons
// - fas globe
// - fas save
// - fas code-branch
// - fas tags
//
// sass
// - $sessionAttributes-color
// - $sessionAttributes-strong
//
// makeBold enum:
// - locale
// - recorded
// - track
//

export default {
  name: 'SessionAttributes',
  components: { FontAwesomeIcon },
  props: {
    languages: { type: Array as PropType<string[] | null>, default: null },
    isRecorded: { type: Boolean as PropType<boolean | null>, default: null },
    track: { type: Object as PropType<Track | null>, default: null },
    themes: { type: Array as PropType<Theme[] | null>, default: null }
  },
  methods: {
    localise(object: Record<string, string>): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    }
  }
};
</script>

<style lang="scss">
$sessionAttributes-color: #999 !default;
$sessionAttributes-strong: #444 !default;

.sessionAttributes {
  line-height: 2;
}

.sessionAttributes-attribute {
  color: $sessionAttributes-color;
  fill: $sessionAttributes-color;
  font-weight: $weight-bold;

  &.is-bold {
    color: $sessionAttributes-strong;
    fill: $sessionAttributes-strong;
  }

  &:not(:last-child) {
    margin-right: 1em;
  }
}
</style>
