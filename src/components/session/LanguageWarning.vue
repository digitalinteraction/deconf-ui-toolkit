<template>
  <div class="languageWarning" v-if="!isDismissed">
    <div class="notification is-warning">
      <button class="delete" @click="dismiss"></button>
      <span class="languageWarning-text">
        {{
          $t('deconf.session.languageWarning', [availableLanguages.join('/')])
        }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

//
// I18n keys
// - deconf.session.languageWarning
//
export default Vue.extend({
  data() {
    return {
      isDismissed: false
    };
  },
  props: {
    availableLanguages: { type: Array as PropType<string[]>, required: true }
  },
  methods: {
    dismiss() {
      this.isDismissed = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.languageWarning {
}
.languageWarning-text {
  font-weight: $weight-bold;
}
</style>
