<template>
  <div class="field">
    <label :for="name" class="checkbox" :class="labelClass">
      <input
        :id="name"
        type="checkbox"
        class="checkbox"
        :value="value"
        @change="onInput"
      />
      {{ text }}
    </label>
    <p class="help" v-if="help" :class="labelClass">{{ help }}</p>
  </div>
</template>

<script lang="ts">
//
// Wraps a bulma checkbox field
//

//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//

export default {
  name: 'CheckboxField',
  props: {
    name: { type: String, required: true },
    value: { type: Boolean, required: true },
    text: { type: String, required: true },
    hasError: { type: Boolean, default: false },
    help: { type: String, required: true }
  },
  computed: {
    labelClass(): unknown {
      return {
        'is-danger': this.hasError
      };
    }
  },
  methods: {
    onInput(event: Event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      this.$emit('input', event.target.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox.is-danger {
  color: $danger;
}
</style>
