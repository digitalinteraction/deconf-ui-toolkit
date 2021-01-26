import BoxContent from './BoxContent.vue';
import { createTemplate } from '../utils/template';
import { createContent } from '../utils/content';

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
