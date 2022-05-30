import { getAudioContext } from './audio-context';
import { int16ToFloat32, linearResample, getResampledLength } from './resample';

export enum ReceiverState {
  inactive = 'inactive',
  buffering = 'buffering',
  playing = 'playing',
}

export interface ReceiverRawStats {
  input: {
    byteLength: number;
    sampleRate: number;
  };
  output: {
    byteLength: number;
    sampleRate: number;
  };
}

export interface ReceiverOnChange {
  state: ReceiverState;
  bufferSize: number;
  rawStats: ReceiverRawStats | null;
}

export interface AudioReceiverOptions {
  playbackRate: number;
  audioLowLevel: number;
  audioHighLevel: number;
  onChange(data: ReceiverOnChange): void;
  onDebug(...args: unknown[]): void;
}

interface InternalBuffer {
  index: number;
  buffer: AudioBuffer;
}

export interface ReceiverDataPacket {
  arrayBuffer: ArrayBuffer;
  sampleRate: number;
}

export class AudioReceiver {
  static isSupported(): boolean {
    return Boolean(getAudioContext());
  }

  private ctx: null | AudioContext = null;
  private buffers: InternalBuffer[] = [];
  private nextPacket = 1;

  private state = ReceiverState.inactive;
  private rawStats: null | ReceiverRawStats = null;

  getState(): ReceiverState {
    return this.state;
  }
  getStats(): ReceiverRawStats | { state: ReceiverState } {
    return {
      state: this.state,
      ...this.rawStats,
    };
  }
  emitChange(): void {
    this.options.onChange({
      state: this.state,
      bufferSize: this.buffers.length,
      rawStats: this.rawStats,
    });
  }

  constructor(public options: AudioReceiverOptions) {}

  open(): void {
    const AudioContext = getAudioContext() as typeof window.AudioContext;
    this.ctx = new AudioContext({
      sampleRate: this.options.playbackRate,
    });

    this.buffers = [];
    this.nextPacket = 1;

    this.state = ReceiverState.inactive;
    this.rawStats = null;

    this.emitChange();
  }

  close(): void {
    this.buffers = [];
    this.state = ReceiverState.inactive;
    this.rawStats = null;

    if (this.ctx) this.ctx.close();
    this.ctx = null;

    this.emitChange();
  }

  playOrBuffer(): void {
    this.state = ReceiverState.buffering;

    if (this.buffers.length > this.options.audioLowLevel) {
      this.state = ReceiverState.playing;
      this.unqueueBuffer();
    } else {
      this.emitChange();
    }
  }
  stop(): void {
    this.state = ReceiverState.inactive;
  }

  pushData({ arrayBuffer, sampleRate }: ReceiverDataPacket): void {
    if (!this.ctx) return;

    // Confert int16 transport arrays to float32 audio arrays
    const inputFloats = int16ToFloat32(new Int16Array(arrayBuffer));

    // Work out how long the resampled array needs to be
    const targetLength = getResampledLength(
      inputFloats.length,
      sampleRate,
      this.options.playbackRate
    );

    this.options.onDebug(
      'AudioReceiver#push intLength=%d floatsLength=%d inputRate=%d outputRate=%d',
      arrayBuffer.byteLength,
      inputFloats.buffer.byteLength,
      sampleRate,
      this.options.playbackRate
    );

    // Create an audio buffer to put the resampled audio into
    const audioBuffer = this.ctx.createBuffer(
      1,
      targetLength,
      this.options.playbackRate
    );
    const outputFloats = audioBuffer.getChannelData(0);

    // Resample the audio into the buffer
    linearResample(inputFloats, outputFloats);

    // Store the buffer to play later
    this.buffers.push({
      index: this.nextPacket++,
      buffer: audioBuffer,
    });

    // Update our stats
    this.rawStats = {
      input: {
        byteLength: arrayBuffer.byteLength,
        sampleRate: sampleRate,
      },
      output: {
        byteLength: outputFloats.buffer.byteLength,
        sampleRate: this.options.playbackRate,
      },
    };

    this.emitChange();
  }
  unqueueBuffer(): void {
    // Do nothing if we're inactive
    if (this.state === ReceiverState.inactive || !this.ctx) return;

    // If we're out of data, enter the buffering state
    if (this.buffers.length === 0) {
      this.state = ReceiverState.buffering;
      return;
    }

    // If we aren't in the playing state, stop here
    if (this.state !== ReceiverState.playing) return;

    // If we're playing and run out of data, start buffering again
    if (this.state === ReceiverState.playing && this.buffers.length < 1) {
      this.state = ReceiverState.buffering;
      return;
    }

    // Get the next and remaining buffers to play
    // also removing any packets over the "high" level to maintain liveness
    const [next, ...remaining] = this.buffers.slice(
      -this.options.audioHighLevel
    );
    this.buffers = remaining;

    // Create a source to play the audio
    const source = this.ctx.createBufferSource();
    source.buffer = next.buffer;
    source.connect(this.ctx.destination);

    // When the source finishes, play another
    source.onended = () => {
      this.options.onDebug('AudioReceiver source@ended packet=%d', next.index);
      source.disconnect();
      this.unqueueBuffer();
    };

    // Start playing the audio
    source.start();

    // Notify changes
    this.emitChange();
  }
}

//
// Deprecated typo naming
//

/** @deprecated use AudioReceiver */
export const AudioReciever = AudioReceiver;

/** @deprecated use AudioReceiver */
export type AudioReciever = AudioReceiver;

/** @deprecated use AudioReceiver */
export const RecieverState = ReceiverState;

/** @deprecated use AudioReceiver */
export type RecieverState = ReceiverState;
