import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { AICompanion } from './AICompanion';
import { DarkModeToggle } from './DarkModeToggle';
import { SafeToSpendWidget } from './SafeToSpendWidget';
import { TaxVault } from './TaxVault';
import { TransactionFeed } from './TransactionFeed';
import { GoalsSection } from './GoalsSection';
import { InsightsAlerts } from './InsightsAlerts';
import { IncomeSpendingChart } from './IncomeSpendingChart';
import { Badge } from './ui/badge';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [aiMood, setAiMood] = useState<'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'neutral'>('happy');
  const [aiMessage, setAiMessage] = useState<string>('');

  // Mock data
  const mockTransactions = [
    { id: '1', description: 'Coffee Shop', amount: 5.50, category: 'coffee', date: 'Oct 16, 2025', isImpulse: false },
    { id: '2', description: 'Grocery Store', amount: 82.40, category: 'food', date: 'Oct 15, 2025', isImpulse: false },
    { id: '3', description: 'Uber Ride', amount: 15.00, category: 'transport', date: 'Oct 15, 2025', isImpulse: false },
    { id: '4', description: 'Designer Sneakers', amount: 125.00, category: 'shopping', date: 'Oct 14, 2025', isImpulse: true },
    { id: '5', description: 'Rent Payment', amount: 1200.00, category: 'housing', date: 'Oct 13, 2025', isImpulse: false },
    { id: '6', description: 'Restaurant', amount: 45.30, category: 'food', date: 'Oct 13, 2025', isImpulse: false },
    { id: '7', description: 'Gas Station', amount: 40.00, category: 'transport', date: 'Oct 12, 2025', isImpulse: false },
    { id: '8', description: 'Coffee Shop', amount: 6.00, category: 'coffee', date: 'Oct 12, 2025', isImpulse: true },
  ];

  const mockGoals = [
    { id: '1', name: 'Emergency Fund', targetAmount: 5000, currentAmount: 3400, color: '#3b82f6' },
    { id: '2', name: 'Vacation to Bali', targetAmount: 3000, currentAmount: 1850, color: '#10b981' },
    { id: '3', name: 'New Laptop', targetAmount: 2000, currentAmount: 2000, color: '#f59e0b' },
  ];

  const mockAlerts = [
    {
      id: '1',
      type: 'impulse' as const,
      title: 'Impulse Purchase Detected',
      message: 'You spent $125 on designer sneakers. In the past 3 months, you\'ve made similar purchases that you later regretted. Take a moment to think about this.',
      actionLabel: 'View History',
    },
    {
      id: '2',
      type: 'subscription' as const,
      title: 'Unused Subscription Found',
      message: 'You haven\'t used your Premium Streaming subscription in 2 months. Consider canceling to save $15.99/month.',
      actionLabel: 'Review Subscriptions',
    },
    {
      id: '3',
      type: 'burnout' as const,
      title: 'Gig-Work Burnout Alert',
      message: 'You\'ve worked 14 consecutive days with an average of 12 hours/day. Consider taking a rest day for your wellbeing.',
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
      setAiMood('concerned');
      setAiMessage(`I noticed this ${transaction.description} purchase. Want to talk about it?`);
      setTimeout(() => {
        setAiMood('happy');
        setAiMessage('');
      }, 5000);
    }
  };

  const handleAlertDismiss = (id: string) => {
    // In a real app, this would update state
    console.log('Dismissed alert:', id);
  };

  const handleAlertAction = (id: string) => {
    // In a real app, this would navigate or open a modal
    console.log('Action for alert:', id);
    setAiMood('thinking');
    setAiMessage('Let me help you with that...');
    setTimeout(() => {
      setAiMood('happy');
      setAiMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <AICompanion mood="happy" position="inline" />
                <div>
                  <h1 className="text-lg">AI Financial Guardian</h1>
                  <p className="text-xs text-muted-foreground">Welcome back, Alex!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Safe to Spend Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SafeToSpendWidget
                safeAmount={2847.50}
                totalBalance={5047.50}
                taxVault={850.00}
                upcomingBills={350.00}
              />
            </motion.div>

            {/* Tax Vault */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TaxVault
                currentAmount={850.00}
                estimatedAnnualTax={12000.00}
                taxRate={25}
              />
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <IncomeSpendingChart data={mockChartData} />
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TransactionFeed
                transactions={mockTransactions}
                onTransactionClick={handleTransactionClick}
              />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
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
            >
              <GoalsSection goals={mockGoals} />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"
            >
              <h3 className="text-sm mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Income</span>
                  <span className="text-sm">$3,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expenses</span>
                  <span className="text-sm">$2,847.50</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300 dark:border-gray-700">
                  <span className="text-sm">Net</span>
                  <span className="text-sm text-green-600 dark:text-green-400">+$652.50</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating AI Companion */}
      <AICompanion mood={aiMood} message={aiMessage} />
    </div>
  );
}
