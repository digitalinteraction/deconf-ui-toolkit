import { Meta, Story } from '@storybook/vue';
import SessionEmbed from './SessionEmbed.vue';

export default {
  title: 'Session/SessionEmbed',
  component: SessionEmbed,
  decorators: [
    () => ({ template: `<div style="max-width: 720px"><story/></div>` })
  ]
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  components: { SessionEmbed },
  props: ['link'],
  template: `
    <SessionEmbed :link="link" />
  `
});

export const YoutubeFull = Template.bind({});
YoutubeFull.args = {
  link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

export const YoutubeShare = Template.bind({});
YoutubeShare.args = {
  link: 'https://youtu.be/dQw4w9WgXcQ'
};

export const YoutubeNoCookie = Template.bind({});
YoutubeNoCookie.args = {
  link: 'https://www.youtube-nocookie.com/watch?v=dQw4w9WgXcQ'
};

export const YoutubeLiveStream = Template.bind({});
YoutubeLiveStream.args = {
  link:
    'https://www.youtube.com/embed/live_stream?channel=UC7v2Rs4f_UlIQNuNKUjmtgA'
};

export const Zoom = Template.bind({});
Zoom.args = {
  link: 'https://zoom.us/my/abcdef'
};

export const Teams = Template.bind({});
Teams.args = {
  link:
    'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzliMDhmNDUtZjAwNS00NjQ5LWJkYzMtNTE2NTNhOTY0ZTAw%40thread.v2/0?context=%7b%22Tid%22%3a%229c5012c9-b616-44c2-a917-66814fbe3e87%22%2c%22Oid%22%3a%22ce849a55-9a39-48ec-a3a5-c2371bbc5c68%22%7d'
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  link: 'https://player.vimeo.com/video/336812660'
};

export const NoEmbed = Template.bind({});
NoEmbed.args = {
  link: 'https://duck.com'
};
