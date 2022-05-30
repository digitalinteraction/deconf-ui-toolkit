interface WKAudioContext {
  webkitAudioContext?: AudioContext;
}

export function getAudioContext(): typeof AudioContext | null {
  return (
    window.AudioContext || (window as WKAudioContext).webkitAudioContext || null
  );
}
