/** Work out the start of the day */
export function startOfDay(input: Date): Date {
  const d = new Date(input);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Whether two dates are on the same day */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Get a friendly date string in the current locale */
export function friendlyDate(date: Date): string {
  return date.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
