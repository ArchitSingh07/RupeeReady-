import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Bell, Settings, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { FinTrio } from './FinTrio';
import { SafeToSpendOrb } from './SafeToSpendOrb';
import { TaxVault } from './TaxVault';
import { TransactionFeed } from './TransactionFeed';
import { GoalsSection } from './GoalsSection';
import { InsightsAlerts } from './InsightsAlerts';
import { IncomeSpendingChart } from './IncomeSpendingChart';
import { GalacticBackground } from './GalacticBackground';
import { CelebrationAnimation } from './CelebrationAnimation';
import { Badge } from './ui/badge';

interface DashboardGalacticProps {
  onLogout: () => void;
}

export function DashboardGalactic({ onLogout }: DashboardGalacticProps) {
  const [trioMood, setTrioMood] = useState<'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'alert'>('happy');
  const [trioMessage, setTrioMessage] = useState<string>('');
  const [activeCharacter, setActiveCharacter] = useState<'pip' | 'glim' | 'flow' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Mock data
  const mockTransactions = [
    { id: '1', description: 'Coffee Shop', amount: 5.50, category: 'coffee', date: 'Oct 16, 2025', isImpulse: false },
    { id: '2', description: 'Grocery Store', amount: 82.40, category: 'food', date: 'Oct 15, 2025', isImpulse: false },
    { id: '3', description: 'Uber Ride', amount: 15.00, category: 'transport', date: 'Oct 15, 2025', isImpulse: false },
    { id: '4', description: 'Designer Sneakers', amount: 125.00, category: 'shopping', date: 'Oct 14, 2025', isImpulse: true },
    { id: '5', description: 'Rent Payment', amount: 1200.00, category: 'housing', date: 'Oct 13, 2025', isImpulse: false },
    { id: '6', description: 'Restaurant', amount: 45.30, category: 'food', date: 'Oct 13, 2025', isImpulse: false },
  ];

  const mockGoals = [
    { id: '1', name: 'Emergency Fund', targetAmount: 5000, currentAmount: 3400, color: '#06b6d4' },
    { id: '2', name: 'Vacation to Bali', targetAmount: 3000, currentAmount: 1850, color: '#ec4899' },
    { id: '3', name: 'New Laptop', targetAmount: 2000, currentAmount: 2000, color: '#fbbf24' },
  ];

  const mockAlerts = [
    {
      id: '1',
      type: 'impulse' as const,
      title: 'Impulse Purchase Detected',
      message: 'You spent $125 on designer sneakers. Glim noticed you\'ve made similar purchases that you later regretted.',
      actionLabel: 'View History',
    },
    {
      id: '2',
      type: 'subscription' as const,
      title: 'Unused Subscription',
      message: 'Pip found a $15.99/month subscription you haven\'t used in 2 months.',
      actionLabel: 'Review',
    },
    {
      id: '3',
      type: 'burnout' as const,
      title: 'Burnout Alert',
      message: 'You\'ve worked 14 consecutive days. Glim suggests taking a rest day.',
      actionLabel: 'Schedule Rest',
    },
  ];

  const mockChartData = [
    { month: 'Apr', income: 3200, spending: 2800 },
    { month: 'May', income: 2800, spending: 2500 },
    { month: 'Jun', income: 4100, spending: 3200 },
    { month: 'Jul', income: 3600, spending: 3100 },
    { month: 'Aug', income: 3900, spending: 2900 },
    { month: 'Sep', income: 4200, spending: 3400 },
    { month: 'Oct', income: 3500, spending: 2847.50 },
  ];

  const handleTransactionClick = (transaction: any) => {
    if (transaction.isImpulse) {
      setTrioMood('concerned');
      setActiveCharacter('glim');
      setTrioMessage(`Glim here! 🛡️ This ${transaction.description} purchase might be impulsive. Let's review your patterns.`);
      setTimeout(() => {
        setTrioMood('happy');
        setActiveCharacter(null);
        setTrioMessage('');
      }, 5000);
    }
  };

  const handleAlertDismiss = (id: string) => {
    console.log('Dismissed alert:', id);
  };

  const handleAlertAction = (id: string) => {
    setTrioMood('thinking');
    setActiveCharacter('pip');
    setTrioMessage('Pip analyzing... 🤓 Let me pull up the details for you!');
    setTimeout(() => {
      setTrioMood('happy');
      setActiveCharacter(null);
      setTrioMessage('');
    }, 3000);
  };

  const handleGoalComplete = () => {
    setShowCelebration(true);
    setTrioMood('celebrating');
    setActiveCharacter('flow');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-indigo-950/30 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-white/5">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 via-magenta-400 to-amber-400"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div>
                  <h1 className="text-lg bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                    Financial Guardian
                  </h1>
                  <p className="text-xs text-cyan-300/60">Welcome back, Alex!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative text-cyan-300 hover:text-cyan-200 hover:bg-white/5">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-magenta-500 text-white text-xs border-0">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-white/5">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-white/5">
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-magenta-400 hover:text-magenta-300 hover:bg-white/5"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Safe to Spend Orb - CENTER STAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <SafeToSpendOrb
                safeAmount={2847.50}
                totalBalance={5047.50}
                taxVault={850.00}
                upcomingBills={350.00}
                financialHealth="stable"
              />
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"
            >
              <IncomeSpendingChart data={mockChartData} />
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"
            >
              <TransactionFeed
                transactions={mockTransactions}
                onTransactionClick={handleTransactionClick}
              />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tax Vault */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"
            >
              <TaxVault
                currentAmount={850.00}
                estimatedAnnualTax={12000.00}
                taxRate={25}
              />
            </motion.div>

            {/* Insights & Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InsightsAlerts
                alerts={mockAlerts}
                onDismiss={handleAlertDismiss}
                onAction={handleAlertAction}
              />
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"
            >
              <GoalsSection goals={mockGoals} />
              <Button
                onClick={handleGoalComplete}
                className="w-full mt-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/50"
                size="sm"
              >
                Test Celebration 🎉
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-6"
            >
              <h3 className="text-sm text-cyan-200 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-cyan-100/60">Income</span>
                  <span className="text-sm text-white">$3,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-cyan-100/60">Expenses</span>
                  <span className="text-sm text-white">$2,847.50</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-cyan-200">Net</span>
                  <span className="text-sm text-amber-400">+$652.50</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Fin-Trio */}
      <FinTrio mood={trioMood} message={trioMessage} activeCharacter={activeCharacter} />

      {/* Celebration Animation */}
      <CelebrationAnimation
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        goalName="New Laptop"
      />
    </div>
  );
}
