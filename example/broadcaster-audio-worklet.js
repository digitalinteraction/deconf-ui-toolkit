//
// An example AudioWorkletProcessor to take microphone audio samples,
// chunk them up and emit them to the parent process (the dom).
//

const BUFFER_SIZE = 128 * 128;

/**
 * Recieves 128 samples directly from the input source (the mic)
 * It chunks them up to reduce small message passing and socket payloads
 */
class BroadcasterProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bucket = [];
    this.buffer = new Float32Array(BUFFER_SIZE);
    this.insertIndex = 0;
  }

  /** @param {ArrayBuffer} arrayBuffer */
  postBuffer(arrayBuffer) {
    this.port.postMessage({ kind: 'ondata', arrayBuffer }, [arrayBuffer]);
    this.buffer = new Float32Array(BUFFER_SIZE);
    this.insertIndex = 0;
  }

  /** @param {Float32Array[][]} inputs */
  process(inputs) {
    if (!inputs[0][0]) return true;

    // Loop through each new sample
    for (let i = 0; i < inputs[0][0].length; i++) {
      this.insertIndex++;

      // If we've reached the end of our internal buffer, post it and restart
      if (this.insertIndex > this.buffer.length) {
        this.postBuffer(this.buffer.buffer);
      }

      // Put the sample into our local buffer
      this.buffer[this.insertIndex] = inputs[0][0][i];
    }

    return true;
  }
}

registerProcessor('broadcaster-processor', BroadcasterProcessor);
