import { Meta } from '@storybook/vue3';
import SecondaryEmbed from './SecondaryEmbed.vue';

export default {
  title: 'Session/SecondaryEmbed',
  component: SecondaryEmbed,
} as Meta;

const Template = (args: unknown) => ({
  components: { SecondaryEmbed },
  setup: () => args,
  template: `
    <div style="max-width: 400px">
      <SecondaryEmbed :link="link" />
    </div>
  `,
});

export const VimeoChat = {
  render: Template,
  args: { link: 'https://vimeo.com/live-chat/622215885/' },
};

export const VimeoEvent = {
  render: Template,
  args: { link: 'https://vimeo.com/event/1361742/chat/interaction/' },
};

export const VimeoEvent2 = {
  render: Template,
  args: { link: 'https://vimeo.com/event/1361742/chat/' },
};
