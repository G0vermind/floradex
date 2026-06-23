import { easing } from './animation';

export const cardVariants = {
  rest: {
    y: 0, scale: 1,
    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
    transition: { duration: 0.2, ease: easing.mechanical }
  },
  hover: {
    y: -4, scale: 1.02,
    boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
    transition: { duration: 0.2, ease: easing.mechanical }
  },
  tap: {
    y: 2, scale: 0.98,
    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    transition: { duration: 0.08, ease: easing.metalDrop }
  },
};

export const modalVariants = {
  hidden:  { opacity: 0, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.28, ease: easing.surfaceReveal }
  },
  exit:    { opacity: 0, scale: 0.97, y: 8,
    transition: { duration: 0.18, ease: easing.surfaceRetract }
  },
};

export const glowPulseVariants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale:   [1, 1.05, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity }
  }
};

export const sheenVariants = {
  rest:  { backgroundPosition: '-200% 0' },
  hover: { backgroundPosition: '200% 0',
    transition: { duration: 0.4, ease: easing.mechanical }
  },
};

export const shakeVariants = {
  animate: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.5, ease: easing.mechanical }
  }
};
