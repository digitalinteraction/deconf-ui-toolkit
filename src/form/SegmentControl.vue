<template>
  <div class="inlineField">
    <button
      class="button"
      :class="optionClasses(option)"
      v-for="option in options"
      :key="stringify(option.value)"
      @click="onOption(option)"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SelectOption } from './select-option';

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
  name: 'SegmentControl',
  props: {
    value: { type: String, required: true },
    options: { type: Array as PropType<SelectOption[]>, required: true },
  },
  methods: {
    optionClasses(option: SelectOption): unknown {
      return {
        'is-primary': option.value === this.value,
      };
    },
    onOption(option: SelectOption) {
      this.$emit('input', option.value);
    },
    stringify(value: unknown) {
      return value as string;
    },
  },
});
</script>
