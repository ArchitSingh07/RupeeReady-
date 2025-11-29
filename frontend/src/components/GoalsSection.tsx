import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Plus, TrendingUp, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { formatIndianCurrency } from '../utils/indianCurrency';
import { AddGoalModal } from './AddGoalModal';
import { useFinancialData } from '../contexts/FinancialDataContext';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
}

interface GoalsSectionProps {
  goals: Goal[];
  onGoalClick?: (goal: Goal) => void;
}

export function GoalsSection({ goals: propGoals, onGoalClick }: GoalsSectionProps) {
  const { goals: contextGoals, refreshGoals } = useFinancialData();
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  // Use context goals if available, otherwise use prop goals (fallback mock data)
  const displayGoals = contextGoals.length > 0 ? contextGoals : propGoals;

  // Callback when modal closes to refresh goals
  const handleModalClose = () => {
    setShowAddGoal(false);
    // Goals will auto-refresh via context after creation
  };

  return (
    <div data-squad-context="goal">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl text-white">Savings Goals</h2>
        </div>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-teal-400 border border-teal-500/30 text-xs sm:text-sm"
          onClick={() => setShowAddGoal(true)}
          data-squad-context="goal"
          data-action="create"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">New Goal</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {displayGoals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400 text-sm">No goals yet. Create your first savings goal!</p>
          </div>
        ) : (
          displayGoals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const isComplete = progress >= 100;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
                onClick={() => onGoalClick?.(goal)}
                data-squad-context="goal"
                data-goal-id={goal.id}
                data-goal-status={isComplete ? 'complete' : 'active'}
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
                  style={{ background: `radial-gradient(circle at center, ${goal.color}40, transparent 70%)` }}
                />
                
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:border-teal-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${goal.color}80, ${goal.color})` 
                        }}
                        animate={isComplete ? {
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                          duration: 1,
                          repeat: isComplete ? Infinity : 0,
                        }}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Target className="w-5 h-5 text-white" />
                        )}
                      </motion.div>
                      <div>
                        <p className="text-white mb-0.5">{goal.name}</p>
                        <p className="text-xs text-gray-400">
                          ₹{goal.currentAmount.toLocaleString('en-IN')} of ₹{goal.targetAmount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-teal-400 mb-0.5">
                        {Math.min(progress, 100).toFixed(0)}%
                      </p>
                      {isComplete && (
                        <span className="text-xs text-emerald-400">Complete!</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      className="h-full relative"
                      style={{ 
                        background: `linear-gradient(90deg, ${goal.color}80, ${goal.color})` 
                      }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={showAddGoal}
        onClose={handleModalClose}
      />
    </div>
  );
}
