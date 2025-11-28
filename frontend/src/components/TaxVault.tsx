import { motion } from 'motion/react';
import { Shield, Plus, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface TaxVaultProps {
  currentAmount: number;
  estimatedAnnualTax: number;
  taxRate: number;
}

export function TaxVault({ currentAmount, estimatedAnnualTax, taxRate }: TaxVaultProps) {
  const progress = (currentAmount / estimatedAnnualTax) * 100;

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
            >
              <Plus className="w-4 h-4 mr-2" />
              Move to Vault
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-gray-300 hover:bg-white/5"
              size="sm"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Adjust Rate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
