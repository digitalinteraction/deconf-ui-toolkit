export function localiseFromObject(
  locale: string,
  object: Record<string, string | undefined>
): string | null {
  for (const key of [locale, 'en']) {
    const value = object[key];
    if (value) return value;
  }
  return null;
}
