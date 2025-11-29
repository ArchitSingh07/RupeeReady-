import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Target, TrendingUp, Calendar, DollarSign, IndianRupee, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { formatIndianCurrency } from '../utils/indianCurrency';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { toast } from 'sonner';

interface GoalDetailModalProps {
  goal: {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    color: string;
  } | null;
  onClose: () => void;
  onGoalCompleted?: () => void;
}

export function GoalDetailModal({ goal, onClose, onGoalCompleted }: GoalDetailModalProps) {
  const { updateGoal, deleteGoal } = useFinancialData();
  const [showContributionInput, setShowContributionInput] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!goal) return null;
  
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthsToGoal = remaining > 0 ? Math.ceil(remaining / 5000) : 0; // Assuming ₹5000/month contribution

  const handleClose = () => {
    setShowContributionInput(false);
    setContributionAmount('');
    setShowDeleteConfirm(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleAddContribution = async () => {
    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const newAmount = goal.currentAmount + parseFloat(contributionAmount);
      const result = await updateGoal(goal.id, { currentAmount: newAmount });
      
      if (result.success) {
        const newProgress = (newAmount / goal.targetAmount) * 100;
        if (newProgress >= 100) {
          toast.success('🎉 Congratulations! You have reached your goal!');
          setContributionAmount('');
          setShowContributionInput(false);
          setIsSubmitting(false);
          // Call the goal completed callback to trigger celebration
          if (onGoalCompleted) {
            onGoalCompleted();
          } else {
            handleClose();
          }
        } else {
          toast.success(`Added ₹${parseFloat(contributionAmount).toLocaleString('en-IN')} to ${goal.name}!`);
          setContributionAmount('');
          setShowContributionInput(false);
          setIsSubmitting(false);
          handleClose();
        }
      } else {
        toast.error(result.error || 'Failed to add contribution');
        setIsSubmitting(false);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleDeleteGoal = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const result = await deleteGoal(goal.id);
      
      if (result.success) {
        toast.success('Goal deleted successfully');
        handleClose();
      } else {
        toast.error(result.error || 'Failed to delete goal');
        setIsSubmitting(false);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

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
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="bg-[#141414] rounded-3xl border border-white/10 p-6 sm:p-8 max-w-lg w-full shadow-2xl glass-effect max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: goal.color }}
                >
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl mb-2 text-white">{goal.name}</h3>
              <p className="text-sm text-gray-400 mb-6">Track your progress and adjust contributions</p>

              {/* Progress Section */}
              <div className="bg-teal-500/10 rounded-2xl border border-teal-500/30 p-6 mb-6">
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <p className="text-sm text-teal-400 mb-1">Current Savings</p>
                    <p className="text-3xl text-white">{formatIndianCurrency(goal.currentAmount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-teal-400 mb-1">Target</p>
                    <p className="text-xl text-white">{formatIndianCurrency(goal.targetAmount)}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-teal-400 mb-2">
                    <span>{Math.round(progress)}% Complete</span>
                    <span>{formatIndianCurrency(remaining)} to go</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-400">Estimated Completion</p>
                  </div>
                  <p className="text-lg text-white">{monthsToGoal} months</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-400">Monthly Contribution</p>
                  </div>
                  <p className="text-lg text-white">{formatIndianCurrency(5000)}</p>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-amber-400 mb-1">Lakshmi's Tip</p>
                    <p className="text-sm text-gray-300">
                      You're doing great! Increasing your monthly contribution by just ₹1,000 would help you reach this goal 2 months earlier! 🌟
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {/* Contribution Input */}
                {showContributionInput ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="pl-10 py-4 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                        min="0"
                        step="100"
                        autoFocus
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => {
                          setShowContributionInput(false);
                          setContributionAmount('');
                        }}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddContribution}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black border-0"
                        disabled={isSubmitting || !contributionAmount}
                      >
                        {isSubmitting ? 'Adding...' : 'Confirm'}
                      </Button>
                    </div>
                  </div>
                ) : showDeleteConfirm ? (
                  <div className="space-y-3">
                    <p className="text-center text-gray-300 text-sm">Are you sure you want to delete this goal?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDeleteGoal}
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white border-0"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black border-0"
                      onClick={() => setShowContributionInput(true)}
                    >
                      <IndianRupee className="w-4 h-4 mr-2" />
                      Add Contribution
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Goal
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}