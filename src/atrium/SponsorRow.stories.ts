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
        options: ['large', 'medium', 'regular', 'small'],
      },
    },
  },
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SponsorRow },
  props: ['title', 'size', 'numSponsors', 'href'],
  computed: {
    sponsors() {
      return createSponsors(this.numSponsors as number).map((s) => ({
        ...s,
        href: this.href,
      }));
    },
  },
  template: `
    <SponsorRow
      :title="title"
      :size="size"
      :sponsors="sponsors"
    />
  `,
});

export const Regular = Template.bind({});
Regular.args = {
  title: 'Sponsors',
  size: 'regular',
  numSponsors: 5,
  href: undefined,
};
Regular.parameters = {
  controls: {
    exclude: ['sponsors'],
  },
};

export const Large = Template.bind({});
Large.args = {
  title: 'Platinum Sponsors',
  size: 'large',
  numSponsors: 5,
  href: undefined,
};
Large.parameters = {
  controls: {
    exclude: ['sponsors'],
  },
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Gold Sponsors',
  size: 'medium',
  numSponsors: 10,
  href: undefined,
};
Medium.parameters = {
  controls: {
    exclude: ['sponsors'],
  },
};

export const Small = Template.bind({});
Small.args = {
  title: 'More Sponsors',
  size: 'small',
  numSponsors: 20,
  href: undefined,
};
Small.parameters = {
  controls: {
    exclude: ['sponsors'],
  },
};

export const WithLink = Template.bind({});
WithLink.args = {
  title: 'Sponsors',
  size: 'regular',
  numSponsors: 5,
  href: 'https://duck.com',
};
WithLink.parameters = {
  controls: {
    exclude: ['sponsors'],
  },
};
