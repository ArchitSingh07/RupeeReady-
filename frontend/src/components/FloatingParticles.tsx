import { motion } from 'motion/react';

interface FloatingParticlesProps {
  count?: number;
  color?: 'teal' | 'orange' | 'mixed';
}

export function FloatingParticles({ count = 20, color = 'mixed' }: FloatingParticlesProps) {
  const particles = Array.from({ length: count });

  const getColor = (index: number) => {
    if (color === 'teal') return 'rgba(0, 128, 128, 0.1)';
    if (color === 'orange') return 'rgba(255, 153, 51, 0.1)';
    return index % 2 === 0 ? 'rgba(0, 128, 128, 0.1)' : 'rgba(255, 153, 51, 0.1)';
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = 4 + Math.random() * 8;
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: getColor(i),
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
