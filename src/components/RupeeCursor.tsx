import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function RupeeCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Directly use clientX and clientY for instant, native cursor speed
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: position.x,
        y: position.y,
      }}
      // Remove any transition or animation that could slow down movement
      transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
    >
      {/* Elegant arrow cursor with rupee accent */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="cursor-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Arrow pointer */}
        <path
          d="M3 3 L3 17 L8 12 L11 19 L13 18 L10 11 L17 11 Z"
          fill={isClicking ? "#008080" : "#333333"}
          stroke="white"
          strokeWidth="0.5"
          filter="url(#cursor-shadow)"
        />

        {/* Subtle rupee accent on hover */}
        <motion.text
          x="18"
          y="8"
          fontSize="8"
          fill={isClicking ? "#FF9933" : "#008080"}
          fontWeight="bold"
          style={{ fontFamily: 'Arial, sans-serif' }}
          animate={{
            opacity: isClicking ? 1 : 0.6,
            scale: isClicking ? 1.1 : 1,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          ₹
        </motion.text>
      </svg>
    </motion.div>
  );
}