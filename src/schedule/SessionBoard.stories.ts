import { Meta } from '@storybook/vue3';
import SessionBoard from './SessionBoard.vue';

export default {
  title: 'Schedule/SessionBoard',
  component: SessionBoard,
} as Meta;

const Template = (args: unknown) => ({
  components: { SessionBoard },
  setup: () => args,
  template: `
    <SessionBoard>
      <div style="height: 300px; background: rebeccapurple" />
      <div style="height: 150px; background: royalblue" />
      <div style="height: 225px; background: coral" />
      <div style="height: 200px; background: coral" />
      <div style="height: 200px; background: rebeccapurple" />
      <div style="height: 275px; background: royalblue" />
    </SessionBoard>
  `,
});

export const Default = {
  render: Template,
};
