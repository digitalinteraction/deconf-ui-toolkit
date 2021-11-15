/**
 * Interpolate between two values
 */
export function lerp(v0: number, v1: number, factor: number): number {
  return (1 - factor) * v0 + factor * v1;
}

/**
 * Given a number of samples at a given rate,
 * work out how many samples would needed at a new rate
 */
export function getResampledLength(
  inputLength: number,
  inputRate: number,
  outputRate: number
): number {
  return Math.round((outputRate * inputLength) / inputRate);
}

interface ArrayLike<T> {
  readonly length: number;
  [n: number]: T;
}

export function linearResample<T extends ArrayLike<number>>(from: T, to: T): T {
  for (let i = 0; i < to.length; i++) {
    const pivot = (i * from.length) / to.length;

    const j0 = Math.floor(pivot);
    const ratio = pivot - j0;

    const j1 = Math.min(from.length - 1, j0 + 1);

    to[i] = lerp(from[j0], from[j1], ratio);
  }
  return to;
}

export function nearestNeighbourResample<T extends ArrayLike<number>>(
  from: T,
  to: T
): T {
  for (let i = 0; i < to.length; i++) {
    const j = Math.floor((i * from.length) / to.length);
    to[i] = from[j];
  }
  return to;
}

const MAX_FACTOR = 2 ** 15;

/** Convert a Float32Array array into an Int16Array array */
export function float32ToInt16(float32s: Float32Array): Int16Array {
  const output = new Int16Array(float32s.length);

  for (let i = 0; i < output.length; i++) {
    output[i] = Math.trunc(float32s[i] * (MAX_FACTOR * 0.5));
  }

  return output;
}

/** Convert a Int16Array array into an Float32Array array */
export function int16ToFloat32(int16s: Int16Array): Float32Array {
  const output = new Float32Array(int16s.length);

  for (let i = 0; i < output.length; i++) {
    output[i] = int16s[i] / MAX_FACTOR;
  }

  return output;
}
