<template>
  <div class="sessionEmbed">
    <template v-if="!parsed">
      <div class="notification is-warning">
        {{ $t('deconf.sessionEmbed.noEmbed') }}
      </div>
    </template>

    <!-- 
      YouTube video / livestream
     -->
    <div class="sessionEmbed-video" v-else-if="parsed.kind === 'youtube-video'">
      <IframeEmbed
        :src="youtubeVideoLink(parsed.data)"
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    </div>

    <!-- 
      YouTube channel livestream
     -->
    <div
      class="sessionEmbed-video"
      v-else-if="parsed.kind === 'youtube-channel'"
    >
      <IframeEmbed
        :src="youtubeChannelLink(parsed.data)"
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    </div>

    <!-- 
      Vimeo
     -->
    <div class="sessionEmbed-video" v-else-if="parsed.kind === 'vimeo'">
      <IframeEmbed :src="vimeoVideoLink(parsed.data)" allow="autoplay" />
    </div>

    <!-- 
      Vimeo
     -->
    <div class="sessionEmbed-video" v-else-if="parsed.kind === 'vimeo-event'">
      <IframeEmbed :src="vimeoEventLink(parsed.data)" allow="autoplay" />
    </div>

    <!-- 
      Panopto
     -->
    <div class="sessionEmbed-video" v-else-if="parsed.kind === 'panopto'">
      <IframeEmbed :src="panoptoVideoLink(parsed.data)" allow="autoplay" />
    </div>

    <!--
      Twitch
     -->
    <div class="sessionEmbed-video" v-else-if="parsed.kind === 'twitch'">
      <IframeEmbed :src="twitchVideoLink(parsed.data)" allow="autoplay" />
    </div>

    <!-- 
      Microsoft Teams links
     -->
    <div class="sessionEmbed-link is-teams" v-else-if="parsed.kind === 'teams'">
      <a
        class="button is-medium"
        :href="parsed.data"
        target="_blank"
        rel="noopener"
        @click="onClick"
      >
        <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
        <span>{{ $t('deconf.sessionEmbed.openTeams') }}</span>
      </a>
    </div>

    <!-- 
      Zoom links
     -->
    <div class="sessionEmbed-link is-zoom" v-else-if="parsed.kind === 'zoom'">
      <a
        class="button is-medium"
        :href="parsed.data"
        target="_blank"
        rel="noopener"
        @click="onClick"
      >
        <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
        <span>{{ $t('deconf.sessionEmbed.openZoom') }}</span>
      </a>
    </div>

    <!-- 
      Mozilla Hub links
     -->
    <div
      class="sessionEmbed-link is-mozillaHubs"
      v-else-if="parsed.kind === 'mozilla-hubs'"
    >
      <a
        class="button is-medium"
        :href="parsed.data"
        target="_blank"
        rel="noopener"
        @click="onClick"
      >
        <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
        <span>{{ $t('deconf.sessionEmbed.openHubs') }}</span>
      </a>
    </div>

    <!-- 
      Spatial Chat links
     -->
    <div
      class="sessionEmbed-link is-spatialChat"
      v-else-if="parsed.kind === 'spatial-chat'"
    >
      <a
        class="button is-medium"
        :href="parsed.data"
        target="_blank"
        rel="noopener"
        @click="onClick"
      >
        <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
        <span>{{ $t('deconf.sessionEmbed.openSpatial') }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import IframeEmbed from './IframeEmbed.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { parsePrimaryLink, PrimaryLink } from '../../lib/module';

//
// i18n
// - deconf.sessionEmbed.noEmbed - The warning when no embedable option is available
// - deconf.sessionEmbed.openTeams - Button to open a teams link
// - deconf.sessionEmbed.openZoom - Button to open a zoom link
// - deconf.sessionEmbed.openHubs - Button to open a Mozilla Hubs link
// - deconf.sessionEmbed.openSpatial - Button to open a Spatial Chat link
//
// icons
// - fas video
//
// sass
// - n/a
//
// todo
// - fully rename to PrimaryEmbed
//

export default {
  name: 'PrimaryEmbed',
  components: { IframeEmbed, FontAwesomeIcon },
  props: {
    link: { type: String, required: true }
  },
  computed: {
    parsed(): PrimaryLink | null {
      return parsePrimaryLink(this.link);
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    youtubeVideoLink(data: string) {
      return `https://www.youtube-nocookie.com/embed/${data}`;
    },
    youtubeChannelLink(data: string) {
      return `https://www.youtube-nocookie.com/embed/live_stream?channel=${data}`;
    },
    vimeoVideoLink(data: string) {
      return `https://player.vimeo.com/video/${data}`;
    },
    vimeoEventLink(data: string) {
      return `https://vimeo.com/event/${data}/embed`;
    },
    panoptoVideoLink(data: string) {
      return data;
    },
    twitchVideoLink(data: string) {
      return `https://player.twitch.tv/?channel=${data}&parent=${location.hostname}`;
    }
  }
};
</script>

<style lang="scss">
.sessionEmbed {
}
.sessionEmbed-video {
}
.sessionEmbed-link {
  width: 100%;
  height: 100%;
  min-height: 220px;
  border: 2px dashed $link;
  background-color: lighten($link, 40%);
  border-radius: $radius-large;

  display: flex;
  justify-content: center;
  align-items: center;

  &.is-zoom {
    border: 2px dashed $zoom-blue;
    background-color: lighten($zoom-blue, 30%);

    .button {
      background: $zoom-blue;
      color: $white;
    }
  }

  &.is-teams {
    border: 2px dashed $teams-purple;
    background-color: lighten($teams-purple, 40%);

    .button {
      background: $teams-purple;
      color: $white;
    }
  }

  &.is-mozillaHubs {
    border: 2px dashed $hubs-blue;
    background-color: lighten($hubs-blue, 45%);

    .button {
      background: $hubs-blue;
      color: $white;
      border-radius: $radius-rounded;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
  }

  &.is-spatialChat {
    border: 2px dashed $spatial-blue;
    background-color: lighten($spatial-blue, 35%);

    .button {
      background: $spatial-blue;
      color: $white;
    }
  }
}
</style>
