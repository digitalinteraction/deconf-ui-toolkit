import { Meta } from '@storybook/vue3';
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

const Template = (args: any) => ({
  components: { SponsorRow },
  setup: () => args,
  computed: {
    sponsors() {
      return createSponsors(args.numSponsors as number).map((s) => ({
        ...s,
        href: args.href,
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

export const Regular = {
  render: Template,
  args: {
    title: 'Sponsors',
    size: 'regular',
    numSponsors: 5,
    href: undefined,
  },
};

export const Large = {
  render: Template,
  args: {
    title: 'Platinum Sponsors',
    size: 'large',
    numSponsors: 5,
    href: undefined,
  },
};

export const Medium = {
  render: Template,
  args: {
    title: 'Gold Sponsors',
    size: 'medium',
    numSponsors: 10,
    href: undefined,
  },
};

export const Small = {
  render: Template,
  args: {
    title: 'More Sponsors',
    size: 'small',
    numSponsors: 20,
    href: undefined,
  },
};

export const WithLink = {
  render: Template,
  args: {
    title: 'Sponsors',
    size: 'regular',
    numSponsors: 5,
    href: 'https://duck.com',
  },
};
