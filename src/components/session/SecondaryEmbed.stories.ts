import { Meta, Story } from '@storybook/vue';
import SecondaryEmbed from './SecondaryEmbed.vue';

export default {
  title: 'Session/SecondaryEmbed',
  component: SecondaryEmbed
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SecondaryEmbed },
  props: ['link'],
  template: `
    <div style="max-width: 400px">
      <SecondaryEmbed :link="link" />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  link: 'https://vimeo.com/live-chat/622215885/'
};
