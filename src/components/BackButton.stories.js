import BackButton from './BackButton.vue';

export default {
  title: 'Component/BackButton',
  component: BackButton
};

const Template = (args, { argTypes }) => ({
  components: { BackButton },
  props: ['text'],
  template: `
    <div>
      <BackButton to="/">{{ text }}</BackButton>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  text: 'Go home'
};
