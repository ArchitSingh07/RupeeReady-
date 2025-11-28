import { motion } from 'motion/react';

interface RupeeReadyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
}

export function RupeeReadyLogo({ size = 'md', showText = true, animated = false }: RupeeReadyLogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-base', subtitle: 'text-xs' },
    md: { icon: 40, text: 'text-xl', subtitle: 'text-xs' },
    lg: { icon: 56, text: 'text-3xl', subtitle: 'text-sm' },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Rupee symbol with AI/growth arrow */}
      <motion.div
        className="relative"
        animate={animated ? {
          boxShadow: [
            '0 0 0 0 rgba(13, 148, 136, 0.4)',
            '0 0 0 10px rgba(13, 148, 136, 0)',
          ],
        } : {}}
        transition={animated ? {
          duration: 2,
          repeat: Infinity,
        } : {}}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008080" />
              <stop offset="50%" stopColor="#009688" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
            <linearGradient id="logo-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#ffb366" />
            </linearGradient>
            <filter id="logo-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main circle background */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#logo-gradient)"
            filter="url(#logo-glow)"
          />

          {/* Rupee symbol - styled and bold */}
          <g transform="translate(50, 50)">
            {/* Top horizontal line */}
            <path
              d="M -18 -18 L 12 -18"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Second horizontal line */}
            <path
              d="M -18 -8 L 12 -8"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Vertical line with curve (₹ shape) */}
            <path
              d="M -18 -18 L -18 2 Q -18 8 -12 8 L 0 8 L 15 22"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* AI Growth Arrow - subtle accent */}
          <motion.g
            animate={animated ? {
              y: [0, -2, 0],
              opacity: [0.9, 1, 0.9],
            } : {}}
            transition={animated ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            } : {}}
          >
            <path
              d="M 70 30 L 85 15 L 82 25 L 92 22 L 85 15"
              stroke="url(#logo-accent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Sparkle dots suggesting AI */}
            <circle cx="75" cy="25" r="2" fill="url(#logo-accent)" />
            <circle cx="82" cy="18" r="1.5" fill="url(#logo-accent)" />
          </motion.g>

          {/* Subtle tech circuit pattern */}
          <g opacity="0.3">
            <circle cx="20" cy="35" r="2" fill="white" />
            <circle cx="80" cy="65" r="2" fill="white" />
            <path d="M 20 35 L 30 35 L 30 45" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M 80 65 L 70 65 L 70 55" stroke="white" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </motion.div>

      {/* Text */}
      {showText && (
        <div>
          <h1 className={`${currentSize.text} leading-tight`} style={{ color: '#008080' }}>
            RupeeReady AI
          </h1>
          <p className={`${currentSize.subtitle} leading-tight`} style={{ color: '#666666' }}>
            Your Financial Companion
          </p>
        </div>
      )}
    </div>
  );
}
