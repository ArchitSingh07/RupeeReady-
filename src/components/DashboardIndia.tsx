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
import { formatIndianCurrency } from '../utils/indianCurrency';
import { SafeToSpendWidget } from './SafeToSpendWidget';
import { TaxVault } from './TaxVault';
import { TransactionFeed } from './TransactionFeed';
import { GoalsSection } from './GoalsSection';
import { InsightsAlerts } from './InsightsAlerts';
import { IncomeSpendingChart } from './IncomeSpendingChart';
import { ProfitabilityWidget } from './ProfitabilityWidget';

interface DashboardIndiaProps {
  onLogout: () => void;
}

export function DashboardIndia({ onLogout }: DashboardIndiaProps) {
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
  
  // Agentic animation states
  const [newAlertAnimating, setNewAlertAnimating] = useState<string | null>(null);
  const [taxFlowAnimating, setTaxFlowAnimating] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'normal' | 'insight' | 'urgent'>('insight');

  // Mock data - all in Indian Rupees
  const mockTransactions = [
    { id: '1', description: 'Swiggy Income (NEW)', amount: 4500, category: 'income', date: 'Oct 19, 2025', isImpulse: false, isIncome: true },
    { id: '2', description: 'Chai Shop', amount: 40, category: 'coffee', date: 'Oct 16, 2025', isImpulse: false },
    { id: '3', description: 'D-Mart Groceries', amount: 1850, category: 'food', date: 'Oct 15, 2025', isImpulse: false },
    { id: '4', description: 'Ola Ride', amount: 180, category: 'transport', date: 'Oct 15, 2025', isImpulse: false },
    { id: '5', description: 'Designer Shoes - Myntra', amount: 3500, category: 'shopping', date: 'Oct 14, 2025', isImpulse: true },
    { id: '6', description: 'Rent Payment', amount: 15000, category: 'housing', date: 'Oct 13, 2025', isImpulse: false },
    { id: '7', description: 'Swiggy Order', amount: 650, category: 'food', date: 'Oct 13, 2025', isImpulse: false },
  ];

  const mockGoals = [
    { id: '1', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 68000, color: '#14B8A6' },
    { id: '2', name: 'Goa Trip', targetAmount: 50000, currentAmount: 32000, color: '#F59E0B' },
    { id: '3', name: 'New Laptop', targetAmount: 80000, currentAmount: 80000, color: '#8B5CF6' },
  ];

  const mockAlerts = [
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
      message: 'Your spending on "Food & Dining" is 40% of your income this month (₹18,400)',
      actionLabel: 'Review',
      character: 'chanakya',
    },
    {
      id: '3',
      type: 'security' as const,
      title: 'Low Safe-to-Spend Alert',
      message: 'Your Safe-to-Spend is ₹45,280. Consider reducing expenses to maintain buffer.',
      actionLabel: 'See Breakdown',
      character: 'chanakya',
    },
  ];

  const mockChartData = [
    { month: 'Apr', income: 42000, spending: 38000 },
    { month: 'May', income: 38500, spending: 35000 },
    { month: 'Jun', income: 52000, spending: 45000 },
    { month: 'Jul', income: 47000, spending: 42000 },
    { month: 'Aug', income: 49000, spending: 41000 },
    { month: 'Sep', income: 55000, spending: 48000 },
    { month: 'Oct', income: 46000, spending: 39280.50 },
  ];

  // Safe to Spend calculation
  const safeToSpend = 45280.50;
  const totalBalance = 75000;
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
    const alert = mockAlerts.find(a => a.id === id);
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
      <main className="container mx-auto px-6 py-8 pt-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
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
              className="glass-effect rounded-3xl border border-white/10 p-6 relative premium-card-hover"
            >
              {/* Chanakya icon for Tax Management */}
              <div className="absolute top-6 right-6 w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center border-2 border-white/10 shadow-lg z-10">
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
                {mockAlerts.map((alert, index) => {
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
                            onClick={() => handleAlertAction(alert.id)}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black text-xs px-3 py-1 shadow-lg shadow-teal-500/30"
                          >
                            {alert.actionLabel}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Goals Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-3xl border border-white/10 p-6 premium-card-hover"
            >
              {/* Lakshmi icon for Goals */}
              <div className="absolute top-6 right-6 w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center border-2 border-white/10 shadow-lg z-10">
                <span className="text-white text-xs">L</span>
              </div>
              <GoalsSection
                goals={mockGoals}
                onGoalClick={handleGoalClick}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedAlert && (
        <AlertDetailModal
          isOpen={!!selectedAlert}
          onClose={() => setSelectedAlert(null)}
          alertType={selectedAlert.type}
          alertTitle={selectedAlert.title}
        />
      )}

      {selectedGoal && (
        <GoalDetailModal
          isOpen={!!selectedGoal}
          onClose={() => setSelectedGoal(null)}
          goal={selectedGoal}
          onComplete={handleGoalComplete}
        />
      )}

      {showCelebration && (
        <CelebrationAnimation
          onComplete={() => {
            setShowCelebration(false);
            setTrioMood('happy');
            setActiveCharacter(null);
          }}
        />
      )}
    </div>
  );
}
