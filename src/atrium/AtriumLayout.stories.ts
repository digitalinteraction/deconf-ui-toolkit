import { Meta, StoryObj } from '@storybook/vue3';

import AtriumLayout from './AtriumLayout.vue';
import HeroCard from './HeroCard.vue';
import ColorWidget from './ColorWidget.vue';
import BoxContent from './BoxContent.vue';
import SponsorGrid from './SponsorGrid.vue';

import { createSponsors, Content } from '../story-lib/module';

export default {
  title: 'Atrium/AtriumLayout',
  component: AtriumLayout,
} as Meta<typeof AtriumLayout>;

type Story = StoryObj<typeof AtriumLayout>;

const sponsors = [
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
];

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      AtriumLayout,
      HeroCard,
      BoxContent,
      Content,
      ColorWidget,
      SponsorGrid,
    },
    setup: () => ({ ...args, sponsors }),
    template: `
      <AtriumLayout>
        <template v-slot:top>
          <HeroCard
            title="Virtual Climate Summit 2020"
            subtitle="Sept 9, 12:00PM – Sept 10 19:00PM CEST"
            coverImage="/static/atrium.jpg"
          />
        </template>
        
        <template v-slot:left>
          <BoxContent
            title="Welcome to our global, digital climate change summit"
          >
            <Content />
          </BoxContent>
        </template>

        <template v-slot:right>
          <ColorWidget
            kind="primary"
            title="Title A"
            subtitle="Some subtitle that is long text"
            :icon="['fas', 'broom']"
          />
          <ColorWidget
            kind="secondary"
            title="Title B"
            subtitle="Some subtitle that is long text"
            :icon="['fas', 'code']"
          />
          <ColorWidget
            kind="twitter"
            title="@OpenLab"
            subtitle="Follow us on Twitter"
            href="https://twitter.com/OpenLab_Ncl"
            :icon="['fab', 'twitter']"
          />
        </template>
        <template v-slot:bottom>
          <SponsorGrid :groups="sponsors" />
        </template>
      </AtriumLayout>
    `,
  }),
};
