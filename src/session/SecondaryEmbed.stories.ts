import { Meta } from '@storybook/vue3';
import SecondaryEmbed from './SecondaryEmbed.vue';

export default {
  title: 'Session/SecondaryEmbed',
  component: SecondaryEmbed,
} as Meta;

const Template = (args: unknown) => ({
  components: { SecondaryEmbed },
  props: ['link'],
  template: `
    <div style="max-width: 400px">
      <SecondaryEmbed :link="link" />
    </div>
  `,
});

export const VimeoChat = Template.bind({});
VimeoChat.args = {
  link: 'https://vimeo.com/live-chat/622215885/',
};

export const VimeoEvent = Template.bind({});
VimeoEvent.args = {
  link: 'https://vimeo.com/event/1361742/chat/interaction/',
};

export const VimeoEvent2 = Template.bind({});
VimeoEvent2.args = {
  link: 'https://vimeo.com/event/1361742/chat/',
};
