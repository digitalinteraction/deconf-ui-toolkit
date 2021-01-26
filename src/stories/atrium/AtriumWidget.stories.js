import AtriumWidget from './AtriumWidget.vue';
import '../utils/fontawesome';
import { createTemplate } from '../utils/template';

export default {
  title: 'Atrium/AtriumWidget',
  component: 'AtriumWidget'
};

const Template = createTemplate({ AtriumWidget });

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
  title: 'Hello, world!',
  subtitle: 'Now for something completely different',
  icon: ['fas', 'user-friends'],
  href: null
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  kind: 'secondary',
  icon: ['fas', 'terminal']
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Primary.args,
  kind: 'twitter',
  icon: ['fab', 'twitter'],
  href: 'https://duck.com'
};
