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
  financialHealth?: 'stable' | 'good' | 'caution';
}

export function SafeToSpendWidget({ 
  safeAmount, 
  totalBalance, 
  taxVault, 
  upcomingBills,
  financialHealth = 'stable' 
}: SafeToSpendWidgetProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Determine colors based on financial health - DARK THEME
  const getHealthStyles = () => {
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

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
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
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-lg`}
              >
                <ShieldCheck className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl text-white">Safe to Spend</h2>
                <p className="text-sm text-gray-400 mt-0.5">Your true available balance</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className={`flex items-center gap-1 ${styles.textColor} hover:underline px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">Breakdown</span>
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
            className="mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline gap-2">
              <IndianRupee className={`w-10 h-10 ${styles.textColor}`} />
              <div className="gradient-text text-6xl">{formatIndianCurrency(safeAmount)}</div>
            </div>
            <motion.div
              className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${styles.bgOverlay} border border-white/10`}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className={`w-4 h-4 ${styles.textColor}`} />
              <span className="text-sm text-gray-300">
                {financialHealth === 'good' ? 'Healthy Balance' : financialHealth === 'caution' ? 'Monitor Spending' : 'Stable Position'}
              </span>
            </motion.div>
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
