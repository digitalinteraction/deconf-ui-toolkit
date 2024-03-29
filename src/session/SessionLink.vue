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
        {{ link | cleanUrl }}
      </a>
      <button
        class="sessionLink-copy button is-small is-dark"
        :class="buttonClasses"
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
</template>

<script lang="ts">
import copy from 'copy-to-clipboard';

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

export default {
  name: 'SessionLink',
  data() {
    return { didCopy: false };
  },
  props: {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  filters: {
    cleanUrl(url: string): string {
      return url.replace(/https?:\/\//, '');
    },
  },
  computed: {
    buttonClasses(): unknown {
      return {
        'is-dark': !this.didCopy,
        'is-success': this.didCopy,
      };
    },
  },
  methods: {
    onClick(): void {
      this.$emit('click', this.link);
    },
    copyLink(): void {
      copy(this.link, { message: 'done' });

      this.didCopy = true;
      setTimeout(() => (this.didCopy = false), 5000);

      this.$emit('copy', this.link);
    },
  },
};
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
</style>
