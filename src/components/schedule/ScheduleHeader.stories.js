import ScheduleHeader from './ScheduleHeader.vue';

export default {
  title: 'Schedule/ScheduleHeader',
  component: ScheduleHeader
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ScheduleHeader },
  template: `
    <ScheduleHeader class="${args.classes}">
      Lorem ipsum sil dor amet
    </ScheduleHeader>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  classes: 'is-primary'
};

export const Dark = Template.bind({});
Dark.args = {
  classes: 'is-dark'
};
