import { Meta, Story } from '@storybook/vue';
import SponsorRow from './SponsorRow.vue';
import { createSponsors } from '../story-lib/module';

export default {
  title: 'Atrium/SponsorRow',
  component: SponsorRow,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'medium', 'regular', 'small']
      }
    }
  }
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
Regular.parameters = {
  controls: {
    exclude: ['sponsors']
  }
};

export const Large = Template.bind({});
Large.args = {
  title: 'Platinum Sponsors',
  size: 'large',
  numSponsors: 5
};
Large.parameters = {
  controls: {
    exclude: ['sponsors']
  }
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Gold Sponsors',
  size: 'medium',
  numSponsors: 10
};
Medium.parameters = {
  controls: {
    exclude: ['sponsors']
  }
};

export const Small = Template.bind({});
Small.args = {
  title: 'More Sponsors',
  size: 'small',
  numSponsors: 20
};
Small.parameters = {
  controls: {
    exclude: ['sponsors']
  }
};
