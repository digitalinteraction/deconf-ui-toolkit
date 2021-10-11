import { LocalisedLink } from '@openlab/deconf-shared';

function isDomain(url: URL, ...domains: string[]) {
  return domains.some(d => url.hostname.endsWith(d));
}

function splitPath(url: URL): string[] {
  return url.pathname.split(/\/+/).filter(p => p);
}

export interface PrimaryLink {
  kind:
    | 'youtube-video'
    | 'youtube-channel'
    | 'zoom'
    | 'vimeo'
    | 'teams'
    | 'panopto'
    | 'mozilla-hubs'
    | 'spatial-chat'
    | 'twitch';
  data: string;
}

/** @deprecated renamed to PrimaryLink */
export type ParsedEmbedLink = PrimaryLink;

export interface SecondaryLink {
  kind: 'vimeo-chat';
  data: string;
}

export function parsePrimaryLink(link: string): PrimaryLink | null {
  const url = new URL(link);
  const pathSegments = splitPath(url);

  const isYouTube = isDomain(url, 'youtube.com', 'youtube-nocookie.com');

  //
  // Actual embeds
  //
  if (isYouTube && url.searchParams.has('v')) {
    return {
      kind: 'youtube-video',
      data: url.searchParams.get('v') as string
    };
  }

  if (
    isYouTube &&
    url.pathname === '/embed/live_stream' &&
    url.searchParams.has('channel')
  ) {
    return {
      kind: 'youtube-channel',
      data: url.searchParams.get('channel') as string
    };
  }

  if (isDomain(url, 'youtu.be') && pathSegments.length === 1) {
    return {
      kind: 'youtube-video',
      data: pathSegments[0]
    };
  }

  if (
    isDomain(url, 'player.vimeo.com') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 'video'
  ) {
    return {
      kind: 'vimeo',
      data: pathSegments[1]
    };
  }

  // https://vimeo.com/123456
  if (isDomain(url, 'vimeo.com') && pathSegments.length === 1) {
    return {
      kind: 'vimeo',
      data: pathSegments[0]
    };
  }

  // https://vimeo.com/event/123456
  if (
    isDomain(url, 'vimeo.com') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 'event'
  ) {
    return {
      kind: 'vimeo',
      data: pathSegments[1]
    };
  }

  if (
    isDomain(url, 'hosted.panopto.com') &&
    url.pathname === '/Panopto/Pages/Embed.aspx' &&
    url.searchParams.has('id')
  ) {
    return {
      kind: 'panopto',
      data: url.toString()
    };
  }

  if (isDomain(url, 'twitch.tv') && pathSegments.length === 1) {
    return {
      kind: 'twitch',
      data: pathSegments[0]
    };
  }

  //
  // Links out
  //
  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/my/')) {
    return {
      kind: 'zoom',
      data: url.toString()
    };
  }

  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/j/')) {
    return {
      kind: 'zoom',
      data: url.toString()
    };
  }

  if (isDomain(url, 'teams.microsoft.com')) {
    return {
      kind: 'teams',
      data: url.toString()
    };
  }

  if (isDomain(url, 'hubs.mozilla.com') || isDomain(url, 'hub.link')) {
    return {
      kind: 'mozilla-hubs',
      data: url.toString()
    };
  }

  if (
    isDomain(url, 'spatial.chat') &&
    pathSegments.length === 2 &&
    pathSegments[0] === 's'
  ) {
    return {
      kind: 'spatial-chat',
      data: url.toString()
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
      data: pathSegments[1]
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
      kind: 'vimeo-chat',
      data: pathSegments[1]
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
  const result = links.filter(l => l.language === locale);

  // Add fallback languages afterwards, if different from the main language
  if (locale !== fallback) {
    result.push(...links.filter(l => l.language === fallback));
  }
  return result;
}
