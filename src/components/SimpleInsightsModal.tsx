import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Bell, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface SimpleInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimpleInsightsModal({ isOpen, onClose }: SimpleInsightsModalProps) {
  // Top 2-3 most important insights - simple and rule-based
  const topInsights = [
    {
      id: '1',
      icon: Bell,
      type: 'bill',
      title: 'Upcoming Bill Reminder',
      message: 'Airtel Bill Due in 3 Days (₹499)',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      id: '2',
      icon: TrendingUp,
      type: 'spending',
      title: 'High Spending Alert',
      message: 'Your spending on "Food & Dining" is 40% of your income this month (₹18,400 of ₹46,000)',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: '3',
      icon: AlertTriangle,
      type: 'warning',
      title: 'Low Safe-to-Spend',
      message: 'Your Safe-to-Spend balance is ₹45,280. Consider reducing expenses to maintain buffer.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal - Centered and fully visible */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 max-w-lg w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#212121]">Top Insights</h3>
                    <p className="text-xs text-[#212121]/70">Your RupeeSquad's key recommendations</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#212121]/60 hover:text-[#212121] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Insights List */}
              <div className="space-y-4">
                {topInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${insight.bgColor} ${insight.borderColor} border-2 rounded-2xl p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full ${insight.bgColor} ${insight.borderColor} border flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${insight.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm ${insight.color} mb-1`}>{insight.title}</h4>
                          <p className="text-sm text-[#212121]">{insight.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-[#212121]/70 mb-3">
                  These insights are generated based on your transaction patterns and upcoming bills.
                </p>
                <Button 
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
