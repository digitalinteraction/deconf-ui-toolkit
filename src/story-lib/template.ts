//
// This method was an attempt to wrap the normal creation of a storybook template
// using v-bind so you only need to call one method, rather than create each template manually
// NOTE: it breaks when using the "default" slot as it tries to assign to default which is forbidden
//
// I decided to be more verbose in the story files so that they can be more self-contained
// and conformant to other storybooks
//

import { Story } from '@storybook/vue';
import { Component } from 'vue';

export function createTemplate<T extends Record<string, Component>>(
  components: T
): Story {
  const name = Object.keys(components)[0];

  return (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: components,
    template: `
      <${name} v-bind="{ ${Object.keys(argTypes).join(', ')} }" />
    `
  });
}
