import { Meta } from '@storybook/vue3';
import {
  BrandA,
  mockSettings,
  Content,
  MockAppLayout,
} from '../story-lib/module';

import StickyHeading from './StickyHeading.vue';
import { AppLayout } from '../core/module';

export default {
  title: 'Schedule/StickyHeading',
  component: StickyHeading,
  argTypes: {
    titleClass: {
      control: {
        type: 'select',
        options: ['is-primary', 'is-dark'],
      },
    },
  },
} as Meta;

const Template = (args: unknown) => ({
  components: { StickyHeading, Content, AppLayout, BrandA, MockAppLayout },
  setup: () => args,
  data() {
    return {
      appSettings: mockSettings(),
    };
  },
  template: `
    <MockAppLayout>
      <StickyHeading
        :title="title"
        :title-class="titleClass"
      >
        <section class="section">
          <div class="content">
            <Content />
            <Content />
            <Content />
            <Content />
          </div>
        </section>
      </StickyHeading>
    </MockAppLayout>
  `,
});

export const Default = {
  render: Template,
  args: {
    title: 'This is a title',
    titleClass: 'is-primary',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
