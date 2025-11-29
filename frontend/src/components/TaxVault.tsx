import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Plus, TrendingUp, X, Check, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { formatIndianCurrency } from '../utils/indianCurrency';
import { toast } from 'sonner';

interface TaxVaultProps {
  currentAmount: number;
  estimatedAnnualTax: number;
  taxRate: number;
  safeBalance?: number;
  onMoveToVault?: (amount: number) => Promise<{ success: boolean; error?: string }>;
  onUpdateTaxRate?: (rate: number) => Promise<{ success: boolean; error?: string }>;
}

export function TaxVault({ currentAmount, estimatedAnnualTax, taxRate, safeBalance = 0, onMoveToVault, onUpdateTaxRate }: TaxVaultProps) {
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [moveAmount, setMoveAmount] = useState('');
  const [newRate, setNewRate] = useState(taxRate.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const progress = (currentAmount / estimatedAnnualTax) * 100;

  const handleMoveToVault = async () => {
    if (!moveAmount || parseFloat(moveAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const amount = parseFloat(moveAmount);
    if (amount > safeBalance) {
      toast.error('Amount exceeds your Safe to Spend balance');
      return;
    }
    
    setIsSubmitting(true);
    
    if (onMoveToVault) {
      const result = await onMoveToVault(amount);
      if (result.success) {
        toast.success(`Moved ${formatIndianCurrency(amount)} to Tax Vault`);
        setMoveAmount('');
        setShowMoveModal(false);
      } else {
        toast.error(result.error || 'Failed to move funds');
      }
    }
    
    setIsSubmitting(false);
  };

  const handleUpdateRate = async () => {
    const rate = parseInt(newRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      toast.error('Please enter a valid rate between 0 and 100');
      return;
    }
    
    setIsSubmitting(true);
    
    if (onUpdateTaxRate) {
      const result = await onUpdateTaxRate(rate);
      if (result.success) {
        toast.success(`Tax rate updated to ${rate}%`);
        setShowRateModal(false);
      } else {
        toast.error(result.error || 'Failed to update tax rate');
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div data-squad-context="tax-vault" className="relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L40 20 L40 35 L30 45 L20 35 L20 20 Z' fill='%23F59E0B' stroke='%23F59E0B' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-xl text-white">Tax Vault</h2>
          </div>
          <div className="text-right px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
            <p className="text-xs text-gray-400">Tax Rate</p>
            <p className="text-orange-400">{taxRate}%</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Amount */}
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl gradient-text">
                {formatIndianCurrency(currentAmount)}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Protected for tax payments
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Progress to Annual Goal</span>
              <span className="text-teal-400">
                {Math.min(progress, 100).toFixed(1)}%
              </span>
            </div>
            
            {/* Custom Progress Bar with Glow */}
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            
            <p className="text-xs text-gray-500">
              Est. Annual Tax: {formatIndianCurrency(estimatedAnnualTax)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 text-orange-400 border border-orange-500/30"
              size="sm"
              onClick={() => setShowMoveModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Move to Vault
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-gray-300 hover:bg-white/5"
              size="sm"
              onClick={() => {
                setNewRate(taxRate.toString());
                setShowRateModal(true);
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Adjust Rate
            </Button>
          </div>
        </div>
      </div>

      {/* Move to Vault Modal */}
      <AnimatePresence>
        {showMoveModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowMoveModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
            >
              <div className="bg-[#1a1a1a] rounded-2xl border border-orange-500/30 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Move to Tax Vault</h3>
                  <button
                    onClick={() => setShowMoveModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Available: {formatIndianCurrency(safeBalance)}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <Input
                        type="number"
                        value={moveAmount}
                        onChange={(e) => setMoveAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="pl-8 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  {/* Quick amount buttons */}
                  <div className="flex gap-2">
                    {[1000, 5000, 10000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setMoveAmount(amount.toString())}
                        className="flex-1 py-2 px-3 rounded-lg bg-orange-500/10 text-orange-400 text-sm hover:bg-orange-500/20 transition-colors"
                      >
                        ₹{amount.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                    onClick={handleMoveToVault}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Moving...' : 'Confirm Transfer'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Adjust Rate Modal */}
      <AnimatePresence>
        {showRateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowRateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
            >
              <div className="bg-[#1a1a1a] rounded-2xl border border-orange-500/30 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Adjust Tax Rate</h3>
                  <button
                    onClick={() => setShowRateModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-xs text-blue-300">
                      This percentage of your income will be automatically reserved for taxes.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Tax Rate (%)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        placeholder="30"
                        min="0"
                        max="100"
                        className="pr-8 bg-white/5 border-white/10 text-white"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                    </div>
                  </div>
                  
                  {/* Preset rates */}
                  <div className="flex gap-2">
                    {[10, 20, 30, 40].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setNewRate(rate.toString())}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition-colors ${
                          newRate === rate.toString()
                            ? 'bg-orange-500 text-white'
                            : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                    onClick={handleUpdateRate}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Save Tax Rate'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
