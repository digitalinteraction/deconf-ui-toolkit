<template>
  <div class="sessionLink">
    <div class="sessionLink-title">{{ title }}</div>
    <div class="sessionLink-link">
      <a
        class="sessionLink-raw"
        :href="link"
        @click="onClick"
        target="_blank"
        rel="noopener"
      >
        {{ cleanUrl(link) }}
      </a>
      <div class="sessionLink-actions">
        <button class="sessionLink-qr button is-small is-dark" @click="showQr">
          {{ $t('deconf.sessionLink.showQr') }}
        </button>
        <button
          class="sessionLink-copy button is-small"
          :class="copyClasses"
          @click="copyLink"
        >
          {{
            didCopy
              ? $t('deconf.sessionLink.copied')
              : $t('deconf.sessionLink.copy')
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import copy from 'copy-to-clipboard';
import { defineComponent } from 'vue';
import QrDialog from './QrDialog.vue';

//
// i18n
// - deconf.sessionLink.copy - Text to copy a link
// - deconf.sessionLink.copied - Text when a link has been copied
//
// icons
// - n/a
//
// sass
// - $sessionLink-background
// - $sessionLink-color
// - $sessionLink-radius
// - $sessionLink-linkFont
//

export default defineComponent({
  name: 'SessionLink',
  data() {
    return { didCopy: false };
  },
  props: {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  computed: {
    copyClasses(): unknown {
      return {
        'is-dark': !this.didCopy,
        'is-success': this.didCopy,
      };
    },
  },
  methods: {
    showQr(): void {
      this.$emit('qr', this.link);
      this.$deconf.showDialog(QrDialog, {
        url: this.link,
      });
    },
    onClick(): void {
      this.$emit('visit', this.link);
    },
    copyLink(): void {
      copy(this.link, { message: 'done' });

      this.didCopy = true;
      setTimeout(() => (this.didCopy = false), 5000);

      this.$emit('copy', this.link);
    },
    cleanUrl(url: string): string {
      return url.replace(/https?:\/\//, '');
    },
  },
});
</script>

<style lang="scss">
$sessionLink-background: $link !default;
$sessionLink-color: $white !default;
$sessionLink-radius: $radius-large !default;
$sessionLink-linkFont: $family-sans-serif !default;

.sessionLink {
}
.sessionLink-title {
  border-radius: $sessionLink-radius $sessionLink-radius 0 0;
  background-color: $sessionLink-background;
  color: $sessionLink-color;
  font-size: $size-6;
  padding: 0.25rem;
  text-align: center;
  font-weight: $weight-bold;
}
.sessionLink-link {
  border-left: 1px solid $sessionLink-background;
  border-right: 1px solid $sessionLink-background;
  border-bottom: 1px solid $sessionLink-background;
  border-radius: 0 0 $sessionLink-radius $sessionLink-radius;
  padding: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: $sessionLink-linkFont;
}
.sessionLink-raw {
  text-decoration: underline;
  word-break: break-all;
  margin-right: 0.5em;
  font-size: 0.9em;
  &:hover {
    text-decoration: none;
  }
}
.sessionLink-copy {
}
.sessionLink-actions {
  display: flex;
  gap: 0.5em;
}
</style>
