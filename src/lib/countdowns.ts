export interface CountdownComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdown(
  currentDate: Date,
  targetDate: Date
): CountdownComponents {
  let remaining = targetDate.getTime() - currentDate.getTime();

  // Remaining hours
  const hours = Math.floor(remaining / 3600000);
  remaining = remaining - hours * 3600000;

  // Remaining minutes
  const minutes = Math.floor(remaining / 60000);
  remaining = remaining - minutes * 60000;

  // Remaining seconds
  const seconds = Math.floor(remaining / 1000);
  remaining = remaining - seconds * 1000;

  return { hours, minutes, seconds };
}

export function getCountdownMessage(
  { hours, minutes, seconds }: CountdownComponents,
  tc: (key: string, value: number) => string,
  seperator = ' '
) {
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
