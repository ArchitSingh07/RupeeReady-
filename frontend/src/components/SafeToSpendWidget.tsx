import { motion } from 'motion/react';
import { IndianRupee, TrendingUp, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface SafeToSpendWidgetProps {
  safeAmount: number;
  totalBalance: number;
  taxVault: number;
  upcomingBills: number;
  financialHealth?: 'stable' | 'good' | 'caution' | 'critical';
  isZeroState?: boolean;
}

export function SafeToSpendWidget({ 
  safeAmount, 
  totalBalance, 
  taxVault, 
  upcomingBills,
  financialHealth = 'stable',
  isZeroState = false
}: SafeToSpendWidgetProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Determine colors based on financial health - DARK THEME
  const getHealthStyles = () => {
    if (isZeroState) {
      return {
        gradient: 'from-slate-500 via-gray-500 to-slate-500',
        glowColor: 'rgba(100, 116, 139, 0.3)',
        textColor: 'text-slate-400',
        bgOverlay: 'from-slate-500/20 to-gray-500/20',
      };
    }
    
    switch (financialHealth) {
      case 'good':
        return {
          gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
          glowColor: 'rgba(16, 185, 129, 0.4)',
          textColor: 'text-emerald-400',
          bgOverlay: 'from-emerald-500/20 to-teal-500/20',
        };
      case 'caution':
        return {
          gradient: 'from-orange-500 via-amber-500 to-yellow-500',
          glowColor: 'rgba(249, 115, 22, 0.4)',
          textColor: 'text-orange-400',
          bgOverlay: 'from-orange-500/20 to-amber-500/20',
        };
      case 'critical':
        return {
          gradient: 'from-red-500 via-rose-500 to-red-500',
          glowColor: 'rgba(239, 68, 68, 0.4)',
          textColor: 'text-red-400',
          bgOverlay: 'from-red-500/20 to-rose-500/20',
        };
      default:
        return {
          gradient: 'from-teal-500 via-cyan-500 to-blue-500',
          glowColor: 'rgba(20, 184, 166, 0.4)',
          textColor: 'text-teal-400',
          bgOverlay: 'from-teal-500/20 to-cyan-500/20',
        };
    }
  };

  const styles = getHealthStyles();

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl blur-2xl opacity-60"
        style={{ 
          background: `radial-gradient(circle at center, ${styles.glowColor}, transparent 70%)` 
        }}
      />
      
      <Card 
        data-squad-context="safe-to-spend"
        className="relative overflow-hidden glass-effect border border-white/10 shadow-2xl premium-card-hover"
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${styles.bgOverlay} opacity-30`}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-lg`}
              >
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl text-white">Safe to Spend</h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Your true available balance</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className={`flex items-center gap-1 ${styles.textColor} hover:underline px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-white/5 transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs sm:text-sm">Breakdown</span>
              <motion.div
                animate={{ rotate: showBreakdown ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Main Amount */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isZeroState ? (
              <div className="text-center py-8">
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <IndianRupee className="w-8 h-8 text-slate-500" />
                  <div className="text-5xl text-slate-500 font-bold">0</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                  <p className="text-slate-400 text-sm mb-2">🛡️ RupeeSquad Active: Monitoring for Income...</p>
                  <p className="text-slate-500 text-xs">Waiting for your first transaction to get started</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <IndianRupee className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${styles.textColor}`} />
                  <div className="gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{formatIndianCurrency(safeAmount)}</div>
                </div>
                <motion.div
                  className={`mt-2 sm:mt-3 inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${styles.bgOverlay} border border-white/10`}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 ${styles.textColor}`} />
                  <span className="text-xs sm:text-sm text-gray-300">
                    {financialHealth === 'good' ? 'Healthy Balance' : financialHealth === 'caution' ? 'Monitor Spending' : 'Stable Position'}
                  </span>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Breakdown Section */}
          <motion.div
            initial={false}
            animate={{
              height: showBreakdown ? 'auto' : 0,
              opacity: showBreakdown ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-6 border-t border-white/10">
              {/* Total Balance */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Balance</p>
                    <p className="text-white">{formatIndianCurrency(totalBalance)}</p>
                  </div>
                </div>
              </div>

              {/* Minus Tax Vault */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Tax Vault (Reserved)</p>
                    <p className="text-white">- {formatIndianCurrency(taxVault)}</p>
                  </div>
                </div>
              </div>

              {/* Minus Bills */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Upcoming Bills</p>
                    <p className="text-white">- {formatIndianCurrency(upcomingBills)}</p>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${styles.bgOverlay} border border-white/20`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">Safe to Spend</p>
                  <p className={`text-xl ${styles.textColor}`}>= {formatIndianCurrency(safeAmount)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Info */}
          {!showBreakdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Balance</p>
                <p className="text-sm text-white">{formatIndianCurrency(totalBalance)}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Tax Vault</p>
                <p className="text-sm text-orange-400">{formatIndianCurrency(taxVault)}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Bills Due</p>
                <p className="text-sm text-purple-400">{formatIndianCurrency(upcomingBills)}</p>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}
