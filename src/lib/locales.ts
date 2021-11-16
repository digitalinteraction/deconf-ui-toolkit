export interface LocaliseOptions {
  fallbacks?: string[];
}

export function localiseFromObject(
  locale: string,
  object: Record<string, string | undefined>,
  options: LocaliseOptions | undefined = {}
): string | null {
  for (const key of [locale, ...(options.fallbacks || ['en'])]) {
    const value = object[key];
    if (value) return value;
  }
  return null;
}
