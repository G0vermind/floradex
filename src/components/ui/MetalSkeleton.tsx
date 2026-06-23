import React from 'react';

export const MetalSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`
    relative overflow-hidden rounded bg-slate-800 border border-slate-700
    after:absolute after:inset-0
    after:bg-linear-to-r after:from-transparent after:via-copper-700/10 after:to-transparent
    after:animate-shimmer
    ${className}
  `} />
);
