import { SlotState } from './types';

const oneHour = 60 * 60 * 1000;

export function getSlotState(
  currentDate: Date,
  startDate: Date,
  endDate: Date
): SlotState {
  const now = currentDate.getTime();
  const start = startDate.getTime();
  const end = endDate.getTime();

  if (now < start && now > start - oneHour) return 'soon';

  if (now < start) return 'future';
  if (now > end) return 'past';

  return 'present';
}
