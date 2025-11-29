import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Mood = 'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'alert';

interface RupeeSquadProps {
  mood?: Mood;
  message?: string;
  activeCharacter?: 'chanakya' | 'kavach' | 'lakshmi' | null;
  onActivityLogClick?: () => void;
  agentStatus?: 'normal' | 'insight' | 'urgent';
}

export function RupeeSquad({ mood: externalMood, message: externalMessage, activeCharacter: externalActiveCharacter, onActivityLogClick, agentStatus = 'normal' }: RupeeSquadProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [idleAnimation, setIdleAnimation] = useState(0);
  const [whisperDirection, setWhisperDirection] = useState<'left' | 'right' | null>(null);
  
  // Internal state for contextual reactions
  const [internalMood, setInternalMood] = useState<Mood>('happy');
  const [internalMessage, setInternalMessage] = useState<string>('');
  const [internalActiveCharacter, setInternalActiveCharacter] = useState<'chanakya' | 'kavach' | 'lakshmi' | null>(null);
  const [reactionBlink, setReactionBlink] = useState(false);
  
  // Merge external and internal state - external takes precedence
  const mood = externalMood || internalMood;
  const message = externalMessage || internalMessage;
  const activeCharacter = externalActiveCharacter || internalActiveCharacter;
  
  // Get status ring color
  const getStatusRingColor = () => {
    switch (agentStatus) {
      case 'urgent': return '#ef4444'; // red
      case 'insight': return '#fbbf24'; // gold
      default: return '#06b6d4'; // blue
    }
  };
  
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onActivityLogClick) {
      onActivityLogClick();
    }
  };

  // Handle global click detection for contextual reactions
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Brief blink reaction
    setReactionBlink(true);
    setTimeout(() => setReactionBlink(false), 150);
    
    // Find data attributes by traversing up the DOM tree
    let currentElement: HTMLElement | null = target;
    let squadContext = '';
    
    while (currentElement && !squadContext) {
      squadContext = currentElement.getAttribute('data-squad-context') || '';
      currentElement = currentElement.parentElement;
    }
    
    if (!squadContext) return;
    
    // Reset any previous timeout
    const timeoutId = setTimeout(() => {
      setInternalMood('happy');
      setInternalActiveCharacter(null);
      setInternalMessage('');
    }, 4000);
    
    // Contextual reactions based on what was clicked
    switch (squadContext) {
      case 'goal':
      case 'savings-goal':
        setInternalMood('celebrating');
        setInternalActiveCharacter('lakshmi');
        setInternalMessage('Yay! Great progress on your goals! Keep it up! 🎯✨');
        setIsExpanded(true);
        setTimeout(() => setIsExpanded(false), 3000);
        break;
        
      case 'tax-vault':
      case 'tax':
        setInternalMood('thinking');
        setInternalActiveCharacter('chanakya');
        setInternalMessage('Analyzing your tax obligations... You\'re being smart about taxes! 🤓📊');
        setIsExpanded(true);
        setTimeout(() => setIsExpanded(false), 3000);
        break;
        
      case 'expense':
      case 'transaction':
        const isImpulse = currentElement?.getAttribute('data-impulse') === 'true';
        if (isImpulse) {
          setInternalMood('concerned');
          setInternalActiveCharacter('kavach');
          setInternalMessage('Hmm... I\'m watching this expense carefully. Let\'s make mindful choices! 🛡️');
        } else {
          setInternalMood('curious');
          setInternalActiveCharacter('kavach');
          setInternalMessage('Noted! I\'m keeping track of your spending patterns. 📝');
        }
        setIsExpanded(true);
        setTimeout(() => setIsExpanded(false), 3000);
        break;
        
      case 'alert':
      case 'insight':
        setInternalMood('alert');
        setInternalActiveCharacter('chanakya');
        setInternalMessage('Good eye! Let\'s review this insight together. 🔍');
        setIsExpanded(true);
        setTimeout(() => setIsExpanded(false), 3000);
        break;
        
      case 'safe-to-spend':
        setInternalMood('happy');
        setInternalActiveCharacter('lakshmi');
        setInternalMessage('Your safe-to-spend is looking good! Enjoy responsibly! 💰');
        setIsExpanded(true);
        setTimeout(() => setIsExpanded(false), 3000);
        break;
    }
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setEyePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global click listener for contextual reactions
  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  // Idle animations - whisper, look around
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleAnimation(prev => (prev + 1) % 4);
      
      // Random whisper direction
      if (Math.random() > 0.7) {
        setWhisperDirection(Math.random() > 0.5 ? 'left' : 'right');
        setTimeout(() => setWhisperDirection(null), 2000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getEyeExpression = (): React.CSSProperties => {
    // Blink overrides everything
    if (reactionBlink) return { transform: 'scaleY(0.1) scaleX(1)' };
    
    switch (mood) {
      case 'celebrating': return { transform: 'scaleY(0.4) scaleX(1.2)' }; // Happy squint
      case 'concerned': return { transform: 'scaleY(1.3) scaleX(1.1)' }; // Wide eyes
      case 'thinking': return { transform: 'scaleY(0.9) scaleX(0.9)' }; // Focused
      case 'alert': return { transform: 'scaleY(1.2) scaleX(1.1)' }; // Alert eyes
      case 'curious': return { transform: 'scaleY(1.1) scaleX(1)' }; // Curious eyes
      default: return { transform: 'scaleY(1) scaleX(1)' };
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-4 max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-teal-500/30 relative">
              <p className="text-sm text-gray-800">{message}</p>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r-2 border-b-2 border-teal-500/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main RupeeSquad Container */}
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={handleIconClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Status Ring - Glowing outer ring showing agent status */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: '130px',
            height: '130px',
            left: '-5px',
            top: '-5px',
          }}
        >
          <svg width="130" height="130" viewBox="0 0 130 130">
            <motion.circle
              cx="65"
              cy="65"
              r="62"
              fill="none"
              stroke={getStatusRingColor()}
              strokeWidth="3"
              opacity="0.6"
              strokeDasharray="4 4"
              animate={{
                rotate: [0, 360],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </svg>
        </motion.div>
        
        {/* Unified Container - Money Bag Shape */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="squad-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008080" />
              <stop offset="100%" stopColor="#009688" />
            </linearGradient>
            <filter id="squad-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main Container Shape - Rounded Money Bag with breathing */}
          <motion.path
            d="M 60 25 Q 35 25 30 42 Q 25 60 30 78 Q 35 95 60 100 Q 85 95 90 78 Q 95 60 90 42 Q 85 25 60 25 Z"
            fill="url(#squad-gradient)"
            filter="url(#squad-glow)"
            stroke="white"
            strokeWidth="3"
            animate={{
              d: isExpanded 
                ? "M 60 20 Q 30 20 25 42 Q 20 60 25 82 Q 30 105 60 110 Q 90 105 95 82 Q 100 60 95 42 Q 90 20 60 20 Z"
                : [
                    "M 60 25 Q 35 25 30 42 Q 25 60 30 78 Q 35 95 60 100 Q 85 95 90 78 Q 95 60 90 42 Q 85 25 60 25 Z",
                    "M 60 23 Q 34 24 29 42 Q 24 60 29 78 Q 34 97 60 102 Q 86 97 91 78 Q 96 60 91 42 Q 86 24 60 23 Z",
                    "M 60 25 Q 35 25 30 42 Q 25 60 30 78 Q 35 95 60 100 Q 85 95 90 78 Q 95 60 90 42 Q 85 25 60 25 Z",
                  ],
            }}
            transition={{ 
              duration: isExpanded ? 0.3 : 2,
              repeat: isExpanded ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rupee Symbol on Container */}
          {!isExpanded && (
            <motion.g
              animate={{ 
                opacity: isExpanded ? 0 : 1,
                y: idleAnimation % 2 === 0 ? 0 : -2,
              }}
              transition={{ duration: 0.5 }}
            >
              <text
                x="60"
                y="72"
                textAnchor="middle"
                fill="white"
                fontSize="38"
                fontWeight="bold"
              >
                ₹
              </text>
            </motion.g>
          )}

          {/* Three Characters Inside - Appear on Expand with animations */}
          <AnimatePresence>
            {isExpanded && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
              >
                {/* Chanakya - The Analyst (Left) */}
                <motion.g
                  transform="translate(30, 45)"
                  animate={{
                    y: activeCharacter === 'chanakya' ? [-2, 2, -2] : idleAnimation === 1 ? -3 : 0,
                    scale: activeCharacter === 'chanakya' ? 1.15 : 1,
                  }}
                  transition={{ duration: 1.5, repeat: activeCharacter === 'chanakya' ? Infinity : 0 }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill="#FF9933"
                    opacity={activeCharacter === 'chanakya' ? 1 : 0.85}
                  />
                  {/* Glasses */}
                  <ellipse cx="-5" cy="-3" rx="4" ry="3.5" fill="white" opacity="0.9" style={getEyeExpression()} />
                  <ellipse cx="5" cy="-3" rx="4" ry="3.5" fill="white" opacity="0.9" style={getEyeExpression()} />
                  <motion.circle
                    cx="-5"
                    cy="-3"
                    r="2"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.3, 
                      y: eyePosition.y * 0.3,
                      scaleY: mood === 'thinking' ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <motion.circle
                    cx="5"
                    cy="-3"
                    r="2"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.3, 
                      y: eyePosition.y * 0.3,
                      scaleY: mood === 'thinking' ? 0.7 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {/* Glasses frame */}
                  <path d="M -9 -3 L -1 -3 M 1 -3 L 9 -3 M -1 -3 L 1 -3" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                  {/* Wise smile */}
                  <motion.path
                    d="M -5 4 Q 0 6 5 4"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: mood === 'thinking' ? "M -5 4 L 5 4" : "M -5 4 Q 0 6 5 4",
                    }}
                  />
                </motion.g>

                {/* Kavach - The Guardian (Center Top) */}
                <motion.g
                  transform="translate(60, 38)"
                  animate={{
                    y: activeCharacter === 'kavach' ? [-2, 2, -2] : idleAnimation === 2 ? -3 : 0,
                    scale: activeCharacter === 'kavach' ? 1.15 : 1,
                  }}
                  transition={{ duration: 1.5, repeat: activeCharacter === 'kavach' ? Infinity : 0 }}
                >
                  <path
                    d="M 0 -14 L 10 -7 L 10 7 L 0 14 L -10 7 L -10 -7 Z"
                    fill="#008080"
                    opacity={activeCharacter === 'kavach' ? 1 : 0.85}
                  />
                  {/* Determined eyes */}
                  <ellipse cx="-4" cy="-3" rx="2.5" ry="4" fill="white" opacity="0.9" style={getEyeExpression()} />
                  <ellipse cx="4" cy="-3" rx="2.5" ry="4" fill="white" opacity="0.9" style={getEyeExpression()} />
                  <motion.circle
                    cx="-4"
                    cy="-2"
                    r="1.5"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.3, 
                      y: eyePosition.y * 0.3,
                      scaleY: mood === 'concerned' ? 1.3 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <motion.circle
                    cx="4"
                    cy="-2"
                    r="1.5"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.3, 
                      y: eyePosition.y * 0.3,
                      scaleY: mood === 'concerned' ? 1.3 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {/* Strong eyebrows */}
                  <path d="M -6 -5 L -2 -4 M 2 -4 L 6 -5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                  {/* Serious mouth */}
                  <motion.path
                    d="M -4 3 L 4 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      d: mood === 'concerned' ? "M -4 4 Q 0 2 4 4" : "M -4 3 L 4 3",
                    }}
                  />
                  {/* Shield emblem */}
                  <path d="M 0 3 L -3 5 L 0 7 L 3 5 Z" stroke="white" strokeWidth="1.5" fill="none" />
                </motion.g>

                {/* Lakshmi - The Motivator (Right) */}
                <motion.g
                  transform="translate(90, 45)"
                  animate={{
                    y: activeCharacter === 'lakshmi' ? [-2, 2, -2] : idleAnimation === 3 ? -3 : 0,
                    scale: activeCharacter === 'lakshmi' ? 1.15 : 1,
                    rotate: mood === 'celebrating' ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: mood === 'celebrating' ? 0.5 : 1.5, repeat: activeCharacter === 'lakshmi' || mood === 'celebrating' ? Infinity : 0 }}
                >
                  <motion.path
                    d="M 0 -12 L 3.5 -3.5 L 12 -3 L 5 3 L 7 11 L 0 6.5 L -7 11 L -5 3 L -12 -3 L -3.5 -3.5 Z"
                    fill="#FF9933"
                    opacity={activeCharacter === 'lakshmi' ? 1 : 0.85}
                  />
                  {/* Happy eyes */}
                  <motion.ellipse
                    cx="-3"
                    cy="-2"
                    rx="2.5"
                    ry="3"
                    fill="white"
                    opacity="0.9"
                    animate={{
                      scaleY: mood === 'celebrating' ? [1, 0.4, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: mood === 'celebrating' ? Infinity : 0 }}
                  />
                  <motion.ellipse
                    cx="3"
                    cy="-2"
                    rx="2.5"
                    ry="3"
                    fill="white"
                    opacity="0.9"
                    animate={{
                      scaleY: mood === 'celebrating' ? [1, 0.4, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: mood === 'celebrating' ? Infinity : 0 }}
                  />
                  <motion.circle
                    cx="-3"
                    cy="-1"
                    r="1.5"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.25, 
                      y: eyePosition.y * 0.25,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <motion.circle
                    cx="3"
                    cy="-1"
                    r="1.5"
                    fill="#1e293b"
                    animate={{ 
                      x: eyePosition.x * 0.25, 
                      y: eyePosition.y * 0.25,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {/* Big smile */}
                  <motion.path
                    d="M -4 3 Q 0 6 4 3"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: mood === 'celebrating' ? "M -4 2 Q 0 7 4 2" : "M -4 3 Q 0 6 4 3",
                    }}
                  />
                  {/* Sparkle when celebrating */}
                  {mood === 'celebrating' && (
                    <motion.path
                      d="M 10 -8 L 11 -6 L 13 -7 L 12 -5 L 14 -4 L 12 -3 L 13 -1 L 11 -2 L 10 0 L 9 -2 L 7 -1 L 8 -3 L 6 -4 L 8 -5 L 7 -7 L 9 -6 Z"
                      fill="white"
                      opacity="0.8"
                      animate={{
                        opacity: [0.8, 0.3, 0.8],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </motion.g>

                {/* Whisper lines between characters */}
                <AnimatePresence>
                  {whisperDirection === 'left' && (
                    <motion.path
                      d="M 35 50 Q 45 45 58 45"
                      stroke="#008080"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="3 3"
                      opacity="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  )}
                  {whisperDirection === 'right' && (
                    <motion.path
                      d="M 85 50 Q 75 45 62 45"
                      stroke="#FF9933"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="3 3"
                      opacity="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </AnimatePresence>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Breathing animation for container */}
          <motion.circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="#008080"
            strokeWidth="2"
            opacity="0.2"
            animate={{
              r: [55, 58, 55],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Active indicator */}
        {activeCharacter && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>

      {/* Character names on hover */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg p-3 border border-teal-500/20 min-w-[200px]"
          >
            {/* Status Update */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-900">Status</span>
              </div>
              <p className="text-xs text-gray-700">Everything looks stable! ✅</p>
            </div>
            
            {/* Character List */}
            <div className="text-xs space-y-1.5">
              <p className="text-xs text-gray-500 mb-2">Your AI Squad:</p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-gray-700">Chanakya - Analyst</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="text-gray-700">Kavach - Guardian</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-gray-700">Lakshmi - Motivator</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}