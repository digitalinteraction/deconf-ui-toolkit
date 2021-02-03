<template>
  <div class="iframeEmbed">
    <iframe
      class="iframeEmbed-iframe"
      width="100%"
      height="100%"
      :src="src"
      frameborder="0"
      :allow="allow"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IframeEmbed',
  props: {
    src: { type: String, required: true },
    allow: { type: String, default: '' }
  }
});
</script>

<style lang="scss">
$iframeEmbed-ratio: percentage(9 / 16) !default;
$iframeEmbed-background: #fafafa !default;

.iframeEmbed {
  height: 0;
  padding-bottom: $iframeEmbed-ratio;

  background-color: $iframeEmbed-background;
  border-radius: $radius;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  .iframeEmbed-iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
