'use client';

import { useRef, MouseEvent as ReactMouseEvent } from 'react';

export function useTilt(intensity = 15) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    
    // Normalize x and y to range -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg)`;
    // Desloca o sheen de reflexo junto
    el.style.setProperty('--sheen-x', `${(x + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    el.style.transition = 'transform 400ms ease-out';
  };

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    // Remove the transition when moving so it feels instant and responsive
    el.style.transition = 'none';
  };

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onMouseEnter: handleMouseEnter };
}
