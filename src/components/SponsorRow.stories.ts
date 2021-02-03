import { Meta, Story } from '@storybook/vue';
import SponsorRow from './SponsorRow.vue';
import { createSponsors } from '@/story-utils';

export default {
  title: 'Component/SponsorRow',
  component: SponsorRow
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SponsorRow },
  props: ['title', 'size', 'numSponsors'],
  computed: {
    sponsors() {
      return createSponsors(this.numSponsors as number);
    }
  },
  template: `
    <SponsorRow
      :title="title"
      :size="size"
      :sponsors="sponsors"
    />
  `
});

export const Regular = Template.bind({});
Regular.args = {
  title: 'Sponsors',
  size: 'regular',
  numSponsors: 5
};

export const Large = Template.bind({});
Large.args = {
  title: 'Platinum Sponsors',
  size: 'large',
  numSponsors: 5
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Gold Sponsors',
  size: 'medium',
  numSponsors: 10
};

export const Small = Template.bind({});
Small.args = {
  title: 'More Sponsors',
  size: 'small',
  numSponsors: 20
};
