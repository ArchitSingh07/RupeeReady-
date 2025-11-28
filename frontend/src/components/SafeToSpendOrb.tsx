import { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';

interface SafeToSpendOrbProps {
  safeAmount: number;
  totalBalance: number;
  taxVault: number;
  upcomingBills: number;
  financialHealth: 'stable' | 'good' | 'caution';
}

export function SafeToSpendOrb({ 
  safeAmount, 
  totalBalance, 
  taxVault, 
  upcomingBills,
  financialHealth = 'stable'
}: SafeToSpendOrbProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getHealthColor = () => {
    switch (financialHealth) {
      case 'good': return { primary: '#fbbf24', secondary: '#f59e0b', glow: 'rgba(251, 191, 36, 0.5)' };
      case 'caution': return { primary: '#ec4899', secondary: '#db2777', glow: 'rgba(236, 72, 153, 0.5)' };
      default: return { primary: '#06b6d4', secondary: '#0891b2', glow: 'rgba(6, 182, 212, 0.5)' };
    }
  };

  const colors = getHealthColor();

  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      {/* Main Interactive Orb */}
      <motion.div
        className="relative cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={(_, info) => {
          setRotation(prev => prev + info.delta.x * 0.5);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300" style={{ filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5))' }}>
          <defs>
            {/* Main gradient */}
            <radialGradient id="orb-gradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.7" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.3" />
            </radialGradient>

            {/* Glass reflection gradient */}
            <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="orb-glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Inner pattern */}
            <pattern id="orb-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <motion.circle
                cx="20"
                cy="20"
                r="1.5"
                fill="white"
                opacity="0.15"
                animate={{
                  r: [1.5, 2, 1.5],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>

          {/* Outer glow ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="145"
            fill="none"
            stroke={colors.primary}
            strokeWidth="2"
            opacity="0.2"
            animate={{
              r: [145, 150, 145],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main orb sphere */}
          <motion.g
            animate={{
              rotate: rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="url(#orb-gradient)"
              filter="url(#orb-glow)"
            />

            {/* Pattern overlay */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="url(#orb-pattern)"
            />

            {/* Glassmorphic overlay */}
            <ellipse
              cx="150"
              cy="110"
              rx="90"
              ry="50"
              fill="url(#glass-gradient)"
              opacity="0.6"
            />

            {/* Rotating data rings */}
            <motion.circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.g>

          {/* Highlight */}
          <motion.circle
            cx="120"
            cy="100"
            r="25"
            fill="white"
            opacity="0.3"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Amount Display - Centered in Orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <DollarSign className="w-8 h-8 text-white" />
              <motion.span
                key={safeAmount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl text-white drop-shadow-lg"
              >
                {safeAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
            </div>
            <p className="text-sm text-white/80 drop-shadow">Safe to Spend</p>
            {isDragging && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/60 mt-2"
              >
                Drag to explore
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Toggle Breakdown Button */}
      <motion.button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="mt-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm">View Breakdown</span>
        <motion.div
          animate={{
            rotate: showBreakdown ? 180 : 0,
          }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Breakdown Panel */}
      <motion.div
        initial={false}
        animate={{
          height: showBreakdown ? 'auto' : 0,
          opacity: showBreakdown ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-4 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-100">Total Balance</span>
            </div>
            <span className="text-white">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-cyan-100">Tax Vault</span>
            </div>
            <span className="text-amber-400">
              -${taxVault.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-magenta-400" />
              <span className="text-sm text-cyan-100">Upcoming Bills</span>
            </div>
            <span className="text-magenta-400">
              -${upcomingBills.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white">Safe Amount</span>
              <span className="text-xl text-white">
                ${safeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Helper text */}
      <motion.p
        className="text-center text-sm text-cyan-300/60 mt-4 max-w-md"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Click and drag the orb to spin it • Your true spendable balance
      </motion.p>
    </div>
  );
}
