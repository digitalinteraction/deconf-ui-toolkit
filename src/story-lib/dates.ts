export const dates = {
  now: new Date(),
  past: new Date('1970-01-01T00:00:00.000Z'),
  future: new Date('2100-01-01T00:00:00.000Z'),
  addMinutes(original: Date, minutes: number, ...args: number[]): Date {
    const date = new Date(original)
    date.setMinutes(date.getMinutes() + minutes, ...args)
    return date
  },
  startOfDay(original: Date): Date {
    const date = new Date(original)
    date.setHours(0, 0, 0, 0)
    return date
  },
}
