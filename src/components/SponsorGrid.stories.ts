import { Meta, Story } from '@storybook/vue';
import SponsorGrid from './SponsorGrid.vue';
import { createSponsors } from '../story-utils';

export default {
  title: 'Component/SponsorGrid',
  component: SponsorGrid
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SponsorGrid },
  data: () => ({
    groups: [
      {
        size: 'large',
        title: 'Platinum Sponsors',
        sponsors: createSponsors(3)
      },
      {
        size: 'medium',
        title: 'Gold Sponsors',
        sponsors: createSponsors(5)
      },
      {
        size: 'regular',
        title: 'Bronze Sponsors',
        sponsors: createSponsors(10)
      },
      {
        size: 'small',
        title: 'Other Sponsors',
        sponsors: createSponsors(20)
      }
    ]
  }),
  template: `
    <SponsorGrid :groups="groups" />
  `
});

export const Default = Template.bind({});
Default.args = {};
