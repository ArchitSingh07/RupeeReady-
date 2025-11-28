import { motion, AnimatePresence } from 'motion/react';
import { X, Target, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface GoalDetailModalProps {
  goal: {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    color: string;
  } | null;
  onClose: () => void;
}

export function GoalDetailModal({ goal, onClose }: GoalDetailModalProps) {
  if (!goal) return null;
  
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsToGoal = Math.ceil(remaining / 5000); // Assuming ₹5000/month contribution

  return (
    <AnimatePresence>
      {goal && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              className="bg-white rounded-3xl border-2 border-gray-200 p-8 max-w-lg w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: goal.color }}
                >
                  <Target className="w-7 h-7 text-white" />
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-2xl mb-2 text-gray-900">{goal.name}</h3>
              <p className="text-sm text-gray-600 mb-6">Track your progress and adjust contributions</p>

              {/* Progress Section */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 p-6 mb-6">
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <p className="text-sm text-teal-700 mb-1">Current Savings</p>
                    <p className="text-3xl text-teal-900">{formatIndianCurrency(goal.currentAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-teal-700 mb-1">Target</p>
                    <p className="text-xl text-teal-900">{formatIndianCurrency(goal.targetAmount)}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-teal-700 mb-2">
                    <span>{Math.round(progress)}% Complete</span>
                    <span>{formatIndianCurrency(remaining)} to go</span>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-600 to-cyan-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Estimated Completion</p>
                  </div>
                  <p className="text-lg text-gray-900">{monthsToGoal} months</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Monthly Contribution</p>
                  </div>
                  <p className="text-lg text-gray-900">{formatIndianCurrency(5000)}</p>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-900 mb-1">Lakshmi's Tip</p>
                    <p className="text-sm text-amber-800">
                      You're doing great! Increasing your monthly contribution by just ₹1,000 would help you reach this goal 2 months earlier! 🌟
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 border-0"
                  onClick={() => {
                    console.log('Add Contribution');
                    onClose();
                  }}
                >
                  Add Contribution
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('Adjust Target');
                      onClose();
                    }}
                  >
                    Adjust Target
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('View History');
                      onClose();
                    }}
                  >
                    View History
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}