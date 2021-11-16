import { Meta, Story } from '@storybook/vue';
import ApiContent from './ApiContent.vue';

export default {
  title: 'Content/ApiContent',
  component: ApiContent
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { ApiContent },
  template: `
    <div class="content">
      <ApiContent>
        <div slot="featured_thing" class="notification is-info">This is important</div>
      </ApiContent>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
