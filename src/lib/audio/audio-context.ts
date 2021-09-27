// TODO: not exported
export function getAudioContext(): typeof AudioContext | null {
  return window.AudioContext || (window as any).webkitAudioContext || null;
}
