<template>
  <div class="sessionLink">
    <div class="sessionLink-title">{{ title }}</div>
    <div class="sessionLink-link">
      <a class="sessionLink-raw" :href="link">{{ link | cleanUrl }}</a>
      <button
        class="sessionLink-copy button is-small is-dark"
        :class="buttonClasses"
        @click="copyLink"
      >
        {{ $t(didCopy ? 'deconf.general.copied' : 'deconf.general.copy') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import copy from 'copy-to-clipboard';

//
// I18n used:
// - deconf.general.copy
// - deconf.general.copied
//
export default Vue.extend({
  data() {
    return { didCopy: false };
  },
  props: {
    title: { type: String, required: true },
    link: { type: String, required: true }
  },
  filters: {
    cleanUrl(url: string): string {
      return url.replace(/https?:\/\//, '');
    }
  },
  computed: {
    buttonClasses(): object {
      return {
        'is-dark': !this.didCopy,
        'is-success': this.didCopy
      };
    }
  },
  methods: {
    copyLink(): void {
      copy(this.link, { message: 'done' });

      this.didCopy = true;
      setTimeout(() => (this.didCopy = false), 5000);
    }
  }
});
</script>

<style lang="scss" scoped>
.sessionLink {
}
.sessionLink-title {
  border-radius: $radius-large $radius-large 0 0;
  background-color: $link;
  color: $white;
  font-size: 1.3em;
  padding: 0.5rem;
  text-align: center;
  font-weight: $weight-bold;
}
.sessionLink-link {
  border-left: 1px solid $link;
  border-right: 1px solid $link;
  border-bottom: 1px solid $link;
  border-radius: 0 0 $radius-large $radius-large;
  padding: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: $family-monospace;
}
.sessionLink-raw {
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}
.sessionLink-copy {
}
</style>
