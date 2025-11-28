import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CelebrationAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  goalName?: string;
}

export function CelebrationAnimation({ isVisible, onClose, goalName = "Your Goal" }: CelebrationAnimationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#fbbf24', '#ec4899', '#06b6d4', '#8b5cf6'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);

      // Auto-close after 5 seconds
      const timeout = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti */}
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${piece.x}%`,
                backgroundColor: piece.color,
                top: '-10%',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: 360 * 3,
              }}
              transition={{
                duration: 3,
                delay: piece.delay,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Main celebration content */}
          <motion.div
            className="relative z-10 text-center px-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            {/* Glowing orbs */}
            <motion.div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Trophy/Star icon */}
            <motion.div
              className="mb-8"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <filter id="star-glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <motion.path
                  d="M 60 15 L 70 45 L 105 45 L 77 65 L 87 95 L 60 75 L 33 95 L 43 65 L 15 45 L 50 45 Z"
                  fill="url(#star-gradient)"
                  filter="url(#star-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Inner sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={60 + Math.cos((i * Math.PI) / 4) * 40}
                    cy={60 + Math.sin((i * Math.PI) / 4) * 40}
                    r="3"
                    fill="white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-6xl mb-4 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Congratulations!
              </h1>
              <p className="text-2xl text-cyan-100 mb-2">You achieved</p>
              <p className="text-3xl text-white mb-8">{goalName}</p>
              
              <motion.div
                className="flex items-center justify-center gap-4 text-sm text-cyan-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>🎉</span>
                <span>Amazing work!</span>
                <span>🎉</span>
              </motion.div>
            </motion.div>

            {/* Fin-Trio dancing */}
            <motion.div
              className="flex justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {['Pip', 'Glim', 'Flow'].map((character, i) => (
                <motion.div
                  key={character}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-4xl">
                    {i === 0 ? '🤓' : i === 1 ? '🛡️' : '⭐'}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Skip text */}
          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-cyan-300/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
