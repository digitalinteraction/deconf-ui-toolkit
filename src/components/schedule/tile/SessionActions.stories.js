import SessionActions from './SessionActions.vue';

export default {
  title: 'Schedule/SessionActions',
  component: SessionActions
};

const session = {
  id: '1'
};

const Template = (args, { argTypes }) => ({
  components: { SessionActions },
  props: ['slotState'],
  data: () => ({
    session
  }),
  template: `
    <SessionActions
      :session="session"
      :slot-state="slotState"
    />
  `
});

export const Future = Template.bind({});
Future.args = {
  slotState: 'future'
};

export const Soon = Template.bind({});
Soon.args = {
  slotState: 'soon'
};

export const Present = Template.bind({});
Present.args = {
  slotState: 'present'
};

export const Past = Template.bind({});
Past.args = {
  slotState: 'past'
};
