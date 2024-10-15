// A function

interface Callback<T extends unknown[]> {
  (...args: T): void;
}

export interface Debounced<T extends unknown[]> extends Callback<T> {
  cancel(): void;
}

export function debounce<T extends unknown[]>(
  interval: number,
  callback: Callback<T>,
): Debounced<T> {
  let timerId: number | null;

  const cancel = () => {
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  };

  const invoke: Callback<T> = (...args) => {
    cancel();
    timerId = window.setTimeout(() => callback(...args), interval);
  };

  return Object.assign(invoke, { cancel });
}
