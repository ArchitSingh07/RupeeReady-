import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, ArrowRight, X, Sparkles } from 'lucide-react';
import { Goal } from '../contexts/FinancialDataContext';

interface LakshmiNudgeCardProps {
  goal: Goal;
  percentComplete: number;
  onSwapBudget: () => void;
  onDismiss: () => void;
  visible: boolean;
}

export function LakshmiNudgeCard({
  goal,
  percentComplete,
  onSwapBudget,
  onDismiss,
  visible,
}: LakshmiNudgeCardProps) {
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-green-950 border-2 border-emerald-500/30 shadow-2xl"
        >
          {/* Animated background glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500 rounded-full blur-3xl"
          />

          {/* Floating sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: '100%',
                }}
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </motion.div>
            ))}
          </div>

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl"
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-lg">Lakshmi's Nudge</h3>
                  <p className="text-emerald-300 text-sm">Goal Progress Alert</p>
                </div>
              </div>
              <button
                onClick={onDismiss}
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Goal Info */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-white font-semibold text-xl">{goal.name}</h4>
                <span className="text-emerald-400 font-bold text-2xl">
                  {percentComplete}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-900/50 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                />
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-white/30"
                  style={{ right: `${100 - percentComplete}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-300">
                  ₹{goal.currentAmount.toLocaleString('en-IN')} saved
                </span>
                <span className="text-slate-400">
                  ₹{goal.targetAmount.toLocaleString('en-IN')} target
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="bg-emerald-900/30 backdrop-blur-sm rounded-xl p-4 mb-4 border border-emerald-500/20">
              <p className="text-emerald-100 text-sm leading-relaxed">
                🎉 You're <span className="font-bold text-white">{percentComplete}% there</span>! 
                Just <span className="font-bold text-white">₹{remaining.toLocaleString('en-IN')}</span> to go. 
                Consider redirecting some spending from other categories to reach your goal faster!
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onSwapBudget}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Adjust Budget to Reach Goal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Footer */}
            <p className="text-emerald-400 text-xs text-center mt-3 opacity-70">
              Lakshmi is helping you achieve your dreams ✨
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to check if any goals should show nudge
export function useLakshmiNudge(goals: Goal[]) {
  const goalsNeedingNudge = goals
    .map((goal) => ({
      goal,
      percentComplete: Math.round((goal.currentAmount / goal.targetAmount) * 100),
    }))
    .filter(({ percentComplete }) => percentComplete >= 85 && percentComplete < 100);

  return goalsNeedingNudge[0] || null; // Return first goal needing nudge
}
