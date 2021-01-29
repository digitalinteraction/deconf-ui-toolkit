<template>
  <div class="iframeEmbed">
    <!-- {{ src }}
    {{ allow }} -->
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
  props: {
    src: { type: String, required: true },
    allow: { type: String, required: true }
  }
});
</script>

<style lang="scss" scoped>
.iframeEmbed {
  height: 0;
  padding-bottom: percentage(9 / 16);
  margin-bottom: 1rem;

  background-color: #fafafa;
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
