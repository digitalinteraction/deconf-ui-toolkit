function isDomain(url: URL, ...domains: string[]) {
  return domains.some(d => url.hostname.endsWith(d));
}

function splitPath(url: URL): string[] {
  return url.pathname.split(/\/+/).filter(p => p);
}

export interface ParsedEmbedLink {
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

export function parseEmbedLink(link: string): ParsedEmbedLink | null {
  const url = new URL(link);

  const isYouTube = isDomain(url, 'youtube.com', 'youtube-nocookie.com');

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

  if (isDomain(url, 'youtu.be')) {
    return {
      kind: 'youtube-video',
      data: url.pathname.replace(/\//g, '')
    };
  }

  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/my/')) {
    return {
      kind: 'zoom',
      data: url.pathname.replace('/my/', '')
    };
  }

  if (isDomain(url, 'zoom.us') && url.pathname.startsWith('/j/')) {
    return {
      kind: 'zoom',
      data: url.pathname.replace('/k/', '')
    };
  }

  if (isDomain(url, 'teams.microsoft.com')) {
    return {
      kind: 'teams',
      data: url.toString()
    };
  }

  if (isDomain(url, 'player.vimeo.com') && url.pathname.startsWith('/video/')) {
    return {
      kind: 'vimeo',
      data: url.pathname.replace('/video/', '')
    };
  }

  if (isDomain(url, 'vimeo.com')) {
    const segments = splitPath(url);
    if (segments.length === 1) {
      return {
        kind: 'vimeo',
        data: segments[0]
      };
    }
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

  if (isDomain(url, 'twitch.tv')) {
    const [username] = splitPath(url);
    return {
      kind: 'twitch',
      data: username
    };
  }

  if (isDomain(url, 'hubs.mozilla.com') || isDomain(url, 'hub.link')) {
    return {
      kind: 'mozilla-hubs',
      data: url.toString()
    };
  }

  if (isDomain(url, 'spatial.chat') && url.pathname.startsWith('/s/')) {
    const [, id] = splitPath(url);
    return {
      kind: 'spatial-chat',
      data: id
    };
  }

  return null;
}
