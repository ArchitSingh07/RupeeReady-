import { motion } from 'motion/react';
import { ShoppingBag, Coffee, Home, Car, Utensils, Heart, MoreHorizontal, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  isImpulse?: boolean;
  isIncome?: boolean;
}

interface TransactionFeedProps {
  transactions: Transaction[];
  onTransactionClick?: (transaction: Transaction) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingBag className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  coffee: <Coffee className="w-4 h-4" />,
  housing: <Home className="w-4 h-4" />,
  transport: <Car className="w-4 h-4" />,
  health: <Heart className="w-4 h-4" />,
  income: <TrendingUp className="w-4 h-4" />,
  other: <MoreHorizontal className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  shopping: 'from-purple-500 to-violet-500',
  food: 'from-orange-500 to-amber-500',
  coffee: 'from-amber-500 to-yellow-500',
  housing: 'from-blue-500 to-cyan-500',
  transport: 'from-green-500 to-emerald-500',
  health: 'from-red-500 to-pink-500',
  income: 'from-emerald-500 to-teal-500',
  other: 'from-gray-500 to-gray-600',
};

export function TransactionFeed({ transactions, onTransactionClick }: TransactionFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Recent Transactions</h2>
        <Badge className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30">
          Last 7 days
        </Badge>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="relative group"
              onClick={() => onTransactionClick?.(transaction)}
              data-squad-context="transaction"
              data-impulse={transaction.isImpulse}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/10 group-hover:to-purple-500/10 transition-all duration-300 blur-sm" />
              
              <div className="relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 cursor-pointer transition-all duration-300">
                <div className="flex items-center gap-3 flex-1">
                  {/* Category Icon */}
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${categoryColors[transaction.category] || categoryColors.other} shadow-lg`}>
                    {categoryIcons[transaction.category] || categoryIcons.other}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white group-hover:text-teal-400 transition-colors">
                        {transaction.description}
                      </p>
                      {transaction.isImpulse && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                        </motion.div>
                      )}
                      {transaction.isIncome && (
                        <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{transaction.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`${transaction.isIncome ? 'text-emerald-400' : 'text-white'}`}>
                    {transaction.isIncome ? '+' : ''}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                  <Badge className="bg-white/5 text-gray-400 border border-white/10 text-xs mt-1">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
