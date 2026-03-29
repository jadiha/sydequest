/**
 * Synthesize a paper-crumple sound using Web Audio API.
 *
 * Real paper crumpling = hundreds of micro-transients (tiny crinkle snaps)
 * clustered together. We model this as:
 *  1. A crackle buffer: white noise raised to a high power, creating a signal
 *     that is mostly silent with random sharp spikes — like crinkle events.
 *  2. Shaped through a high-pass + gentle low-pass to sit in the paper range.
 *  3. An overall amplitude envelope that swells and fades over ~1 second.
 *  4. A handful of louder "crunch" transients layered on top.
 */
export function playCrumple() {
  if (typeof window === "undefined") return;
  const AudioCtx =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const rate = ctx.sampleRate;
  const duration = 1.1;
  const samples = Math.ceil(rate * duration);

  // ── 1. Crackle buffer ──────────────────────────────────────────────────────
  // Raise |noise| to the 6th power then restore sign → mostly silence, sharp
  // spikes randomly scattered. This mimics individual paper-fibre snap events.
  const crackleBuf = ctx.createBuffer(1, samples, rate);
  const cd = crackleBuf.getChannelData(0);
  for (let i = 0; i < samples; i++) {
    const n = Math.random() * 2 - 1;
    const spike = Math.pow(Math.abs(n), 6) * Math.sign(n);
    // Mild "clustering" via a second noise gate so crinkles come in bursts
    const gate = Math.random() > 0.55 ? 1 : 0;
    cd[i] = spike * gate * 6;
  }

  const crackle = ctx.createBufferSource();
  crackle.buffer = crackleBuf;

  // High-pass: remove low-end rumble (paper is trebly)
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 1200;

  // Shelf: boost upper mids for that crisp crinkle bite
  const shelf = ctx.createBiquadFilter();
  shelf.type = "peaking";
  shelf.frequency.value = 6000;
  shelf.gain.value = 8;
  shelf.Q.value = 0.8;

  // Master gain envelope — builds then decays
  const master = ctx.createGain();
  const t0 = ctx.currentTime;
  master.gain.setValueAtTime(0, t0);
  master.gain.linearRampToValueAtTime(0.7,  t0 + 0.06);
  master.gain.linearRampToValueAtTime(0.9,  t0 + 0.22);
  master.gain.linearRampToValueAtTime(0.55, t0 + 0.55);
  master.gain.linearRampToValueAtTime(0.2,  t0 + 0.80);
  master.gain.linearRampToValueAtTime(0,    t0 + duration);

  crackle.connect(hpf);
  hpf.connect(shelf);
  shelf.connect(master);
  master.connect(ctx.destination);
  crackle.start(t0);
  crackle.stop(t0 + duration);

  // ── 2. Crunch transients ───────────────────────────────────────────────────
  // A few louder, slightly lower-pitched bursts for the "big crunch" moments.
  const crunchTimes = [0.0, 0.12, 0.28, 0.46, 0.62];
  crunchTimes.forEach((offset) => {
    const len = 0.06 + Math.random() * 0.06;
    const buf = ctx.createBuffer(1, Math.ceil(rate * len), rate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      const n = Math.random() * 2 - 1;
      d[i] = Math.pow(Math.abs(n), 3) * Math.sign(n) * 3;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = 2500 + Math.random() * 2000;
    bpf.Q.value = 1.2;

    const g = ctx.createGain();
    const tStart = t0 + offset;
    g.gain.setValueAtTime(0, tStart);
    g.gain.linearRampToValueAtTime(0.45, tStart + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, tStart + len);

    src.connect(bpf);
    bpf.connect(g);
    g.connect(ctx.destination);
    src.start(tStart);
    src.stop(tStart + len);
  });
}
