import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/5 via-transparent to-orange-500/5" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating rupee symbols */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-teal-600/10"
          style={{
            left: `${(i * 15) % 100}%`,
            top: `${(i * 25) % 100}%`,
            fontSize: `${40 + (i * 10)}px`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          ₹
        </motion.div>
      ))}

      {/* Geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute w-20 h-20 ${
            i % 2 === 0 
              ? 'border-2 border-orange-500/20 rounded-lg' 
              : 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full'
          }`}
          style={{
            left: `${10 + (i * 18) % 90}%`,
            top: `${20 + (i * 15) % 80}%`,
          }}
          animate={{
            rotate: [0, i % 2 === 0 ? 360 : -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
