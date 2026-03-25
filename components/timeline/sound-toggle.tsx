'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(20);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Build a 10-second brown-noise buffer (loops seamlessly)
  const buildBuffer = useCallback((ctx: AudioContext) => {
    const seconds = 10;
    const length = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (last + 0.02 * white) / 1.02;
      last = data[i];
      data[i] *= 3.5;
    }
    return buffer;
  }, []);

  const startAudio = useCallback(async (vol: number) => {
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') await ctx.resume();
    audioCtxRef.current = ctx;

    // Low-pass filter → warmth / distant ambience
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 0.5;

    // Gain
    const gain = ctx.createGain();
    gain.gain.value = vol / 1200;
    gainRef.current = gain;

    // Source
    const source = ctx.createBufferSource();
    source.buffer = buildBuffer(ctx);
    source.loop = true;
    sourceRef.current = source;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }, [buildBuffer]);

  const stopAudio = useCallback(() => {
    try { sourceRef.current?.stop(); } catch (_) {}
    sourceRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    gainRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopAudio(), [stopAudio]);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleButtonClick = async () => {
    if (!isPlaying) {
      await startAudio(volume);
      setIsPlaying(true);
      setShowPanel(true);
    } else {
      setShowPanel((v) => !v);
    }
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    if (gainRef.current) {
      gainRef.current.gain.value = val / 1200;
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      setShowPanel(false);
    } else {
      startAudio(volume);
      setIsPlaying(true);
    }
  };

  return (
    <div ref={panelRef} className="relative">
      {/* Volume panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 right-0 bg-zinc-900/98 border border-white/20 rounded-xl shadow-2xl shadow-black/60 p-4 w-52"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                Ambient Sound
              </span>
              <button
                onClick={handleTogglePlay}
                className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Stop sound' : 'Play sound'}
              >
                {isPlaying ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="4" height="12" rx="1" />
                    <rect x="14" y="6" width="4" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Volume row */}
            <div className="flex items-center gap-2">
              {/* Mute icon */}
              <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>

              {/* Slider */}
              <div className="relative flex-1 h-5 flex items-center">
                <div className="absolute inset-x-0 h-1 rounded-full bg-white/15" />
                <div
                  className="absolute left-0 h-1 rounded-full bg-white/70"
                  style={{ width: `${volume}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  aria-label="Volume"
                />
                {/* Thumb dot */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-white shadow-md pointer-events-none"
                  style={{ left: `calc(${volume}% - 6px)` }}
                />
              </div>

              {/* Max icon */}
              <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>

            {/* Volume % */}
            <p className="text-right text-xs text-white/30 mt-2 tabular-nums">{volume}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={handleButtonClick}
        className="w-12 h-12 rounded-full bg-zinc-900/95 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-white hover:scale-105 transition-all cursor-pointer shadow-lg shadow-black/50"
        aria-label={isPlaying ? 'Sound controls' : 'Play ambient sound'}
        title={isPlaying ? 'Sound controls' : 'Play ambient sound'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#8b1a1a] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          ) : (
            <motion.div key="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
