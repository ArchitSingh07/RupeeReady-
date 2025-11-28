import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create particle trail
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles(prev => [...prev.slice(-8), newParticle]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Particle trail */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4,
            height: 4,
            background: `radial-gradient(circle, rgba(6, 182, 212, ${0.6 - index * 0.07}), transparent)`,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <motion.div
          className="w-6 h-6 rounded-full"
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.8), rgba(236, 72, 153, 0.3), transparent)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0.2), transparent)',
          }}
          animate={{
            scale: isHovering ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: isHovering ? Infinity : 0,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: isHovering ? 'rgba(236, 72, 153, 0.5)' : 'rgba(6, 182, 212, 0.3)',
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: 360,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }
          }}
        />
      </motion.div>
    </>
  );
}
