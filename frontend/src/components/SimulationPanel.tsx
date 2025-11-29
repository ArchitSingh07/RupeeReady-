/**
 * SimulationPanel Component
 * 
 * Developer control panel for simulating bank events during demos.
 * Triggers RupeeSquad agents with various scenarios.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Zap, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Brain,
  RefreshCw,
  Settings,
  Target,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface SimulationScenario {
  id: string;
  name: string;
  type: 'income' | 'expense';
  amount: number;
  source?: string;
  category?: string;
  description?: string;
  isImpulse?: boolean;
}

interface SimulationPanelProps {
  onSimulateIncome: (amount: number, source: string) => void;
  onSimulateExpense: (amount: number, category: string, description: string, isImpulse?: boolean) => void;
  onRunScenario: (scenarioId: string) => void;
  onReset: () => void;
  scenarios: SimulationScenario[];
  agentStatus: {
    chanakya: 'active' | 'thinking' | 'idle';
    kavach: 'active' | 'alert' | 'idle';
    lakshmi: 'active' | 'celebrating' | 'idle';
  };
  stats: {
    safeToSpend: number;
    taxVault: number;
    goalsSavings: number;
    totalBalance: number;
    currentTaxRate: number;
    predictedNextMonth: 'high' | 'normal' | 'low';
  };
}

export function SimulationPanel({
  onSimulateIncome,
  onSimulateExpense,
  onRunScenario,
  onReset,
  scenarios,
  agentStatus,
  stats,
}: SimulationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [customAmount, setCustomAmount] = useState('');
  const [customSource, setCustomSource] = useState('');
  const [customCategory, setCustomCategory] = useState('food');
  const [customDescription, setCustomDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'thinking': return 'bg-amber-500';
      case 'alert': return 'bg-red-500';
      case 'celebrating': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'chanakya': return <Brain className="w-4 h-4" />;
      case 'kavach': return <Shield className="w-4 h-4" />;
      case 'lakshmi': return <Sparkles className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleCustomIncome = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0 && customSource) {
      onSimulateIncome(amount, customSource);
      setCustomAmount('');
      setCustomSource('');
    }
  };

  const handleCustomExpense = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0 && customDescription) {
      onSimulateExpense(amount, customCategory, customDescription, false);
      setCustomAmount('');
      setCustomDescription('');
    }
  };

  const categories = [
    'food', 'transport', 'shopping', 'entertainment', 
    'utilities', 'housing', 'healthcare', 'education', 'luxury'
  ];

  return (
    <Card className="glass-effect border border-white/10 overflow-hidden">
      {/* Header */}
      <motion.div
        className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Bank Simulation Panel</h3>
            <p className="text-xs text-gray-400">Developer Controls for Demo</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Agent Status Indicators */}
          <div className="flex items-center gap-2">
            {Object.entries(agentStatus).map(([agent, status]) => (
              <motion.div
                key={agent}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${getAgentStatusColor(status)} bg-opacity-20`}
                animate={status !== 'idle' ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: status !== 'idle' ? Infinity : 0 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${getAgentStatusColor(status)}`}
                  animate={status !== 'idle' ? { opacity: [1, 0.5, 1] } : {}}
                  transition={{ duration: 1, repeat: status !== 'idle' ? Infinity : 0 }}
                />
                <span className="text-xs text-white capitalize">{agent}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Quick Stats */}
            <div className="px-4 py-3 border-b border-white/10 grid grid-cols-4 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-400">Safe to Spend</p>
                <p className="text-teal-400 font-semibold">₹{formatIndianCurrency(stats.safeToSpend)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Tax Vault</p>
                <p className="text-orange-400 font-semibold">₹{formatIndianCurrency(stats.taxVault)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Tax Rate</p>
                <p className="text-purple-400 font-semibold">{stats.currentTaxRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Next Month</p>
                <Badge 
                  variant={stats.predictedNextMonth === 'high' ? 'default' : stats.predictedNextMonth === 'low' ? 'destructive' : 'secondary'}
                  className="mt-1"
                >
                  {stats.predictedNextMonth}
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 flex gap-2">
              <Button
                size="sm"
                variant={activeTab === 'quick' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('quick')}
                className={activeTab === 'quick' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'text-gray-400'}
              >
                <Zap className="w-4 h-4 mr-2" />
                Quick Scenarios
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'custom' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('custom')}
                className={activeTab === 'custom' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'text-gray-400'}
              >
                <Settings className="w-4 h-4 mr-2" />
                Custom
              </Button>
              <div className="flex-1" />
              <Button
                size="sm"
                variant="ghost"
                onClick={onReset}
                className="text-gray-400 hover:text-red-400"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              {activeTab === 'quick' ? (
                <div className="space-y-3">
                  {/* Income Scenarios */}
                  <div>
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      INCOME EVENTS (Triggers Chanakya)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {scenarios.filter(s => s.type === 'income').map(scenario => (
                        <Button
                          key={scenario.id}
                          variant="outline"
                          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 justify-start h-auto py-2"
                          onClick={() => onRunScenario(scenario.id)}
                        >
                          <div className="text-left">
                            <p className="text-sm">{scenario.name}</p>
                            <p className="text-xs text-gray-500">₹{scenario.amount.toLocaleString('en-IN')}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Expense Scenarios */}
                  <div>
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                      <ShoppingCart className="w-3 h-3" />
                      EXPENSE EVENTS (Triggers Kavach)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {scenarios.filter(s => s.type === 'expense').map(scenario => (
                        <Button
                          key={scenario.id}
                          variant="outline"
                          className={`justify-start h-auto py-2 ${
                            scenario.isImpulse 
                              ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                              : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                          }`}
                          onClick={() => onRunScenario(scenario.id)}
                        >
                          <div className="text-left">
                            <p className="text-sm flex items-center gap-1">
                              {scenario.name}
                              {scenario.isImpulse && <AlertTriangle className="w-3 h-3" />}
                            </p>
                            <p className="text-xs text-gray-500">₹{scenario.amount.toLocaleString('en-IN')}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Custom Income */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-xs text-emerald-400 mb-2 flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      SIMULATE INCOME
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={customAmount}
                        onChange={e => setCustomAmount(e.target.value)}
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Source (e.g., Swiggy)"
                        value={customSource}
                        onChange={e => setCustomSource(e.target.value)}
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                      <Button
                        onClick={handleCustomIncome}
                        className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Custom Expense */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="text-xs text-amber-400 mb-2 flex items-center gap-2">
                      <ShoppingCart className="w-3 h-3" />
                      SIMULATE EXPENSE
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Amount (₹)"
                          value={customAmount}
                          onChange={e => setCustomAmount(e.target.value)}
                          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                        />
                        <select
                          value={customCategory}
                          onChange={e => setCustomCategory(e.target.value)}
                          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-gray-900">
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Description (e.g., Amazon Shopping)"
                          value={customDescription}
                          onChange={e => setCustomDescription(e.target.value)}
                          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500/50"
                        />
                        <Button
                          onClick={handleCustomExpense}
                          className="bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default SimulationPanel;
