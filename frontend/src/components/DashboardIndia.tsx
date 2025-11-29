import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { RupeeSquad } from './RupeeSquad';
import { CelebrationAnimation } from './CelebrationAnimation';
import { AlertDetailModal } from './AlertDetailModal';
import { GoalDetailModal } from './GoalDetailModal';
import { NotificationsModal } from './NotificationsModal';
import { SettingsModal } from './SettingsModal';
import { ProfileModal } from './ProfileModal';
import { SimpleInsightsModal } from './SimpleInsightsModal';
import { AddTransactionModal } from './AddTransactionModal';
import { formatIndianCurrency } from '../utils/indianCurrency';
import { SafeToSpendWidget } from './SafeToSpendWidget';
import { TaxVault } from './TaxVault';
import { TransactionFeed } from './TransactionFeed';
import { GoalsSection } from './GoalsSection';
import { InsightsAlerts } from './InsightsAlerts';
import { IncomeSpendingChart } from './IncomeSpendingChart';
import { ProfitabilityWidget } from './ProfitabilityWidget';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFinancialData } from '../contexts/FinancialDataContext';

interface DashboardIndiaProps {
  onLogout: () => void;
  onProfile?: () => void;
}

export function DashboardIndia({ onLogout, onProfile }: DashboardIndiaProps) {
  const { userProfile } = useAuth();
  const { transactions, goals, alerts, summary, loading } = useFinancialData();
  
  const [trioMood, setTrioMood] = useState<'happy' | 'thinking' | 'concerned' | 'celebrating' | 'curious' | 'alert'>('happy');
  const [trioMessage, setTrioMessage] = useState<string>('');
  const [activeCharacter, setActiveCharacter] = useState<'chanakya' | 'kavach' | 'lakshmi' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Modal states
  const [selectedAlert, setSelectedAlert] = useState<{ type: 'bill' | 'overspending' | 'security'; title: string } | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [addTransactionType, setAddTransactionType] = useState<'income' | 'expense'>('expense');
  
  // Agentic animation states
  const [newAlertAnimating, setNewAlertAnimating] = useState<string | null>(null);
  const [taxFlowAnimating, setTaxFlowAnimating] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'normal' | 'insight' | 'urgent'>('insight');

  // Use real data from context, with fallback to mock data if empty
  const displayTransactions = transactions.length > 0 ? transactions.map(t => ({
    id: t.id,
    description: t.description,
    amount: t.amount,
    category: t.category,
    date: t.date || new Date(t.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    isImpulse: t.isImpulse || false,
    isIncome: t.type === 'income',
  })) : [
    { id: '1', description: 'Swiggy Income (NEW)', amount: 4500, category: 'income', date: 'Nov 29, 2025', isImpulse: false, isIncome: true },
    { id: '2', description: 'Chai Shop', amount: 40, category: 'coffee', date: 'Nov 28, 2025', isImpulse: false, isIncome: false },
    { id: '3', description: 'D-Mart Groceries', amount: 1850, category: 'food', date: 'Nov 27, 2025', isImpulse: false, isIncome: false },
    { id: '4', description: 'Ola Ride', amount: 180, category: 'transport', date: 'Nov 26, 2025', isImpulse: false, isIncome: false },
    { id: '5', description: 'Designer Shoes - Myntra', amount: 3500, category: 'shopping', date: 'Nov 25, 2025', isImpulse: true, isIncome: false },
  ];

  const displayGoals = goals.length > 0 ? goals : [
    { id: '1', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 68000, color: '#14B8A6' },
    { id: '2', name: 'Goa Trip', targetAmount: 50000, currentAmount: 32000, color: '#F59E0B' },
    { id: '3', name: 'New Laptop', targetAmount: 80000, currentAmount: 80000, color: '#8B5CF6' },
  ];

  const displayAlerts = alerts.length > 0 ? alerts.map(a => ({
    id: a.id,
    type: a.type as 'bill' | 'overspending' | 'security',
    title: a.title,
    message: a.message,
    actionLabel: a.actionLabel,
    character: a.character || 'chanakya',
  })) : [
    {
      id: '1',
      type: 'bill' as const,
      title: 'Upcoming Bill Reminder',
      message: 'Airtel Bill Due in 3 Days (₹499). Avoid late fees!',
      actionLabel: 'View Details',
      character: 'kavach',
    },
    {
      id: '2',
      type: 'overspending' as const,
      title: 'High Spending Category',
      message: 'Your spending on "Food & Dining" is 40% of your income this month',
      actionLabel: 'Review',
      character: 'chanakya',
    },
  ];

  const mockChartData = [
    { month: 'Jun', income: 42000, spending: 38000 },
    { month: 'Jul', income: 38500, spending: 35000 },
    { month: 'Aug', income: 52000, spending: 45000 },
    { month: 'Sep', income: 47000, spending: 42000 },
    { month: 'Oct', income: 49000, spending: 41000 },
    { month: 'Nov', income: summary.totalIncome || 55000, spending: summary.totalExpenses || 48000 },
  ];

  // Safe to Spend calculation - use real data from context
  const safeToSpend = summary.safeToSpend || 45280.50;
  const totalBalance = summary.totalBalance || 75000;
  const taxVault = 22500;
  const upcomingBills = 7219.50;
  const financialHealth: 'stable' | 'good' | 'caution' = 'stable';

  // Demonstrate tax vault automation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setTaxFlowAnimating(true);
      setTrioMood('thinking');
      setActiveCharacter('chanakya');
      setTrioMessage('Chanakya here! 🤓 I just automatically set aside 30% of your Swiggy income for taxes!');
      
      setTimeout(() => {
        setTaxFlowAnimating(false);
        setTrioMood('happy');
        setActiveCharacter(null);
        setTrioMessage('');
      }, 4000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTransactionClick = (transaction: any) => {
    if (transaction.isImpulse) {
      setTrioMood('concerned');
      setActiveCharacter('kavach');
      setTrioMessage(`Kavach here! 🛡️ This ${transaction.description} purchase might be impulsive. Let's review.`);
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
    const alert = displayAlerts.find((a: any) => a.id === id);
    if (alert) {
      setNewAlertAnimating(id);
      setSelectedAlert({ type: alert.type, title: alert.title });
      
      setTimeout(() => {
        setNewAlertAnimating(null);
      }, 1000);
    }
    
    setTrioMood('thinking');
    setActiveCharacter('chanakya');
    setTrioMessage('Chanakya analyzing... 🤓 Let me pull up the details!');
    setTimeout(() => {
      setTrioMood('happy');
      setActiveCharacter(null);
      setTrioMessage('');
    }, 3000);
  };

  const handleGoalClick = (goal: any) => {
    setSelectedGoal(goal);
    setTrioMood('happy');
    setActiveCharacter('lakshmi');
    setTrioMessage(`Let's review your ${goal.name} progress! You're doing great! 🎯`);
    setTimeout(() => {
      setActiveCharacter(null);
      setTrioMessage('');
    }, 3000);
  };

  const handleGoalComplete = () => {
    setShowCelebration(true);
    setTrioMood('celebrating');
    setActiveCharacter('lakshmi');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Safe to Spend Card - CENTER STAGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SafeToSpendWidget
                safeAmount={safeToSpend}
                totalBalance={totalBalance}
                taxVault={taxVault}
                upcomingBills={upcomingBills}
                financialHealth={financialHealth}
              />
            </motion.div>

            {/* Chart with Chanakya's icon for insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-3xl border border-white/10 p-6 relative premium-card-hover"
            >
              {/* Chanakya icon for Cash Flow Analysis */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full px-3 py-1.5 border border-orange-500/30">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs">C</span>
                </div>
                <span className="text-xs text-orange-400">Chanakya's Analysis</span>
              </div>
              <IncomeSpendingChart data={mockChartData} />
            </motion.div>

            {/* Transactions with Tax Vault Flow Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-3xl border border-white/10 p-6 relative overflow-visible premium-card-hover"
            >
              {/* Tax Flow Animation */}
              <AnimatePresence>
                {taxFlowAnimating && (
                  <motion.div
                    className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    initial={{ opacity: 0, y: 0, x: '-50%' }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      y: [0, -20, -120, -140],
                      x: ['-50%', '-50%', '200%', '250%']
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  >
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black px-4 py-2 rounded-full shadow-2xl shadow-teal-500/50">
                      ₹1,350 → Tax Vault 💰
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <TransactionFeed
                transactions={displayTransactions}
                onTransactionClick={handleTransactionClick}
              />
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Tax Vault */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 relative premium-card-hover"
            >
              {/* Chanakya icon for Tax Management */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center border-2 border-white/10 shadow-lg z-10">
                <span className="text-white text-xs">C</span>
              </div>
              <TaxVault
                currentAmount={22500}
                estimatedAnnualTax={120000}
                taxRate={30}
              />
            </motion.div>

            {/* Insights & Alerts with character icons and animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Alert Animation Indicator */}
              <AnimatePresence>
                {newAlertAnimating && (
                  <motion.div
                    className="absolute -top-2 -right-2 z-50"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-teal-500/50">
                      <span className="text-white text-lg">👀</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Enhanced alerts with character attribution */}
              <div className="space-y-3">
                {displayAlerts.map((alert: any, index: number) => {
                  const characterIcons = {
                    kavach: { bg: 'from-teal-500 to-emerald-500', initial: 'K' },
                    chanakya: { bg: 'from-orange-500 to-amber-500', initial: 'C' },
                    lakshmi: { bg: 'from-amber-500 to-orange-500', initial: 'L' },
                  };
                  const char = characterIcons[alert.character as keyof typeof characterIcons];
                  
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: newAlertAnimating === alert.id ? [1, 1.05, 1] : 1
                      }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Character attribution icon */}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#141414] shadow-lg flex items-center justify-center border border-white/10">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${char.bg} flex items-center justify-center`}>
                          <span className="text-white text-xs">{char.initial}</span>
                        </div>
                      </div>
                      
                      {/* Alert Card */}
                      <div className="glass-effect rounded-2xl border border-white/10 p-4 pl-8 hover:border-teal-500/30 transition-all duration-300 cursor-pointer group">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm text-white mb-1 group-hover:text-teal-400 transition-colors">{alert.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{alert.message}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAlertAction(alert.id);
                            }}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black text-xs px-3 py-1 shadow-lg shadow-teal-500/30"
                          >
                            {alert.actionLabel}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                {/* View All Insights Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInsights(true)}
                  className="w-full mt-4 p-3 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 text-teal-400 text-sm hover:from-teal-500/20 hover:to-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>💡</span>
                  View All Insights
                </motion.button>
              </div>
            </motion.div>

            {/* Goals Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-3xl border border-white/10 p-6 premium-card-hover relative"
            >
              {/* Lakshmi icon for Goals */}
              <div className="absolute top-6 right-6 w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center border-2 border-white/10 shadow-lg z-10">
                <span className="text-white text-xs">L</span>
              </div>
              <GoalsSection
                goals={displayGoals}
                onGoalClick={handleGoalClick}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Add Transaction */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setAddTransactionType('income');
            setShowAddTransaction(true);
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white hover:shadow-xl transition-shadow"
          title="Add Income"
        >
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setAddTransactionType('expense');
            setShowAddTransaction(true);
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center text-white hover:shadow-xl transition-shadow"
          title="Add Expense"
        >
          <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Modals */}
      {selectedAlert && (
        <AlertDetailModal
          alert={{ type: selectedAlert.type as 'subscription' | 'impulse' | 'burnout', title: selectedAlert.title }}
          onClose={() => setSelectedAlert(null)}
        />
      )}

      {selectedGoal && (
        <GoalDetailModal
          goal={selectedGoal}
          onClose={() => {
            setSelectedGoal(null);
            handleGoalComplete();
          }}
        />
      )}

      {showCelebration && (
        <CelebrationAnimation
          isVisible={showCelebration}
          onClose={() => {
            setShowCelebration(false);
            setTrioMood('happy');
            setActiveCharacter(null);
          }}
        />
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        defaultType={addTransactionType}
      />

      {/* Insights Modal */}
      <SimpleInsightsModal
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}
