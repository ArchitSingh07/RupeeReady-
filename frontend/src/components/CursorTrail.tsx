import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Trail {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        id: nextId,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);
      setNextId((prev) => prev + 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [nextId]);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-5));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
            initial={{
              x: trail.x - 4,
              y: trail.y - 4,
              scale: 1,
              opacity: 0.6,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            style={{
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
