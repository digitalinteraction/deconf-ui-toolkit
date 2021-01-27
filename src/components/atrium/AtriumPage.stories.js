import AtriumPage from './AtriumPage.vue';
import { createTemplate, createSponsors, createContent } from '@/utils';

export default {
  title: 'Atrium/AtriumPage',
  component: AtriumPage
};

const Template = createTemplate({ AtriumPage });

export const Default = Template.bind({});
Default.args = {
  heroTitle: 'Virtual Climate Summit 2020',
  heroSubtitle: 'Sept 9, 12:00PM – Sept 10 19:00PM CEST',
  pageTitle: 'Welcome to our global, digital climate change summit',
  coverImage: '/atrium.jpg',
  content: createContent(),
  widgets: [
    {
      kind: 'primary',
      title: 'Title A',
      subtitle: 'Some subtitle that is long text',
      href: null,
      icon: ['fas', 'broom']
    },
    {
      kind: 'secondary',
      title: 'Title B',
      subtitle: 'Some subtitle that is long text',
      href: null,
      icon: ['fas', 'code']
    },
    {
      kind: 'twitter',
      title: '@OpenLab',
      subtitle: 'Follow us on Twitter',
      href: 'https://twitter.com/OpenLab_Ncl',
      icon: ['fab', 'twitter']
    }
  ],
  sponsors: [
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
