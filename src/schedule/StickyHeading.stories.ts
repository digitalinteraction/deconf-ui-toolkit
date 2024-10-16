import { Meta } from '@storybook/vue3';
import { BrandA, mockSettings, Content } from '../story-lib/module';

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
  components: { StickyHeading, Content, AppLayout, BrandA },
  props: ['title', 'titleClass'],
  data() {
    return {
      appSettings: mockSettings(),
    };
  },
  template: `
    <div>
      <AppLayout
        :app-settings="appSettings"
        :routes="[]"
        :user="null"
      >
        <BrandA slot="brandA" />
        <StickyHeading
          :title="title"
          :title-class="titleClass"
          slot="main"
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
      </AppLayout>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'This is a title',
  titleClass: 'is-primary',
};
Default.parameters = {
  layout: 'fullscreen',
  controls: {
    exclude: ['default'],
  },
};
