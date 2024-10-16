import { Meta } from '@storybook/vue3';
import SessionBoard from './SessionBoard.vue';

export default {
  title: 'Schedule/SessionBoard',
  component: SessionBoard,
} as Meta;

const Template = (args: unknown) => ({
  components: { SessionBoard },
  props: [],
  template: `
    <SessionBoard>
      <div style="height: 300px; background: rebeccapurple" />
      <div style="height: 150px; background: rebeccapurple" />
      <div style="height: 225px; background: rebeccapurple" />
      <div style="height: 200px; background: rebeccapurple" />
      <div style="height: 200px; background: rebeccapurple" />
      <div style="height: 275px; background: rebeccapurple" />
    </SessionBoard>
  `,
});

export const Default = Template.bind({});
Default.args = {};
