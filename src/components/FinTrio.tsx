import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Mood = 'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'alert';

interface FinTrioProps {
  mood?: Mood;
  message?: string;
  activeCharacter?: 'pip' | 'glim' | 'flow' | null;
}

export function FinTrio({ mood = 'happy', message, activeCharacter = null }: FinTrioProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [idleAnimation, setIdleAnimation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setEyePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdleAnimation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-4 max-w-sm"
          >
            <div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 border border-cyan-500/30 relative">
              <p className="text-sm text-cyan-100">{message}</p>
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-indigo-900 transform rotate-45 border-r border-b border-cyan-500/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex items-end gap-3"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      >
        {/* Pip - The Analyst */}
        <motion.div
          className="cursor-pointer relative"
          animate={{
            y: isHovered ? -10 : idleAnimation === 0 ? [-2, 2, -2] : 0,
          }}
          transition={{
            y: {
              duration: 2,
              repeat: idleAnimation === 0 ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <defs>
              <linearGradient id="pip-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <filter id="glow-pip">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Body */}
            <motion.circle
              cx="30"
              cy="35"
              r="20"
              fill="url(#pip-gradient)"
              filter="url(#glow-pip)"
              animate={{
                scale: activeCharacter === 'pip' ? [1, 1.15, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: activeCharacter === 'pip' ? Infinity : 0,
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
              <ellipse cx="23" cy="32" rx="4" ry="6" fill="white" opacity="0.9" />
              <circle cx="23" cy="33" r="2.5" fill="#1e1b4b" />
              
              <ellipse cx="37" cy="32" rx="4" ry="6" fill="white" opacity="0.9" />
              <circle cx="37" cy="33" r="2.5" fill="#1e1b4b" />
            </motion.g>
            
            {/* Glasses */}
            <motion.path
              d="M 18 30 L 28 30 M 32 30 L 42 30 M 28 30 L 32 30"
              stroke="#fff"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
              animate={isHovered ? {
                y: [0, -2, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            />
            
            {/* Mouth */}
            <motion.path
              d="M 23 42 Q 30 46 37 42"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            
            {/* Data symbols floating around when active */}
            {activeCharacter === 'pip' && (
              <>
                <motion.text
                  x="10"
                  y="20"
                  fill="#06b6d4"
                  fontSize="12"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [20, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  $
                </motion.text>
                <motion.text
                  x="48"
                  y="25"
                  fill="#06b6d4"
                  fontSize="10"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [25, 15, 5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  %
                </motion.text>
              </>
            )}
          </svg>
          {activeCharacter === 'pip' && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Glim - The Guardian */}
        <motion.div
          className="cursor-pointer relative"
          animate={{
            y: isHovered ? -10 : idleAnimation === 1 ? [-2, 2, -2] : 0,
          }}
          transition={{
            y: {
              duration: 2,
              repeat: idleAnimation === 1 ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        >
          <svg width="60" height="70" viewBox="0 0 60 70">
            <defs>
              <linearGradient id="glim-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow-glim">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Shield Body */}
            <motion.path
              d="M 30 15 L 45 25 L 45 45 L 30 60 L 15 45 L 15 25 Z"
              fill="url(#glim-gradient)"
              filter="url(#glow-glim)"
              animate={{
                scale: activeCharacter === 'glim' ? [1, 1.15, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: activeCharacter === 'glim' ? Infinity : 0,
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
              <ellipse cx="24" cy="35" rx="3" ry="5" fill="white" opacity="0.9" />
              <circle cx="24" cy="36" r="2" fill="#1e1b4b" />
              
              <ellipse cx="36" cy="35" rx="3" ry="5" fill="white" opacity="0.9" />
              <circle cx="36" cy="36" r="2" fill="#1e1b4b" />
            </motion.g>
            
            {/* Determined eyebrows */}
            <motion.path
              d="M 21 32 L 27 31 M 33 31 L 39 32"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
              animate={mood === 'concerned' || mood === 'alert' ? {
                y: [-1, 1, -1],
              } : {}}
              transition={{
                duration: 0.5,
                repeat: mood === 'concerned' || mood === 'alert' ? Infinity : 0,
              }}
            />
            
            {/* Shield emblem */}
            <motion.path
              d="M 30 42 L 25 47 L 30 52 L 35 47 Z"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            
            {/* Alert symbols when active */}
            {activeCharacter === 'glim' && (
              <>
                <motion.circle
                  cx="12"
                  cy="20"
                  r="3"
                  fill="#ec4899"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.circle
                  cx="48"
                  cy="22"
                  r="2.5"
                  fill="#ec4899"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.7,
                  }}
                />
              </>
            )}
          </svg>
          {activeCharacter === 'glim' && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-magenta-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        {/* Flow - The Motivator */}
        <motion.div
          className="cursor-pointer relative"
          animate={{
            y: isHovered ? -10 : idleAnimation === 2 ? [-2, 2, -2] : 0,
            rotate: isHovered ? [0, -10, 10, 0] : 0,
          }}
          transition={{
            y: {
              duration: 2,
              repeat: idleAnimation === 2 ? Infinity : 0,
              ease: "easeInOut"
            },
            rotate: {
              duration: 0.5,
            }
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="glow-flow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Star Body */}
            <motion.path
              d="M 30 10 L 35 25 L 50 25 L 38 35 L 43 50 L 30 40 L 17 50 L 22 35 L 10 25 L 25 25 Z"
              fill="url(#flow-gradient)"
              filter="url(#glow-flow)"
              animate={{
                scale: activeCharacter === 'flow' ? [1, 1.15, 1] : 1,
                rotate: mood === 'celebrating' ? [0, 360] : 0,
              }}
              transition={{
                scale: {
                  duration: 0.5,
                  repeat: activeCharacter === 'flow' ? Infinity : 0,
                },
                rotate: {
                  duration: 2,
                  repeat: mood === 'celebrating' ? Infinity : 0,
                  ease: "linear",
                }
              }}
            />
            
            {/* Eyes */}
            <motion.g
              animate={{
                x: eyePosition.x * 0.7,
                y: eyePosition.y * 0.7,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ellipse cx="24" cy="28" rx="3" ry="4" fill="white" opacity="0.9" />
              <circle cx="24" cy="29" r="1.5" fill="#1e1b4b" />
              
              <ellipse cx="36" cy="28" rx="3" ry="4" fill="white" opacity="0.9" />
              <circle cx="36" cy="29" r="1.5" fill="#1e1b4b" />
            </motion.g>
            
            {/* Big smile */}
            <motion.path
              d="M 22 35 Q 30 42 38 35"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
              animate={mood === 'celebrating' ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 0.5,
                repeat: mood === 'celebrating' ? Infinity : 0,
              }}
            />
            
            {/* Sparkles when active */}
            {(activeCharacter === 'flow' || mood === 'celebrating') && (
              <>
                <motion.circle
                  cx="10"
                  cy="15"
                  r="2"
                  fill="#fbbf24"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="18"
                  r="2"
                  fill="#fbbf24"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <motion.circle
                  cx="30"
                  cy="8"
                  r="2"
                  fill="#fbbf24"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </>
            )}
          </svg>
          {activeCharacter === 'flow' && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Character names on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 left-0 flex gap-8 text-xs text-cyan-300"
          >
            <span>Pip</span>
            <span className="ml-2">Glim</span>
            <span className="ml-1">Flow</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
