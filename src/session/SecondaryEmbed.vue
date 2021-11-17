<template>
  <div class="secondaryEmbed">
    <!--
      Warning if parsing failed
    -->
    <template v-if="!parsed">
      <div class="notification is-warning">
        {{ $t('deconf.sessionEmbed.noEmbed') }}
      </div>
    </template>

    <!--
      Vimeo Chat embed
    -->
    <div class="secondaryEmbed-iframe" v-else-if="parsed.kind === 'vimeo-chat'">
      <iframe
        width="100%"
        height="100%"
        :src="vimeoChatLink(parsed.data)"
        frameborder="0"
      ></iframe>
    </div>

    <!--
      Vimeo Chat embed
    -->
    <div
      class="secondaryEmbed-iframe"
      v-else-if="parsed.kind === 'vimeo-event-chat'"
    >
      <iframe
        width="100%"
        height="100%"
        :src="vimeoEventChatLink(parsed.data)"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { SecondaryLink, parseSecondaryLink } from '../lib/module';

//
// i18n
// - deconf.sessionEmbed.noEmbed - The warning when no embedable option is available
//
// icons
// - fas video
//
// sass
// - n/a
//

export default {
  name: 'SecondaryEmbed',
  props: {
    link: { type: String, required: true }
  },
  computed: {
    parsed(): SecondaryLink | null {
      return parseSecondaryLink(this.link);
    }
  },
  methods: {
    vimeoChatLink(data: string) {
      return `https://vimeo.com/live-chat/${data}`;
    },
    vimeoEventChatLink(data: string) {
      return `https://vimeo.com/event/${data}/chat/`;
    }
  }
};
</script>

<style lang="scss">
$secondaryEmbed-ratio: 150% !default;
$secondaryEmbed-background: #fafafa !default;

.secondaryEmbed {
}
.secondaryEmbed-iframe {
  height: 0;
  padding-bottom: $secondaryEmbed-ratio;

  background: $secondaryEmbed-background;
  overflow: hidden;
  position: relative;

  > iframe {
    position: absolute;
  }
}
</style>
