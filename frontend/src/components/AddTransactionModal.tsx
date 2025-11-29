import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, IndianRupee, Tag, FileText, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { SpendingBlockedModal } from './SpendingBlockedModal';
import { toast } from 'sonner';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'income' | 'expense';
}

const categories = {
  income: [
    { value: 'salary', label: 'Salary', icon: '💰' },
    { value: 'freelance', label: 'Freelance', icon: '💼' },
    { value: 'gig', label: 'Gig Work', icon: '🚗' },
    { value: 'investment', label: 'Investment', icon: '📈' },
    { value: 'gift', label: 'Gift', icon: '🎁' },
    { value: 'other', label: 'Other', icon: '📝' },
  ],
  expense: [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'bills', label: 'Bills & Utilities', icon: '📱' },
    { value: 'health', label: 'Health', icon: '❤️' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'coffee', label: 'Coffee & Snacks', icon: '☕' },
    { value: 'other', label: 'Other', icon: '📝' },
  ],
};

export function AddTransactionModal({ isOpen, onClose, defaultType = 'expense' }: AddTransactionModalProps) {
  const { addNewTransaction, summary, cooldownPurchases, addCooldownPurchase } = useFinancialData();
  const [type, setType] = useState<'income' | 'expense'>(defaultType);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Kavach spending blocked state
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockedReason, setBlockedReason] = useState('');
  
  // Large purchase warning
  const [showLargePurchaseWarning, setShowLargePurchaseWarning] = useState(false);
  const LARGE_PURCHASE_THRESHOLD = 5000; // ₹5000 threshold for warning
  
  // Low balance warning
  const lowBalanceThreshold = 2000;
  const isLowBalance = summary.safeToSpend < lowBalanceThreshold;
  const wouldDepleteFunds = type === 'expense' && parseFloat(amount || '0') > summary.safeToSpend * 0.5;
  
  // Check if this purchase is on cooldown (user requested cooldown in last 24 hours)
  const isOnCooldown = (purchaseCategory: string, purchaseAmount: number) => {
    return cooldownPurchases.some(p => 
      p.category === purchaseCategory && 
      Math.abs(p.amount - purchaseAmount) < 100 // Similar amount check
    );
  };

  const handleSubmit = async (e: React.FormEvent, forceProceed = false) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    
    const purchaseAmount = parseFloat(amount);
    
    // Check if expense type
    if (type === 'expense') {
      // Check if this purchase is still on cooldown
      if (isOnCooldown(category, purchaseAmount)) {
        toast.error('This purchase is still on 24-hour cooldown. Please wait before trying again.');
        return;
      }
      
      // Check for large purchase warning (only show if not forced and above threshold)
      if (!forceProceed && purchaseAmount >= LARGE_PURCHASE_THRESHOLD) {
        setShowLargePurchaseWarning(true);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await addNewTransaction({
        type,
        amount: parseFloat(amount),
        category,
        description: description || `${type === 'income' ? 'Income' : 'Expense'} - ${category}`,
        isImpulse: false,
        isIncome: type === 'income',
      });
      
      if (result.success) {
        toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
        // Reset form
        setAmount('');
        setCategory('');
        setDescription('');
        onClose();
      } else if (result.error?.includes('BLOCKED') || result.error?.includes('blocked') || result.error?.includes('exceeds')) {
        // Show Kavach red screen takeover
        setBlockedReason(result.error);
        setShowBlockedModal(true);
      } else {
        toast.error(result.error || 'Failed to add transaction');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCoolDown = () => {
    // Store this purchase in cooldown
    addCooldownPurchase(parseFloat(amount), category);
    setShowBlockedModal(false);
    setShowLargePurchaseWarning(false);
    toast.info('24-hour cool-down activated. Take time to reflect on this purchase.');
    onClose();
  };
  
  const handleOverride = async () => {
    // User chose to override - process transaction anyway
    setShowBlockedModal(false);
    toast.warning('Override accepted. Transaction will be processed.');
    // In a full implementation, this would call a different endpoint that bypasses Kavach
    onClose();
  };

  const currentCategories = type === 'income' ? categories.income : categories.expense;

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAmount('');
    setCategory('');
    setDescription('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative w-full max-w-md glass-effect rounded-3xl border border-white/10 p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              {/* Header */}
              <div className="relative mb-6">
                <h2 className="text-2xl font-semibold text-white">Add Transaction</h2>
                <p className="text-gray-400 text-sm mt-1">Record your income or expense</p>
              </div>
              
              {/* Type Toggle */}
              <div className="relative flex gap-2 p-1 bg-white/5 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setType('income');
                    setCategory('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                    type === 'income'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType('expense');
                    setCategory('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                    type === 'expense'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                  Expense
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="relative space-y-5">
                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10 py-6 bg-white/5 border-white/10 text-white text-xl placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  {/* Low Balance Warning */}
                  {type === 'expense' && isLowBalance && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 mt-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <p className="text-xs text-amber-200">
                        Low balance warning: Only {formatIndianCurrency(summary.safeToSpend)} available
                      </p>
                    </motion.div>
                  )}
                  
                  {/* Exceeds Balance Warning */}
                  {type === 'expense' && parseFloat(amount || '0') > summary.safeToSpend && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 mt-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <p className="text-xs text-red-200">
                        Amount exceeds your Safe to Spend balance!
                      </p>
                    </motion.div>
                  )}
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {currentCategories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 ${
                          category === cat.value
                            ? type === 'income'
                              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50 border'
                              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50 border'
                            : 'bg-white/5 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className={`text-xs ${category === cat.value ? 'text-white' : 'text-gray-400'}`}>
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description (Optional)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Add a note..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="py-4 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                  />
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !amount || !category}
                  className={`w-full py-6 text-lg shadow-xl rounded-xl transition-all duration-300 ${
                    type === 'income'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 shadow-red-500/30'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full mx-auto"
                    />
                  ) : (
                    <>
                      {type === 'income' ? 'Add Income' : 'Add Expense'}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Large Purchase Warning Modal */}
      {showLargePurchaseWarning && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={() => setShowLargePurchaseWarning(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-md p-4"
          >
            <div className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 rounded-2xl border border-amber-500/30 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Large Purchase Alert</h3>
                  <p className="text-amber-200/80 text-sm">Lakshmi suggests taking a moment</p>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-xl p-4 mb-4">
                <p className="text-amber-100 mb-2">
                  You're about to spend <span className="font-bold text-amber-400">{formatIndianCurrency(parseFloat(amount))}</span> on {category}.
                </p>
                <p className="text-amber-200/70 text-sm">
                  This is {((parseFloat(amount) / summary.safeToSpend) * 100).toFixed(0)}% of your Safe to Spend balance.
                </p>
              </div>
              
              {wouldDepleteFunds && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-xs text-red-200">
                    This would use over half of your available balance!
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  onClick={handleCoolDown}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  24hr Cooldown
                </Button>
                <Button
                  onClick={(e) => {
                    setShowLargePurchaseWarning(false);
                    handleSubmit(e, true);
                  }}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Proceed Anyway
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Kavach Spending Blocked Modal */}
      <SpendingBlockedModal
        isOpen={showBlockedModal}
        amount={parseFloat(amount) || 0}
        category={category}
        reason={blockedReason}
        onCoolDown={handleCoolDown}
        onOverride={handleOverride}
      />
    </AnimatePresence>
  );
}
