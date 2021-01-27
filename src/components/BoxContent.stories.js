import BoxContent from './BoxContent.vue';
import { createTemplate, createContent } from '@/utils';

export default {
  title: 'Component/BoxContent',
  component: BoxContent
};

const Template = createTemplate({ BoxContent });

export const Default = Template.bind({});
Default.args = {
  title: 'Test!',
  content: createContent()
};
Default.parameters = {
  backgrounds: { default: 'dark' }
};
