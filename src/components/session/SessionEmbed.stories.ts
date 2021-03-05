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

export const Panopto = Template.bind({});
Panopto.args = {
  link:
    'https://mozilla.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=312c3b08-71b6-401f-8ee6-acc300fa774b&autoplay=false&offerviewer=false&showtitle=false&showbrand=false&start=0&interactivity=all'
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  link: 'https://vimeo.com/336812660'
};

export const VimeoPlayer = Template.bind({});
VimeoPlayer.args = {
  link: 'https://player.vimeo.com/video/336812660'
};

export const Twitch = Template.bind({});
Twitch.args = {
  link: 'https://www.twitch.tv/bobross'
};

export const ZoomPersonal = Template.bind({});
ZoomPersonal.args = {
  link: 'https://zoom.us/my/abcdef'
};

export const ZoomJoin = Template.bind({});
ZoomJoin.args = {
  link: 'https://zoom.us/j/123456789'
};

export const Teams = Template.bind({});
Teams.args = {
  link:
    'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzliMDhmNDUtZjAwNS00NjQ5LWJkYzMtNTE2NTNhOTY0ZTAw%40thread.v2/0?context=%7b%22Tid%22%3a%229c5012c9-b616-44c2-a917-66814fbe3e87%22%2c%22Oid%22%3a%22ce849a55-9a39-48ec-a3a5-c2371bbc5c68%22%7d'
};

export const MozHubs = Template.bind({});
MozHubs.args = {
  link: 'https://hubs.mozilla.com/abcdefg/lorem-ipsum-sil-dor-amet/'
};

export const MozHubsShort = Template.bind({});
MozHubsShort.args = {
  link: 'https://hub.link/abcdefg'
};

export const SpatialChat = Template.bind({});
SpatialChat.args = {
  link: 'https://spatial.chat/s/MozFest2021'
};

export const NoEmbed = Template.bind({});
NoEmbed.args = {
  link: 'https://duck.com'
};
