import { Meta } from '@storybook/vue3';
import SessionLink from './SessionLink.vue';
import { fn } from '@storybook/test';

export default {
  title: 'Session/SessionLink',
  component: SessionLink,
} as Meta;

const Template = (args: unknown) => ({
  components: { SessionLink },
  setup: () => args,
  template: `
    <div style="max-width: 420px">
      <SessionLink
        :title="title"
        :link="link" 
        @qr="onQr"
        @visit="onClick"
        @copy="onCopy"
      />
    </div>
  `,
});

export const Default = {
  render: Template,
  args: {
    title: 'Join the zoom',
    link: 'https://zoom.us/u/123456789',
    onQr: fn(),
    onClick: fn(),
    onCopy: fn(),
  },
};
