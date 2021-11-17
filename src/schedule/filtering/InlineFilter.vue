<template>
  <div class="inlineField">
    <div class="button is-static">
      {{ label }}
    </div>
    <div class="select">
      <select :value="value" @input="onInput">
        <option :value="null">
          {{ offLabel }}
        </option>
        <option
          v-for="item in options"
          :key="item.value.toString()"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { localiseFromObject } from '../../lib/module';
import { FilterOption } from './filter-option';

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
  name: 'InlineFilter',
  props: {
    label: { type: String, required: true },
    offLabel: { type: String, required: true },
    options: { type: Array as PropType<FilterOption[]>, required: true },
    value: { required: true }
  },
  methods: {
    localise(object: Record<string, string>): string | null {
      return localiseFromObject(this.$i18n.locale, object);
    },
    onInput(event: InputEvent) {
      const target = event.target as HTMLSelectElement;
      if (!target) return;

      const allOptions = [null, ...this.options.map(o => o.value)];
      const value = allOptions[target.selectedIndex];
      this.$emit('input', value);
    }
  }
};
</script>

<style lang="scss"></style>
