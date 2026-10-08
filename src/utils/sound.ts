// Web Audio API Synthesizer - Royal Palace Acoustic Resonance
let audioCtx: AudioContext | null = null;
let isAudioActive = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Royal Palace Golden Chime with Oud / Harp harmonic overtones
export const playRoyalChime = (freq = 440, duration = 2.4) => {
  if (!isAudioActive) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const fundamental = ctx.createOscillator();
    const overtone1 = ctx.createOscillator();
    const overtone2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Fundamental warm resonance
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm second harmonic (octave)
    overtone1.type = 'triangle';
    overtone1.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

    // Golden sparkle harmonic
    overtone2.type = 'sine';
    overtone2.frequency.setValueAtTime(freq * 2.01, ctx.currentTime);

    // Exponential gentle decay envelope
    gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    fundamental.connect(gainNode);
    overtone1.connect(gainNode);
    overtone2.connect(gainNode);
    gainNode.connect(ctx.destination);

    fundamental.start();
    overtone1.start();
    overtone2.start();

    fundamental.stop(ctx.currentTime + duration);
    overtone1.stop(ctx.currentTime + duration);
    overtone2.stop(ctx.currentTime + duration);
  } catch {
    // Audio errors ignored gracefully
  }
};

// Royal Vault Unlocking Sound
export const playVaultClick = () => {
  if (!isAudioActive) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // ignore
  }
};

// Grand Palace Royal Fanfare Chord (Majestic Arabian Scale D-Major 9th)
export const playCelestialChord = () => {
  if (!isAudioActive) return;
  const royalNotes = [293.66, 369.99, 440.0, 554.37, 659.25]; // D, F#, A, C#, E
  royalNotes.forEach((freq, idx) => {
    setTimeout(() => {
      playRoyalChime(freq, 2.8);
    }, idx * 160);
  });
};

export const playChime = (freq = 580) => {
  playRoyalChime(freq, 1.8);
};

export const toggleGlobalAudio = (active: boolean) => {
  isAudioActive = active;
  if (active) {
    const ctx = getAudioContext();
    if (ctx) {
      playCelestialChord();
    }
  }
  return isAudioActive;
};

export const isSoundEnabled = () => isAudioActive;
