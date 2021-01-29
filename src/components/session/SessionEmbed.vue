<template>
  <div class="sessionEmbed">
    <template v-if="!parsed">
      <div class="notification is-warning">
        {{ $t('deconf.session.noEmbed') }}
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
      <IframeEmbed :src="vimeoVideoLink(parsed.data)" allow="" />
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
      >
        <div class="icon-text">
          <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
          <span>{{ $t('deconf.session.openTeams') }}</span>
        </div>
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
      >
        <div class="icon-text">
          <span class="icon"><FontAwesomeIcon :icon="['fas', 'video']"/></span>
          <span>{{ $t('deconf.session.openZoom') }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IframeEmbed from './IframeEmbed.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

function isDomain(url: URL, ...domains: string[]) {
  return domains.some(d => url.hostname.endsWith(d));
}

interface Parsed {
  kind: 'youtube-video' | 'youtube-channel' | 'zoom' | 'vimeo' | 'teams';
  data: string;
}

function parseLink(link: string): Parsed | null {
  const url = new URL(link);

  const isYouTube = isDomain(url, 'youtube.com', 'youtube-nocookie.com');

  if (isYouTube && url.searchParams.has('v')) {
    return {
      kind: 'youtube-video',
      data: url.searchParams.get('v') as string
    };
  }

  if (
    isYouTube &&
    url.pathname === '/embed/live_stream' &&
    url.searchParams.has('channel')
  ) {
    return {
      kind: 'youtube-channel',
      data: url.searchParams.get('channel') as string
    };
  }

  if (isDomain(url, 'youtu.be')) {
    return {
      kind: 'youtube-video',
      data: url.pathname.replace(/\//g, '')
    };
  }

  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/my/')) {
    return {
      kind: 'zoom',
      data: url.pathname.replace('/my/', '')
    };
  }

  if (isDomain(url, 'teams.microsoft.com')) {
    return {
      kind: 'teams',
      data: url.toString()
    };
  }

  if (isDomain(url, 'player.vimeo.com') && url.pathname.startsWith('/video/')) {
    return {
      kind: 'vimeo',
      data: url.pathname.replace('/video/', '')
    };
  }

  return null;
}

//
// Used I18n:
// - deconf.session.noEmbed
// - deconf.session.openTeams
// - deconf.session.openZoom
//

export default Vue.extend({
  components: { IframeEmbed, FontAwesomeIcon },
  props: {
    link: { type: String, required: true }
  },
  computed: {
    parsed(): Parsed | null {
      return parseLink(this.link);
    }
  },
  methods: {
    youtubeVideoLink(data: string) {
      return `https://www.youtube-nocookie.com/embed/${data}`;
    },
    youtubeChannelLink(data: string) {
      return `https://www.youtube-nocookie.com/embed/live_stream?channel=${data}`;
    },
    vimeoVideoLink(data: string) {
      return `https://player.vimeo.com/video/${data}`;
    }
  }
});
</script>

<style lang="scss" scoped>
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
}
</style>
