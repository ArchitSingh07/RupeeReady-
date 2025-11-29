import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Zap, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface ZeroStateDashboardProps {
  onSimulateIncome: (amount: number) => void;
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export function ZeroStateDashboard({ onSimulateIncome, onAddIncome, onAddExpense }: ZeroStateDashboardProps) {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8">
      {/* Center Stage: The Glowing Orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="relative mb-12"
      >
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(100,116,139,0.2) 0%, transparent 70%)',
            transform: 'scale(2.5)',
          }}
          animate={{
            scale: [2.5, 3, 2.5],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Main Orb */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 shadow-2xl flex flex-col items-center justify-center border border-slate-500/30">
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-slate-500/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Shield icon */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400 mb-2" />
          </motion.div>
          
          {/* Safe to Spend text */}
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">Safe to Spend</p>
            <p className="text-slate-300 text-3xl sm:text-4xl font-bold">₹0</p>
          </div>
        </div>
        
        {/* Status text below orb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-gray-400 text-sm">Waiting for your first income...</p>
        </motion.div>
      </motion.div>

      {/* Agent Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 rounded-full border border-slate-700/50 mb-8"
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-teal-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-slate-400 text-sm">🛡️ RupeeSquad Active: Monitoring for Income...</span>
      </motion.div>

      {/* Tax Vault in Corner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed top-32 right-6 glass-effect rounded-2xl p-4 border border-slate-700/50 w-48"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600/50">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p className="text-slate-500 text-xs">Tax Vault</p>
            <p className="text-slate-400 text-lg font-bold">₹0</p>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full" />
        </div>
        <p className="text-slate-600 text-xs mt-2">Empty • Awaiting income</p>
      </motion.div>

      {/* The Three Agents Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mb-8"
      >
        {/* Chanakya */}
        <motion.div
          onMouseEnter={() => setHoveredAgent('chanakya')}
          onMouseLeave={() => setHoveredAgent(null)}
          className={`glass-effect rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
            hoveredAgent === 'chanakya' ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10'
          }`}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Chanakya</p>
              <p className="text-orange-400 text-xs">The Analyst</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs">Splits your income for taxes automatically</p>
        </motion.div>

        {/* Kavach */}
        <motion.div
          onMouseEnter={() => setHoveredAgent('kavach')}
          onMouseLeave={() => setHoveredAgent(null)}
          className={`glass-effect rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
            hoveredAgent === 'kavach' ? 'border-teal-500/50 bg-teal-500/5' : 'border-white/10'
          }`}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Kavach</p>
              <p className="text-teal-400 text-xs">The Guardian</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs">Protects you from overspending</p>
        </motion.div>

        {/* Lakshmi */}
        <motion.div
          onMouseEnter={() => setHoveredAgent('lakshmi')}
          onMouseLeave={() => setHoveredAgent(null)}
          className={`glass-effect rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
            hoveredAgent === 'lakshmi' ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/10'
          }`}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">L</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Lakshmi</p>
              <p className="text-amber-400 text-xs">The Motivator</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs">Celebrates your wins & keeps you motivated</p>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        {/* Simulate Salary (Dev Button) */}
        <Button
          onClick={() => onSimulateIncome(30000)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/30 px-6 py-3"
        >
          <Zap className="w-5 h-5 mr-2" />
          Simulate ₹30,000 Salary
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={onAddIncome}
            variant="outline"
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Add Income
          </Button>
          <Button
            onClick={onAddExpense}
            variant="outline"
            className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </motion.div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-600 text-xs mt-8 text-center"
      >
        💡 Click "Simulate Salary" to see how RupeeSquad manages your money automatically
      </motion.p>
    </div>
  );
}
