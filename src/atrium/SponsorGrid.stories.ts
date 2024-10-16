import { Meta } from '@storybook/vue3';
import SponsorGrid from './SponsorGrid.vue';
import { createSponsors } from '../story-lib/module';

export default {
  title: 'Atrium/SponsorGrid',
  component: SponsorGrid,
} as Meta;

const Template = (args: unknown) => ({
  components: { SponsorGrid },
  setup: () => args,
  data: () => ({
    groups: [
      {
        size: 'large',
        title: 'Platinum Sponsors',
        sponsors: createSponsors(3),
      },
      {
        size: 'medium',
        title: 'Gold Sponsors',
        sponsors: createSponsors(5),
      },
      {
        size: 'regular',
        title: 'Bronze Sponsors',
        sponsors: createSponsors(10),
      },
      {
        size: 'small',
        title: 'Other Sponsors',
        sponsors: createSponsors(20),
      },
    ],
  }),
  template: `
    <SponsorGrid :groups="groups" />
  `,
});

export const Default = {
  render: Template,
};
