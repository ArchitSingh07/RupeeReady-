import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Mood = 'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'neutral';

interface AICompanionProps {
  mood?: Mood;
  message?: string;
  position?: 'fixed' | 'inline';
}

export function AICompanion({ mood = 'neutral', message, position = 'fixed' }: AICompanionProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setEyePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return ['from-yellow-400', 'to-orange-400'];
      case 'thinking': return ['from-blue-400', 'to-purple-400'];
      case 'concerned': return ['from-orange-400', 'to-red-400'];
      case 'celebrating': return ['from-green-400', 'to-emerald-400'];
      case 'curious': return ['from-cyan-400', 'to-blue-400'];
      default: return ['from-blue-400', 'to-teal-400'];
    }
  };

  const [fromColor, toColor] = getMoodColor();

  return (
    <div className={position === 'fixed' ? 'fixed bottom-8 right-8 z-50' : 'relative'}>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full right-0 mb-4 max-w-xs"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 relative">
            <p className="text-sm">{message}</p>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45" />
          </div>
        </motion.div>
      )}
      
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          {/* Main orb body with gradient */}
          <defs>
            <linearGradient id={`gradient-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={fromColor.replace('from-', 'text-')} stopColor="currentColor" />
              <stop offset="100%" className={toColor.replace('to-', 'text-')} stopColor="currentColor" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <motion.circle
            cx="40"
            cy="40"
            r="30"
            fill={`url(#gradient-${mood})`}
            filter="url(#glow)"
            animate={{
              scale: mood === 'celebrating' ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: mood === 'celebrating' ? Infinity : 0,
            }}
          />
          
          {/* Eyes */}
          <motion.g
            animate={{
              x: eyePosition.x,
              y: eyePosition.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Left eye */}
            <motion.ellipse
              cx="30"
              cy="35"
              rx="3"
              ry={isBlinking ? 0.5 : 6}
              fill="white"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
            />
            <motion.circle
              cx="30"
              cy="35"
              r="2"
              fill="#1f2937"
              animate={{
                opacity: isBlinking ? 0 : 1,
              }}
            />
            
            {/* Right eye */}
            <motion.ellipse
              cx="50"
              cy="35"
              rx="3"
              ry={isBlinking ? 0.5 : 6}
              fill="white"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
            />
            <motion.circle
              cx="50"
              cy="35"
              r="2"
              fill="#1f2937"
              animate={{
                opacity: isBlinking ? 0 : 1,
              }}
            />
          </motion.g>
          
          {/* Mouth - changes based on mood */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <motion.path
              d="M 28 48 Q 40 56 52 48"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : mood === 'concerned' ? (
            <motion.path
              d="M 28 52 Q 40 46 52 52"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : mood === 'thinking' ? (
            <motion.circle
              cx="40"
              cy="50"
              r="2"
              fill="white"
            />
          ) : (
            <motion.line
              x1="32"
              y1="50"
              x2="48"
              y2="50"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
          
          {/* Sparkles for celebrating */}
          {mood === 'celebrating' && (
            <>
              <motion.circle
                cx="15"
                cy="20"
                r="2"
                fill="gold"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.circle
                cx="65"
                cy="25"
                r="2"
                fill="gold"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
