'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-md"
    >
      <div className="relative">
        {/* Animated rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 -m-8 border-2 border-yellow-400/30 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 -m-16 border-2 border-yellow-400/20 rounded-full"
        />

        {/* Bouncing Logo */}
        <motion.div
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <img 
            src="/logo.png" 
            alt="Loading..." 
            className="h-[200px] w-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Shadow */}
        <motion.div
          animate={{
            scale: [1, 0.6, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-4 bg-black/10 dark:bg-white/10 blur-md rounded-full mx-auto mt-8"
        />
      </div>
    </motion.div>
  );
}
