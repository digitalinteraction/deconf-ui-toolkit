import { Meta, Story } from '@storybook/vue';
import AtriumLayout from '@/layouts/AtriumLayout.vue';
import HeroCard from '@/components/atrium/HeroCard.vue';
import BoxContent from '@/components/BoxContent.vue';
import ColorWidget from '@/components/atrium/ColorWidget.vue';
import SponsorGrid from '@/components/SponsorGrid.vue';
import { createSponsors, createContent } from '@/story-utils';

export default {
  title: 'Layout/AtriumLayout',
  component: AtriumLayout
} as Meta;

// const Template = createTemplate({ AtriumLayout });
const Template: Story = (args, { argTypes }) => ({
  components: { AtriumLayout, HeroCard, BoxContent, ColorWidget, SponsorGrid },
  data: () => ({
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
    ],
    content: createContent()
  }),
  template: `
    <AtriumLayout>
      <HeroCard
        slot="top"
        title="Virtual Climate Summit 2020"
        subtitle="Sept 9, 12:00PM – Sept 10 19:00PM CEST"
        coverImage="/atrium.jpg"
      />
      <BoxContent
        slot="left"
        title="Welcome to our global, digital climate change summit"
        :content="content"
      />
      <div slot="right">
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
        </div>
      <SponsorGrid slot="bottom" :groups="sponsors" />
    </AtriumLayout>
  `
});

export const Desktop = Template.bind({});
Desktop.args = {};

export const Mobile = Template.bind({});
Mobile.args = {};
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile2' },
  layout: 'fullscreen'
};
