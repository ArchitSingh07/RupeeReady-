import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface SpendingBlockedModalProps {
  isOpen: boolean;
  amount: number;
  category: string;
  reason: string;
  onCoolDown: () => void;
  onOverride: () => void;
  coolDownActive?: boolean;
  coolDownEndsAt?: Date;
}

export function SpendingBlockedModal({
  isOpen,
  amount,
  category,
  reason,
  onCoolDown,
  onOverride,
  coolDownActive = false,
  coolDownEndsAt,
}: SpendingBlockedModalProps) {
  const [overrideConfirm, setOverrideConfirm] = useState(false);

  const formatTimeRemaining = () => {
    if (!coolDownEndsAt) return '';
    const now = new Date();
    const diff = coolDownEndsAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen red overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-red-950 via-red-900 to-rose-950"
          >
            {/* Animated danger pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 255, 255, 0.1) 10px,
                  rgba(255, 255, 255, 0.1) 20px
                )`
              }} />
            </div>

            {/* Pulsing glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="max-w-lg w-full"
              >
                {/* Kavach Shield Icon */}
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-red-500 rounded-full blur-2xl"
                    />
                    <div className="relative bg-red-600 p-6 rounded-full">
                      <ShieldAlert className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-4xl font-bold text-white text-center mb-3">
                  🛡️ KAVACH ACTIVATED
                </h2>
                <p className="text-red-200 text-center text-lg mb-8">
                  Spending Shield Engaged
                </p>

                {/* Alert Box */}
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border-2 border-red-500/50 mb-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">Transaction Blocked</h3>
                      <p className="text-red-100 text-sm mb-4">{reason}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-950/50 rounded-lg p-3">
                          <div className="text-red-300 text-xs mb-1">Amount</div>
                          <div className="text-white font-bold text-lg">
                            ₹{amount.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="bg-red-950/50 rounded-lg p-3">
                          <div className="text-red-300 text-xs mb-1">Category</div>
                          <div className="text-white font-bold text-lg capitalize">
                            {category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cool Down Status */}
                {coolDownActive && coolDownEndsAt && (
                  <div className="bg-orange-950/50 backdrop-blur-xl rounded-xl p-4 border border-orange-500/30 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="text-orange-200 text-sm font-medium">
                          24-Hour Cool-Down Active
                        </div>
                        <div className="text-orange-300 text-xs">
                          {formatTimeRemaining()} remaining
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Cool Down Button (Primary Action) */}
                  <button
                    onClick={onCoolDown}
                    disabled={coolDownActive}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Clock className="w-5 h-5" />
                    <span>{coolDownActive ? 'Cool-Down Active' : 'Take 24hr Cool-Down'}</span>
                  </button>

                  {/* Emergency Override */}
                  {!overrideConfirm ? (
                    <button
                      onClick={() => setOverrideConfirm(true)}
                      className="w-full bg-red-900/50 text-red-200 py-3 px-6 rounded-xl font-medium hover:bg-red-900/70 transition-all border border-red-500/30"
                    >
                      Emergency Override
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-red-950/70 rounded-xl p-4 border border-red-500/50">
                        <p className="text-red-200 text-sm mb-3 text-center">
                          ⚠️ Are you sure? This may impact your financial goals.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOverrideConfirm(false)}
                            className="bg-slate-700 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-600 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={onOverride}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-500 transition-all"
                          >
                            Override
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer note */}
                <p className="text-red-300 text-xs text-center mt-6 opacity-70">
                  Kavach is protecting your financial wellness
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
