export interface CountdownComponents {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function getCountdown(
  currentDate: Date,
  targetDate: Date
): CountdownComponents {
  let remaining = targetDate.getTime() - currentDate.getTime();

  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  // Remaining days
  const days = Math.floor(remaining / MS_PER_DAY);
  remaining = remaining - days * MS_PER_DAY;

  // Remaining hours
  const hours = Math.floor(remaining / MS_PER_HOUR);
  remaining = remaining - hours * MS_PER_HOUR;

  // Remaining minutes
  const minutes = Math.floor(remaining / MS_PER_MINUTE);
  remaining = remaining - minutes * MS_PER_MINUTE;

  // Remaining seconds
  const seconds = Math.floor(remaining / MS_PER_SECOND);
  remaining = remaining - seconds * MS_PER_SECOND;

  return { days, hours, minutes, seconds };
}

export function getCountdownMessage(
  { days, hours, minutes, seconds }: CountdownComponents,
  tc: (key: string, value: number) => string,
  seperator = ' '
): string {
  const convert = (value: number, unit: string) => {
    if (!value) return null;
    return `${value} ${tc(`deconf.general.${unit}`, value)}`;
  };

  return [
    convert(days, 'days'),
    convert(hours, 'hours'),
    convert(minutes, 'minutes'),
    convert(seconds, 'seconds'),
  ]
    .filter((str) => Boolean(str))
    .join(seperator);
}
