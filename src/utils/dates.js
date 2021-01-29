export const dates = {
  now: new Date(),
  past: new Date('1970-01-01T00:00:00.000Z'),
  future: new Date('2100-01-01T00:00:00.000Z'),
  addMinutes(original, minutes, ...args) {
    const date = new Date(original);
    date.setMinutes(date.getMinutes() + minutes, ...args);
    return date;
  }
};
