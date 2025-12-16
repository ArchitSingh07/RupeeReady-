import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { IndianRupee, ShoppingBag, Utensils, Car, Home, Heart, Sparkles } from 'lucide-react';
import { checkExpense } from '../services/api';
import { toast } from 'sonner';

interface TestExpenseProps {
  userId?: string;
  onExpenseChecked?: (result: any) => void;
}

const categories = [
  { value: 'food', label: 'Food & Dining', icon: Utensils, color: 'from-orange-500 to-red-500' },
  { value: 'transport', label: 'Transport', icon: Car, color: 'from-blue-500 to-cyan-500' },
  { value: 'groceries', label: 'Groceries', icon: ShoppingBag, color: 'from-green-500 to-emerald-500' },
  { value: 'healthcare', label: 'Healthcare', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { value: 'rent', label: 'Rent/Housing', icon: Home, color: 'from-purple-500 to-violet-500' },
  { value: 'entertainment', label: 'Entertainment', icon: Sparkles, color: 'from-yellow-500 to-amber-500' },
];

export function TestExpense({ userId = 'user_123', onExpenseChecked }: TestExpenseProps) {
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('food');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheckExpense = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await checkExpense(parseFloat(amount), selectedCategory, userId);
      setResult(response);
      
      if (response.status === 'APPROVED') {
        toast.success('Expense Approved!', {
          description: response.message,
        });
      } else {
        toast.error('Expense Blocked!', {
          description: response.message,
        });
      }

      onExpenseChecked?.(response);
    } catch (error) {
      toast.error('Failed to check expense', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedCat = categories.find(c => c.value === selectedCategory);

  return (
    <Card className="glass-effect border border-white/10 p-6">
      <div className="mb-6">
        <h3 className="text-xl text-white mb-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-sm">K</span>
          </div>
          Test Kavach Agent
        </h3>
        <p className="text-sm text-gray-400">Try submitting an expense to see Kavach in action</p>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <Label className="text-gray-300 mb-2 block">Amount</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <Label className="text-gray-300 mb-2 block">Category</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              
              return (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'border-teal-500 bg-teal-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${cat.color} flex items-center justify-center mx-auto mb-1`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-white">{cat.label}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleCheckExpense}
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black font-medium"
        >
          {loading ? 'Checking with Kavach...' : 'Check Expense'}
        </Button>

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              result.status === 'APPROVED'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                result.status === 'APPROVED'
                  ? 'bg-emerald-500'
                  : 'bg-red-500'
              }`}>
                <span className="text-white text-xl">
                  {result.status === 'APPROVED' ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-medium mb-1 ${
                  result.status === 'APPROVED' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {result.status === 'APPROVED' ? 'Expense Approved' : 'Expense Blocked'}
                </h4>
                <p className="text-xs text-gray-300 mb-2">{result.message}</p>
                {result.remaining_balance !== undefined && (
                  <p className="text-xs text-gray-400">
                    Remaining Balance: ₹{result.remaining_balance.toLocaleString('en-IN')}
                  </p>
                )}
                {result.motivation && (
                  <p className="text-xs text-gray-400 mt-2 italic">
                    {result.motivation}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
