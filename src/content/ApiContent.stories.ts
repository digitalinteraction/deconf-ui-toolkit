import { Meta } from '@storybook/vue3';
import ApiContent from './ApiContent.vue';

export default {
  title: 'Content/ApiContent',
  component: ApiContent,
} as Meta;

const Template = (args: unknown) => ({
  components: { ApiContent },
  setup: () => args,
  template: `
    <div class="content">
      <ApiContent slug="some-slug">
        <template v-slot:featured_thing>
          <div class="notification is-info">This is featured!</div>
        </template>
      </ApiContent>
    </div>
  `,
});

export const Default = {
  render: Template,
  args: {},
};
