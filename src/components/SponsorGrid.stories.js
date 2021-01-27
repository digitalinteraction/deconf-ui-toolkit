import SponsorGrid from './SponsorGrid.vue';
import { createTemplate, createSponsors } from '@/utils';

export default {
  title: 'Component/SponsorGrid',
  component: SponsorGrid
};

const Template = createTemplate({ SponsorGrid });

export const Default = Template.bind({});
Default.args = {
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
};
