import { Meta } from '@storybook/vue3';
import PrimaryEmbed from './PrimaryEmbed.vue';

export default {
  title: 'Session/PrimaryEmbed',
  component: PrimaryEmbed,
  decorators: [
    () => ({ template: `<div style="max-width: 720px"><story/></div>` }),
  ],
} as Meta;

const Template = (args: unknown) => ({
  components: { PrimaryEmbed },
  setup: () => args,
  template: `
    <PrimaryEmbed :link="link" @click="onClick" />
  `,
  methods: {
    onClick() {
      console.log('clicked');
    },
  },
});

export const YoutubeFull = {
  render: Template,
  args: { link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
};

export const YoutubeShare = {
  render: Template,
  args: {
    link: 'https://youtu.be/dQw4w9WgXcQ',
  },
};

export const YoutubeNoCookie = {
  render: Template,
  args: {
    link: 'https://www.youtube-nocookie.com/watch?v=dQw4w9WgXcQ',
  },
};

export const YoutubeLiveStream = {
  render: Template,
  args: {
    link: 'https://www.youtube.com/embed/live_stream?channel=UC7v2Rs4f_UlIQNuNKUjmtgA',
  },
};

export const Panopto = {
  render: Template,
  args: {
    link: 'https://mozilla.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=312c3b08-71b6-401f-8ee6-acc300fa774b&autoplay=false&offerviewer=false&}showtitle=false&showbrand=false&start=0&interactivity=all',
  },
};

export const Vimeo = {
  render: Template,
  args: {
    link: 'https://vimeo.com/336812660',
  },
};

export const VimeoPlayer = {
  render: Template,
  args: {
    link: 'https://player.vimeo.com/video/336812660',
  },
};

export const VimeoEvent = {
  render: Template,
  args: {
    link: 'https://vimeo.com/event/1361742',
  },
};

export const VimeoEventEmbed = {
  render: Template,
  args: {
    link: 'https://vimeo.com/event/336812660/embed',
  },
};

export const Twitch = {
  render: Template,
  args: {
    link: 'https://www.twitch.tv/bobross',
  },
};

export const ZoomPersonal = {
  render: Template,
  args: {
    link: 'https://zoom.us/my/abcdef',
  },
};

export const ZoomJoin = {
  render: Template,
  args: {
    link: 'https://zoom.us/j/123456789',
  },
};

export const ZoomRegister = {
  render: Template,
  args: {
    link: 'https://some-org.zoom.us/meeting/register/abcdef-1234567890',
  },
};

export const Teams = {
  render: Template,
  args: {
    link: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MzliMDhmNDUtZjAwNS00NjQ5LWJkYzMtNTE2NTNhOTY0ZTAw%40thread.v2/0?}context=%7b%22Tid%22%3a%229c5012c9-b616-44c2-a917-66814fbe3e87%22%2c%22Oid%22%3a%22ce849a55-9a39-48ec-a3a5-c2371bbc5c68%22%7d',
  },
};

export const GoogleMeet = {
  render: Template,
  args: {
    link: 'https://meet.google.com/abc-defg-hij',
  },
};

export const MozHubs = {
  render: Template,
  args: {
    link: 'https://hubs.mozilla.com/abcdefg/lorem-ipsum-sil-dor-amet/',
  },
};

export const MozHubsShort = {
  render: Template,
  args: {
    link: 'https://hub.link/abcdefg',
  },
};

export const MozHubsMozfest = {
  render: Template,
  args: {
    link: 'http://hubs.mozillafestival.org/abcdefg',
  },
};

export const MyHubs = {
  render: Template,
  args: {
    link: 'https://mozfest.myhubs.net/abcdef',
  },
};

export const SpatialChat = {
  render: Template,
  args: {
    link: 'https://spatial.chat/s/MozFest2021',
  },
};

export const Discord = {
  render: Template,
  args: {
    link: 'https://discord.gg/abcdef?event=123456',
  },
};

export const DiscordChannel = {
  render: Template,
  args: {
    link: 'https://discord.com/channels/12345/67890',
  },
};

export const AnchorFmEmbed = {
  render: Template,
  args: {
    link: 'https://anchor.fm/letsgetlitical/embed/episodes/}Google-tell-me-about-gender--AI--Do-the-gender-stereotypes-offline-replicate-themselves-online-featuring-Sapni-GK--Garnett-Achieng-Mozfest-e1d2ivd/a-a78hb45',
  },
};

export const CinnamonVideoEmbed = {
  render: Template,
  args: {
    link: 'https://cinnamon.video/embed?v=660791655456048824',
  },
};

export const CinnamonWatchPage = {
  render: Template,
  args: {
    link: 'https://cinnamon.video/watch?v=660791655456048824',
  },
};

export const Hyperaudio = {
  render: Template,
  args: {
    link: 'https://mozfest.hyper.audio/media/e27cea3f-9e26-4710-8ceb-63a92c37bc46',
  },
};

export const NoEmbed = {
  render: Template,
  args: {
    link: 'https://duck.com',
  },
};
