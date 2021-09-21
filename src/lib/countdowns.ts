export interface CountdownComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

const MS_PER_SECOND = 60 * 1000;
const MS_PER_MINUTE = 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 60 * 1000;

export function getCountdown(
  currentDate: Date,
  targetDate: Date
): CountdownComponents {
  let remaining = targetDate.getTime() - currentDate.getTime();

  // Remaining days
  // TODO:
  // const days = Math.floor(remaining / MS_PER_DAY);
  // remaining = remaining - days * MS_PER_DAY;

  // Remaining hours
  const hours = Math.floor(remaining / MS_PER_HOUR);
  remaining = remaining - hours * MS_PER_HOUR;

  // Remaining minutes
  const minutes = Math.floor(remaining / MS_PER_MINUTE);
  remaining = remaining - minutes * MS_PER_MINUTE;

  // Remaining seconds
  const seconds = Math.floor(remaining / MS_PER_SECOND);
  remaining = remaining - seconds * MS_PER_SECOND;

  return { hours, minutes, seconds };
}

export function getCountdownMessage(
  { hours, minutes, seconds }: CountdownComponents,
  tc: (key: string, value: number) => string,
  seperator = ' '
): string {
  const convert = (value: number, unit: string) => {
    if (!value) return null;
    return `${value} ${tc(`deconf.general.${unit}`, value)}`;
  };

  return [
    convert(hours, 'hours'),
    convert(minutes, 'minutes'),
    convert(seconds, 'seconds')
  ]
    .filter(str => Boolean(str))
    .join(seperator);
}
