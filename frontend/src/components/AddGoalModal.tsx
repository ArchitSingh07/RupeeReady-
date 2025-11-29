import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Target, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { toast } from 'sonner';

// Timeout helper for promises
const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out. Please try again.')), ms)
  );
  return Promise.race([promise, timeout]);
};

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const goalColors = [
  { value: '#14B8A6', name: 'Teal' },
  { value: '#F59E0B', name: 'Amber' },
  { value: '#8B5CF6', name: 'Purple' },
  { value: '#EF4444', name: 'Red' },
  { value: '#3B82F6', name: 'Blue' },
  { value: '#EC4899', name: 'Pink' },
  { value: '#10B981', name: 'Green' },
  { value: '#F97316', name: 'Orange' },
];

const goalPresets = [
  { name: 'Emergency Fund', icon: '🛡️', amount: 100000 },
  { name: 'Vacation', icon: '✈️', amount: 50000 },
  { name: 'New Laptop', icon: '💻', amount: 80000 },
  { name: 'Wedding', icon: '💍', amount: 500000 },
  { name: 'Car', icon: '🚗', amount: 300000 },
  { name: 'Home Downpayment', icon: '🏠', amount: 1000000 },
];

export function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
  const { addNewGoal } = useFinancialData();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState(goalColors[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setName('');
    setTargetAmount('');
    setSelectedColor(goalColors[0].value);
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    if (isSubmitting) return; // Don't close while submitting
    resetForm();
    onClose();
  }, [isSubmitting, onClose, resetForm]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  }, [handleClose]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handlePresetSelect = useCallback((preset: typeof goalPresets[0]) => {
    setName(preset.name);
    setTargetAmount(preset.amount.toString());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!name.trim()) {
      toast.error('Please enter a goal name');
      return;
    }
    
    if (!targetAmount || parseFloat(targetAmount) <= 0) {
      toast.error('Please enter a valid target amount');
      return;
    }
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      // Add 15 second timeout to prevent infinite loading
      const result = await withTimeout(
        addNewGoal({
          name: name.trim(),
          targetAmount: parseFloat(targetAmount),
          currentAmount: 0,
          color: selectedColor,
        }),
        15000
      );
      
      if (result.success) {
        toast.success('Goal created successfully! 🎯');
        resetForm();
        onClose();
      } else {
        toast.error(result.error || 'Failed to create goal');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('Error creating goal:', err);
      toast.error(err?.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={handleModalClick}
              className="relative w-full max-w-md bg-[#141414] rounded-3xl border border-white/10 p-6 overflow-hidden max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              {/* Header */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Create New Goal</h2>
                <p className="text-gray-400 text-sm mt-1">Set a savings goal and start tracking your progress</p>
              </div>
              
              {/* Quick Presets */}
              <div className="relative mb-6">
                <Label className="text-gray-300 text-sm mb-3 block">Quick Presets</Label>
                <div className="grid grid-cols-3 gap-2">
                  {goalPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      disabled={isSubmitting}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 disabled:opacity-50 ${
                        name === preset.name
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 border'
                          : 'bg-white/5 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-lg">{preset.icon}</span>
                      <span className={`text-xs text-center ${name === preset.name ? 'text-white' : 'text-gray-400'}`}>
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="relative space-y-5">
                {/* Goal Name */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Goal Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g., New Laptop"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-4 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    required
                  />
                </div>
                
                {/* Target Amount */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    Target Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="pl-10 py-6 bg-white/5 border-white/10 text-white text-xl placeholder:text-gray-600 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                      min="0"
                      step="100"
                      required
                    />
                  </div>
                </div>
                
                {/* Color Selection */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Goal Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {goalColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        disabled={isSubmitting}
                        className={`w-10 h-10 rounded-xl transition-all duration-200 disabled:opacity-50 ${
                          selectedColor === color.value
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-[#141414] scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={handleClose}
                    variant="outline"
                    disabled={isSubmitting}
                    className="flex-1 py-5 text-base border-white/20 text-white hover:bg-white/10 rounded-xl disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !targetAmount || parseFloat(targetAmount) <= 0}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-1 py-5 text-base shadow-xl rounded-xl transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/30 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                        />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Goal'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
