<template>
  <div class="qrDialog">
    <figure>
      <img v-if="data" :src="data" />
      <figcaption>
        {{ url }}
      </figcaption>
    </figure>
    <div class="buttons">
      <button class="button is-link" @click="onClose">
        {{ $t('deconf.general.closeDialog') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface _Data {
  lib: null | typeof import('qrcodejs').default;
  data: null | string;
}

export default defineComponent({
  name: 'QrDialog',
  props: {
    url: { type: String, required: true },
  },
  data(): _Data {
    return { lib: null, data: null };
  },
  async mounted() {
    this.lib = await import('qrcodejs')
      .then((m) => m.default)
      .catch(() => null);

    if (this.lib) {
      const matrix = this.lib.generate(this.url);
      this.data = this.lib.render('svg-uri', matrix);
    }
  },
  methods: {
    onClose() {
      this.$deconf.closeDialog();
    },
  },
});
</script>

<style lang="scss">
.qrDialog {
}
.qrDialog > * + * {
  margin-block-start: $block-spacing;
}
.qrDialog figure {
}
.qrDialog figcaption {
  text-align: center;
}
</style>
