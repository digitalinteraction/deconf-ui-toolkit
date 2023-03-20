import { LocalisedLink } from '@openlab/deconf-shared';

function isDomain(url: URL, ...domains: string[]) {
  return domains.some((d) => url.hostname.endsWith(d));
}

function splitPath(url: URL): string[] {
  return url.pathname.split(/\/+/).filter((p) => p);
}

export interface PrimaryLink {
  kind:
    | 'youtube-video'
    | 'youtube-channel'
    | 'zoom'
    | 'zoom-register'
    | 'google-meet'
    | 'vimeo'
    | 'vimeo-event'
    | 'teams'
    | 'panopto'
    | 'mozilla-hubs'
    | 'spatial-chat'
    | 'twitch'
    | 'anchor-fm-embed'
    | 'cinnamon-video'
    | 'hyperaudio';
  data: string;
}

/** @deprecated renamed to PrimaryLink */
export type ParsedEmbedLink = PrimaryLink;

export interface SecondaryLink {
  kind: 'vimeo-chat' | 'vimeo-event-chat';
  data: string;
}

export function parsePrimaryLink(link: string): PrimaryLink | null {
  const url = new URL(link);
  const pathSegments = splitPath(url);

  const isYouTube = isDomain(url, 'youtube.com', 'youtube-nocookie.com');

  //
  // Actual embeds
  //

  // https://youtube.com?v=123456
  // https://youtube-nocookie.com?v=123456
  if (isYouTube && url.searchParams.has('v')) {
    return {
      kind: 'youtube-video',
      data: url.searchParams.get('v') as string,
    };
  }

  // https://youtube.com/embed/live_stream?channel=abcdef
  // https://youtube-nocookie.com/embed/live_stream?channel=abcdef
  if (
    isYouTube &&
    url.pathname === '/embed/live_stream' &&
    url.searchParams.has('channel')
  ) {
    return {
      kind: 'youtube-channel',
      data: url.searchParams.get('channel') as string,
    };
  }

  // https://youtu.be/abcdef
  if (isDomain(url, 'youtu.be') && pathSegments.length === 1) {
    return {
      kind: 'youtube-video',
      data: pathSegments[0],
    };
  }

  // https://player.vimeo.com/video/123456
  if (
    isDomain(url, 'player.vimeo.com') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 'video'
  ) {
    return {
      kind: 'vimeo',
      data: pathSegments[1],
    };
  }

  // https://vimeo.com/123456
  if (isDomain(url, 'vimeo.com') && pathSegments.length === 1) {
    return {
      kind: 'vimeo',
      data: pathSegments[0],
    };
  }

  // https://vimeo.com/event/123456
  if (
    isDomain(url, 'vimeo.com') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 'event'
  ) {
    return {
      kind: 'vimeo-event',
      data: pathSegments[1],
    };
  }

  // https://vimeo.com/event/123456/embed
  if (
    isDomain(url, 'vimeo.com') &&
    pathSegments.length === 3 &&
    pathSegments[0] === 'event' &&
    pathSegments[2] === 'embed'
  ) {
    return {
      kind: 'vimeo-event',
      data: pathSegments[1],
    };
  }

  // https://hosted.panopto.com/Panopto/Pages/Embed.aspx?id=123456
  if (
    isDomain(url, 'hosted.panopto.com') &&
    url.pathname === '/Panopto/Pages/Embed.aspx' &&
    url.searchParams.has('id')
  ) {
    return {
      kind: 'panopto',
      data: url.toString(),
    };
  }

  // https://twitch.tv/123456
  if (isDomain(url, 'twitch.tv') && pathSegments.length === 1) {
    return {
      kind: 'twitch',
      data: pathSegments[0],
    };
  }

  // https://anchor.fm/:username/embed/episodes/123456
  if (
    isDomain(url, 'anchor.fm') &&
    pathSegments[1] === 'embed' &&
    pathSegments[2] === 'episodes'
  ) {
    return {
      kind: 'anchor-fm-embed',
      data: url.toString(),
    };
  }

  //
  // Links out
  //
  // https://zoom.us/my/abcdef
  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/my/')) {
    return {
      kind: 'zoom',
      data: url.toString(),
    };
  }

  // https://zoom.us/j/123456789
  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/j/')) {
    return {
      kind: 'zoom',
      data: url.toString(),
    };
  }

  // https://some-org.zoom.us/meeting/register/abcdef-1234567890
  if (
    isDomain(url, 'zoom.us') &&
    url.pathname.startsWith('/meeting/register/')
  ) {
    return {
      kind: 'zoom-register',
      data: url.toString(),
    };
  }

  // https://meet.google.com/abc-defg-hij
  if (isDomain(url, 'meet.google.com')) {
    return {
      kind: 'google-meet',
      data: url.toString(),
    };
  }

  // https://teams.microsoft.com/*
  if (isDomain(url, 'teams.microsoft.com')) {
    return {
      kind: 'teams',
      data: url.toString(),
    };
  }

  if (
    isDomain(url, 'hubs.mozilla.com') ||
    isDomain(url, 'hub.link') ||
    isDomain(url, 'hubs.mozillafestival.org') ||
    isDomain(url, 'myhubs.net')
  ) {
    return {
      kind: 'mozilla-hubs',
      data: url.toString(),
    };
  }

  if (
    isDomain(url, 'spatial.chat') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 's'
  ) {
    return {
      kind: 'spatial-chat',
      data: url.toString(),
    };
  }

  // https://cinnamon.video/watch?v=660791655456048824
  // https://cinnamon.video/embed?v=660791655456048824
  if (
    isDomain(url, 'cinnamon.video') &&
    pathSegments.length === 1 &&
    ['watch', 'embed'].includes(pathSegments[0]) &&
    url.searchParams.has('v')
  ) {
    return {
      kind: 'cinnamon-video',
      data: url.searchParams.get('v') as string,
    };
  }

  // https://mozfest.hyper.audio/media/xxx ?embed
  if (
    isDomain(url, 'hyper.audio') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 'media'
  ) {
    return {
      kind: 'hyperaudio',
      data: pathSegments[1],
    };
  }

  return null;
}

/** @deprecated renamed to parsePrimaryLink */
export const parseEmbedLink = parsePrimaryLink;

export function parseSecondaryLink(link: string): SecondaryLink | null {
  const url = new URL(link);
  const pathSegments = splitPath(url);

  // https://vimeo.com/live-chat/123456/
  if (isDomain(url, 'vimeo.com') && pathSegments[0] === 'live-chat') {
    return {
      kind: 'vimeo-chat',
      data: pathSegments[1],
    };
  }

  // https://vimeo.com/event/123456/chat/interaction/
  if (
    isDomain(url, 'vimeo.com') &&
    pathSegments.length === 4 &&
    pathSegments[0] === 'event' &&
    pathSegments[2] === 'chat' &&
    pathSegments[3] === 'interaction'
  ) {
    return {
      kind: 'vimeo-event-chat',
      data: pathSegments[1],
    };
  }

  // https://vimeo.com/event/123456/chat/
  if (
    isDomain(url, 'vimeo.com') &&
    pathSegments.length === 3 &&
    pathSegments[0] === 'event' &&
    pathSegments[2] === 'chat'
  ) {
    return {
      kind: 'vimeo-event-chat',
      data: pathSegments[1],
    };
  }

  return null;
}

export function getLocaleLinks(
  links: LocalisedLink[],
  locale: string,
  fallback: string
): LocalisedLink[] {
  // First add the specific language links
  const result = links.filter((l) => l.language === locale);

  // Add fallback languages afterwards, if different from the main language
  if (locale !== fallback) {
    result.push(...links.filter((l) => l.language === fallback));
  }
  return result;
}
