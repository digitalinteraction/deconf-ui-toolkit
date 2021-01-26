import SponsorRow from './SponsorRow.vue';
import { createTemplate } from '../utils/template';
import { createSponsors } from '../utils/sponsors';

export default {
  title: 'Component/SponsorRow',
  component: SponsorRow
};

const Template = createTemplate({ SponsorRow });

export const Regular = Template.bind({});
Regular.args = {
  title: 'Sponsors',
  size: 'regular',
  sponsors: createSponsors(5)
};

export const Large = Template.bind({});
Large.args = {
  title: 'Platinum Sponsors',
  size: 'large',
  sponsors: createSponsors(5)
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Gold Sponsors',
  size: 'medium',
  sponsors: createSponsors(10)
};

export const Small = Template.bind({});
Small.args = {
  title: 'More Sponsors',
  size: 'small',
  sponsors: createSponsors(20)
};
