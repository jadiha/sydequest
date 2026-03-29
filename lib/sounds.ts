/**
 * Synthesize a paper-crumple sound using Web Audio API.
 * Multiple filtered noise bursts at staggered timings approximate
 * the irregular high-frequency texture of crinkling paper.
 */
export function playCrumple() {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const rate = ctx.sampleRate;

  function burst(startTime: number, length: number, freq: number, gain: number) {
    const buf = ctx.createBuffer(1, Math.ceil(rate * length), rate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;

    // Bandpass to shape noise into papery crinkle frequencies
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = freq;
    bpf.Q.value = 1.8;

    // High-pass to cut low rumble
    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 700;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gain, startTime + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + length);

    src.connect(hpf);
    hpf.connect(bpf);
    bpf.connect(g);
    g.connect(ctx.destination);

    src.start(startTime);
    src.stop(startTime + length);
  }

  const t = ctx.currentTime;
  // Layered bursts that follow the crumple arc (~1 second)
  burst(t + 0.00, 0.65, 3200, 0.55);
  burst(t + 0.08, 0.55, 2000, 0.45);
  burst(t + 0.18, 0.50, 4100, 0.40);
  burst(t + 0.30, 0.45, 2600, 0.50);
  burst(t + 0.42, 0.38, 1800, 0.35);
  burst(t + 0.55, 0.32, 3600, 0.30);
  burst(t + 0.65, 0.25, 2200, 0.20);
}
