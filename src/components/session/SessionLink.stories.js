import SessionLink from './SessionLink.vue';
import { createTemplate } from '@/utils';

export default {
  title: 'Session/SessionLink',
  component: SessionLink,
  decorators: [
    () => ({ template: `<div style="max-width: 420px"><story/></div>` })
  ]
};

const Template = createTemplate({ SessionLink });

export const Default = Template.bind({});
Default.args = {
  title: 'Join the zoom',
  link: 'https://zoom.us/u/123456789'
};
