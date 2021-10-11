// TODO: rethink the "fallback" option
// - for sessions the fallback should be the host language, not just "en"
// - other things should fall back to "en"
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
