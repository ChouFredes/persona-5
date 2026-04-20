import { motion } from 'framer-motion';

export function RouteTransition() {
  return (
    <motion.div
      className="route-transition"
      initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
      animate={{
        clipPath: [
          'polygon(0 0, 0 0, 0 100%, 0 100%)',
          'polygon(0 0, 100% 0, 84% 100%, 0 100%)',
          'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        ],
      }}
      exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      transition={{ duration: 0.55, times: [0, 0.55, 1], ease: 'easeInOut' }}
    >
      <div className="route-transition-layer red" />
      <div className="route-transition-layer black" />
      <div className="route-transition-layer white" />
    </motion.div>
  );
}
