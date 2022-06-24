export function stripMarkdown(input: string) {
  return input
    .replaceAll(/\*\*(.*?)\*\*/g, (_, match) => match)
    .replaceAll(/\[(.+?)\]\(.+?\)/g, (_, match) => match)
    .replaceAll(/_(.*?)_/g, (_, match) => match)
    .replaceAll(/_(.*?)_/g, (_, match) => match)
    .replaceAll(/~~(.*?)~~/g, (_, match) => match)
    .replaceAll(/`(.*?)`/g, (_, match) => match)
    .replaceAll(/#{1,6}\s+/gm, '')
    .replaceAll(/<.+?>/g, '');
}
