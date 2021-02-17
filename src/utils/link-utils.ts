function isDomain(url: URL, ...domains: string[]) {
  return domains.some(d => url.hostname.endsWith(d));
}

export interface ParsedEmbedLink {
  kind:
    | 'youtube-video'
    | 'youtube-channel'
    | 'zoom'
    | 'vimeo'
    | 'teams'
    | 'panopto';
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

  return null;
}
