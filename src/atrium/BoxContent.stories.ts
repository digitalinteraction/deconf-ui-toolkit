import type { Meta, StoryObj } from '@storybook/vue3';
import BoxContent from './BoxContent.vue';
import { Content } from '../story-lib/module.js';

export default {
  title: 'Atrium/BoxContent',
  component: BoxContent,

  tags: ['autodocs'],
} satisfies Meta<typeof BoxContent>;

export const Default: StoryObj<typeof BoxContent> = {
  args: {
    title: 'Lorem ipsum sil dor amet',
  },
  render: (args) => ({
    components: { BoxContent, Content },
    setup: () => args,
    template: `
      <BoxContent :title="title">
        <Content class="content" />
      </BoxContent>
    `,
  }),
};
