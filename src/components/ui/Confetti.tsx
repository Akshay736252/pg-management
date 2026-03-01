// src/components/ui/Confetti.tsx
"use client";

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface Props {
  active: boolean;
  duration?: number;
}

export default function ConfettiCelebration({ active, duration = 5000 }: Props) {
  const [show, setShow] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!show) return null;

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.3}
      colors={['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#a855f7']}
    />
  );
}