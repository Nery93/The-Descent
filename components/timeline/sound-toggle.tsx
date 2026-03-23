'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create and setup audio
  useEffect(() => {
    // Using a free ambient sound from a CDN
    // You can replace this URL with any ambient audio file
    audioRef.current = new Audio(
      'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3'
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    audioRef.current.preload = 'auto';
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeVolume = (targetVolume: number, duration: number) => {
    if (!audioRef.current) return;
    
    const startVolume = audioRef.current.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      if (audioRef.current) {
        audioRef.current.volume = startVolume + volumeDiff * eased;
      }

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        if (targetVolume === 0 && audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, stepDuration);
  };

  const toggleSound = async () => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      fadeVolume(0, 2000);
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        fadeVolume(0.08, 2000); // Max 8% volume
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio playback blocked by browser:', error);
      }
    }
  };

  return (
    <motion.button
      onClick={toggleSound}
      disabled={!isLoaded}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-zinc-900/95 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-white hover:scale-105 transition-all cursor-pointer shadow-lg shadow-black/50 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      title={isPlaying ? 'Mute' : 'Play ambient sound'}
    >
      {/* Sound wave animation when playing */}
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
            {/* Pulsing indicator */}
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#8b1a1a] rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
