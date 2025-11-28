import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface ProfitabilityWidgetProps {
  totalIncome: number;
  totalExpenses: number;
  insight?: string;
}

export function ProfitabilityWidget({ totalIncome, totalExpenses, insight }: ProfitabilityWidgetProps) {
  const netProfitLoss = totalIncome - totalExpenses;
  const isProfit = netProfitLoss >= 0;
  const expensePercentage = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(0) : 0;

  return (
    <Card 
      className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 p-6 relative overflow-hidden"
      data-context="profitability"
      data-character="chanakya"
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 30%, #0d9488 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm text-teal-700">This Month's Cash Flow</h3>
        </div>

        <div className="space-y-4">
          {/* Income */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#212121]/70">Total Income So Far</span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg text-emerald-600"
            >
              {formatIndianCurrency(totalIncome)}
            </motion.span>
          </div>

          {/* Expenses */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#212121]/70">Total Expenses So Far</span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-orange-600"
            >
              {formatIndianCurrency(totalExpenses)}
            </motion.span>
          </div>

          {/* Divider */}
          <div className="border-t border-teal-200"></div>

          {/* Net Profit/Loss */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-teal-700">Net {isProfit ? 'Profit' : 'Loss'}</span>
              {isProfit ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}
            >
              {isProfit ? '+' : ''}{formatIndianCurrency(netProfitLoss)}
            </motion.span>
          </div>

          {/* AI Insight from Chanakya */}
          {insight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-3 bg-white/60 rounded-lg border border-teal-200"
            >
              <div className="flex items-start gap-2">
                <div className="text-xs text-[#212121]/60 mb-1">💡 Chanakya's Insight:</div>
              </div>
              <p className="text-xs text-[#212121]/80 leading-relaxed">
                {insight}
              </p>
            </motion.div>
          )}

          {/* Quick Stats */}
          <div className="mt-3 pt-3 border-t border-teal-200/50">
            <p className="text-xs text-[#212121]/60">
              Your business expenses are <span className="text-teal-700">{expensePercentage}%</span> of your income this month.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
