import { Meta, Story } from '@storybook/vue';
import { createContent } from '../story-lib/module';
import StickyHeading from './StickyHeading.vue';

export default {
  title: 'Component/StickyHeading',
  component: StickyHeading,
  argTypes: {
    titleClass: {
      control: {
        type: 'select',
        options: ['is-primary', 'is-dark']
      }
    }
  }
} as Meta;

const Content = createContent();

const Template: Story = (args, { argTypes }) => ({
  components: { StickyHeading, Content },
  props: ['title', 'titleClass', 'navbarHeight'],
  template: `
    <StickyHeading
      :title="title"
      :title-class="titleClass"
      :navbar-height="navbarHeight"
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
  `
});

export const Default = Template.bind({});
Default.args = {
  title: 'This is a title',
  titleClass: 'is-primary',
  navbarHeight: '0'
};
Default.parameters = {
  layout: 'fullscreen'
};
