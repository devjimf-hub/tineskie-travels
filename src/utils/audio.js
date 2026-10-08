// Web Audio API generator for ambient nature & ocean breeze
let audioCtx = null;
let gainNode = null;
let noiseNode = null;
let isPlaying = false;

export function toggleAmbientSound(onStateChange) {
  if (isPlaying) {
    stopAmbientSound();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientSound();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Create pink noise buffer for soothing forest wind / ocean ambient
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // low volume
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter to simulate warm forest wind / soft breeze
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    // Filter LFO for gentle wave rise & fall
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.15; // 0.15 Hz slow breathing swell
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 2);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    isPlaying = true;
  } catch (err) {
    console.warn("Ambient audio context error:", err);
  }
}

export function stopAmbientSound() {
  if (gainNode && audioCtx) {
    try {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      setTimeout(() => {
        if (noiseNode) {
          noiseNode.stop();
          noiseNode.disconnect();
          noiseNode = null;
        }
      }, 1000);
    } catch (e) {
      // ignore
    }
  }
  isPlaying = false;
}
