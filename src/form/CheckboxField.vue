<template>
  <div class="field">
    <label :for="name" class="checkbox" :class="labelClass">
      <input
        :id="name"
        type="checkbox"
        class="checkbox"
        :disabled="disabled"
        :checked="modelValue"
        @change="onInput"
      />
      {{ text }}
    </label>
    <p class="help" v-if="help" :class="labelClass">{{ help }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

export default defineComponent({
  name: 'CheckboxField',
  props: {
    name: { type: String, required: true },
    modelValue: { type: Boolean, required: true },
    text: { type: String, required: true },
    hasError: { type: Boolean, default: false },
    help: { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    labelClass(): unknown {
      return {
        'is-danger': this.hasError,
      };
    },
  },
  mounted() {
    console.log('cf', this.modelValue);
  },
  methods: {
    onInput(event: Event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      this.$emit('update:modelValue', event.target.checked);
    },
  },
});
</script>

<style lang="scss">
.checkbox.is-danger {
  color: $danger;
}
</style>
