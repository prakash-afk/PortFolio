// ─────────────────────────────────────────────────────────
//  TACTILE SOUND SYNTHESIZER (Web Audio API)
//  Zero audio asset downloads, zero lag, muted by default
// ─────────────────────────────────────────────────────────

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      this.isMuted = saved !== 'true'; // Muted by default per user request
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', (!this.isMuted).toString());
      window.dispatchEvent(new CustomEvent('sound-state-change', { detail: { isMuted: this.isMuted } }));
    }
    if (!this.isMuted) {
      this.playPop(650, 0.05);
    }
    return !this.isMuted;
  }

  playPop(freq = 680, duration = 0.045) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + duration);

      gain.gain.setValueAtTime(0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + duration);
    } catch {}
  }

  playModalOpen() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.09);
    } catch {}
  }

  playModalClose() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.065);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.075);
    } catch {}
  }

  playSwitch() {
    this.playPop(820, 0.035);
  }
}

export const sound = new SoundManager();
