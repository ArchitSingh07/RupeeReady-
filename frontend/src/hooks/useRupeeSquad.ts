/**
 * useRupeeSquad Hook
 * 
 * React hook for managing the RupeeSquad agentic system state.
 * Provides simulation controls and real-time updates for the dashboard.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  RupeeSquadState,
  MockBankData,
  Goal,
  Transaction,
  AgentEvent,
  Invoice,
  ChanakyaIncomeResult,
  KavachExpenseResult,
  LakshmiNudge,
  initializeRupeeSquadState,
  chanakyaProcessIncome,
  kavachEvaluateExpense,
  lakshmiCheckGoals,
  lakshmiMotivate,
  chanakyaGenerateInvoiceReminder,
  simulateSalary,
  simulateExpense,
  getSimulationScenarios,
  getDefaultProfile,
  getProfileData,
  UserProfile,
} from '../utils/mockBankSimulation';

// ============================================================================
// TYPES
// ============================================================================

export type AgentNotification = {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'celebration';
  agent: 'chanakya' | 'kavach' | 'lakshmi';
  title: string;
  message: string;
  timestamp: Date;
  actionButtons?: { label: string; action: string }[];
  autoDismiss?: boolean;
  duration?: number;
};

export interface UseRupeeSquadReturn {
  // State
  state: RupeeSquadState;
  isInitialized: boolean;
  activeProfile: UserProfile;
  
  // Notifications
  notifications: AgentNotification[];
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Agent status (for UI indicators)
  agentStatus: RupeeSquadState['agentStatus'];
  
  // Simulation Controls
  simulateIncome: (amount: number, source: string) => ChanakyaIncomeResult;
  simulateExpenseAttempt: (amount: number, category: string, description: string, isImpulse?: boolean) => KavachExpenseResult;
  runScenario: (scenarioId: string) => void;
  getScenarios: typeof getSimulationScenarios;
  
  // Profile Management
  switchProfile: (profile: UserProfile) => void;
  resetState: () => void;
  
  // Goal Operations
  goals: Goal[];
  updateGoalProgress: (goalId: string, amount: number) => void;
  checkGoalNudges: () => LakshmiNudge[];
  
  // Invoice Operations (Chanakya's Invoice Hunter)
  invoices: Invoice[];
  generateInvoiceReminder: (invoiceId: string) => string | null;
  markInvoicePaid: (invoiceId: string) => void;
  
  // Cooling-Off Management
  coolingOffItems: Transaction[];
  approveCoolingOffItem: (transactionId: string) => void;
  cancelCoolingOffItem: (transactionId: string) => void;
  
  // Event Log
  eventLog: AgentEvent[];
  clearEventLog: () => void;
  
  // Celebration Control
  showCelebration: boolean;
  celebrationData: { goalName: string; amount: number } | null;
  dismissCelebration: () => void;
  
  // Quick Stats
  stats: {
    safeToSpend: number;
    taxVault: number;
    goalsSavings: number;
    totalBalance: number;
    currentTaxRate: number;
    predictedNextMonth: 'high' | 'normal' | 'low';
    incomeVolatility: number;
  };
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export function useRupeeSquad(initialProfile?: UserProfile): UseRupeeSquadReturn {
  // Profile and initialization
  const [activeProfile, setActiveProfile] = useState<UserProfile>(initialProfile || 'delivery_driver');
  const [profileData, setProfileData] = useState<MockBankData>(() => 
    initialProfile ? getProfileData(initialProfile) : getDefaultProfile()
  );
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Core state
  const [state, setState] = useState<RupeeSquadState>(() => 
    initializeRupeeSquadState(profileData)
  );
  
  // Goals (separate for easier updates)
  const [goals, setGoals] = useState<Goal[]>(() => profileData.goals);
  
  // Invoices
  const [invoices, setInvoices] = useState<Invoice[]>(() => state.invoices);
  
  // Notifications
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);
  
  // Celebration
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{ goalName: string; amount: number } | null>(null);
  
  // Agent status timeout refs
  const agentTimeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  
  // Initialize on mount
  useEffect(() => {
    setIsInitialized(true);
    
    // Add initial "system online" notification
    addNotification({
      type: 'info',
      agent: 'chanakya',
      title: '🤖 RupeeSquad Activated',
      message: 'Your autonomous financial agents are now monitoring your account. Chanakya, Kavach, and Lakshmi are ready to protect your money.',
      autoDismiss: true,
      duration: 5000,
    });
    
    // Check for overdue invoices
    const overdueInvoices = invoices.filter(i => i.status === 'overdue');
    if (overdueInvoices.length > 0) {
      setTimeout(() => {
        addNotification({
          type: 'warning',
          agent: 'chanakya',
          title: '📋 Overdue Invoices Detected',
          message: `You have ${overdueInvoices.length} overdue invoice(s) totaling ₹${overdueInvoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString('en-IN')}. Would you like me to draft reminders?`,
          actionButtons: [
            { label: 'Draft Reminders', action: 'draft_reminders' },
            { label: 'Later', action: 'dismiss' },
          ],
        });
      }, 2000);
    }
  }, []);
  
  // Helper: Add notification
  const addNotification = useCallback((notification: Omit<AgentNotification, 'id' | 'timestamp'>) => {
    const newNotification: AgentNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Update agent status
    setState(prev => ({
      ...prev,
      agentStatus: {
        ...prev.agentStatus,
        [notification.agent]: notification.type === 'celebration' ? 'celebrating' : 
                             notification.type === 'warning' || notification.type === 'error' ? 'alert' : 'active',
      },
    }));
    
    // Reset agent status after delay
    if (agentTimeoutRefs.current[notification.agent]) {
      clearTimeout(agentTimeoutRefs.current[notification.agent]);
    }
    agentTimeoutRefs.current[notification.agent] = setTimeout(() => {
      setState(prev => ({
        ...prev,
        agentStatus: {
          ...prev.agentStatus,
          [notification.agent]: 'idle',
        },
      }));
    }, 3000);
    
    // Auto-dismiss if configured
    if (notification.autoDismiss) {
      setTimeout(() => {
        dismissNotification(newNotification.id);
      }, notification.duration || 5000);
    }
    
    return newNotification.id;
  }, []);
  
  // Dismiss notification
  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);
  
  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  
  // Simulation callbacks
  const simulationCallbacks = {
    onIncomeReceived: (result: ChanakyaIncomeResult) => {
      addNotification({
        type: 'success',
        agent: 'chanakya',
        title: result.event.title,
        message: result.message,
        autoDismiss: true,
        duration: 7000,
      });
    },
    onExpenseEvaluated: (result: KavachExpenseResult) => {
      const type = result.approved ? 'success' : 
                   result.coolingOff ? 'warning' : 'error';
      
      addNotification({
        type,
        agent: 'kavach',
        title: result.event.title,
        message: result.event.message,
        actionButtons: result.event.actionButtons,
        autoDismiss: result.approved,
        duration: result.approved ? 5000 : undefined,
      });
    },
    onGoalNudge: (nudge: LakshmiNudge) => {
      if (nudge.celebrationTriggered) {
        setCelebrationData({
          goalName: nudge.goalName,
          amount: nudge.targetAmount,
        });
        setShowCelebration(true);
        
        addNotification({
          type: 'celebration',
          agent: 'lakshmi',
          title: nudge.event.title,
          message: nudge.message,
          autoDismiss: false,
        });
      } else {
        addNotification({
          type: 'info',
          agent: 'lakshmi',
          title: nudge.event.title,
          message: nudge.message,
          actionButtons: nudge.event.actionButtons,
        });
      }
    },
    onStateUpdate: (newState: RupeeSquadState) => {
      setState(newState);
    },
  };
  
  // Simulate income
  const simulateIncome = useCallback((amount: number, source: string): ChanakyaIncomeResult => {
    const result = chanakyaProcessIncome(amount, source, state, goals);
    
    // Update state
    const newState = simulateSalary(amount, source, state, goals, simulationCallbacks);
    setState(newState);
    
    return result;
  }, [state, goals]);
  
  // Simulate expense attempt
  const simulateExpenseAttempt = useCallback((
    amount: number,
    category: string,
    description: string,
    isImpulse: boolean = false
  ): KavachExpenseResult => {
    const result = kavachEvaluateExpense(amount, category, description, state, isImpulse);
    
    // Update state
    const newState = simulateExpense(amount, category, description, state, isImpulse, simulationCallbacks);
    setState(newState);
    
    return result;
  }, [state]);
  
  // Run predefined scenario
  const runScenario = useCallback((scenarioId: string) => {
    const scenarios = getSimulationScenarios();
    const scenario = scenarios.find(s => s.id === scenarioId);
    
    if (!scenario) {
      console.error(`Scenario ${scenarioId} not found`);
      return;
    }
    
    if (scenario.type === 'income') {
      simulateIncome(scenario.amount, scenario.source!);
    } else {
      simulateExpenseAttempt(
        scenario.amount,
        scenario.category!,
        scenario.description!,
        scenario.isImpulse
      );
    }
  }, [simulateIncome, simulateExpenseAttempt]);
  
  // Switch profile
  const switchProfile = useCallback((profile: UserProfile) => {
    const newProfileData = getProfileData(profile);
    setProfileData(newProfileData);
    setActiveProfile(profile);
    setGoals(newProfileData.goals);
    
    const newState = initializeRupeeSquadState(newProfileData);
    setState(newState);
    setInvoices(newState.invoices);
    
    addNotification({
      type: 'info',
      agent: 'chanakya',
      title: '👤 Profile Switched',
      message: `Now viewing ${newProfileData.profileName}'s financial data.`,
      autoDismiss: true,
      duration: 3000,
    });
  }, []);
  
  // Reset state
  const resetState = useCallback(() => {
    const newState = initializeRupeeSquadState(profileData);
    setState(newState);
    setGoals(profileData.goals);
    setInvoices(newState.invoices);
    setNotifications([]);
    setShowCelebration(false);
    setCelebrationData(null);
    
    addNotification({
      type: 'info',
      agent: 'chanakya',
      title: '🔄 State Reset',
      message: 'RupeeSquad state has been reset to initial values.',
      autoDismiss: true,
      duration: 3000,
    });
  }, [profileData]);
  
  // Update goal progress
  const updateGoalProgress = useCallback((goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const newAmount = Math.min(g.currentAmount + amount, g.targetAmount);
        const isComplete = newAmount >= g.targetAmount;
        
        if (isComplete && g.currentAmount < g.targetAmount) {
          // Goal just completed!
          setCelebrationData({
            goalName: g.name,
            amount: g.targetAmount,
          });
          setShowCelebration(true);
          
          addNotification({
            type: 'celebration',
            agent: 'lakshmi',
            title: '🎉 GOAL ACHIEVED!',
            message: `Congratulations! You've reached your "${g.name}" goal of ₹${g.targetAmount.toLocaleString('en-IN')}!`,
          });
        }
        
        return {
          ...g,
          currentAmount: newAmount,
          completedAt: isComplete ? new Date().toISOString() : undefined,
        };
      }
      return g;
    }));
    
    // Update state goals savings
    setState(prev => ({
      ...prev,
      goalsSavings: prev.goalsSavings + amount,
    }));
  }, []);
  
  // Check for goal nudges
  const checkGoalNudges = useCallback((): LakshmiNudge[] => {
    const recentSpending = state.monthlyBudgets.map(b => ({
      category: b.category,
      amount: b.spent / 4,
    }));
    
    const nudges = lakshmiCheckGoals(goals, state, recentSpending);
    
    nudges.forEach(nudge => {
      if (nudge.celebrationTriggered) {
        setCelebrationData({
          goalName: nudge.goalName,
          amount: nudge.targetAmount,
        });
        setShowCelebration(true);
      }
      
      addNotification({
        type: nudge.celebrationTriggered ? 'celebration' : 'info',
        agent: 'lakshmi',
        title: nudge.event.title,
        message: nudge.message,
        actionButtons: nudge.event.actionButtons,
      });
    });
    
    return nudges;
  }, [goals, state]);
  
  // Generate invoice reminder
  const generateInvoiceReminder = useCallback((invoiceId: string): string | null => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;
    
    const reminder = chanakyaGenerateInvoiceReminder(invoice);
    
    // Update invoice
    setInvoices(prev => prev.map(i => 
      i.id === invoiceId
        ? {
            ...i,
            generatedReminder: reminder,
            remindersSent: i.remindersSent + 1,
            lastReminderDate: new Date().toISOString(),
          }
        : i
    ));
    
    addNotification({
      type: 'success',
      agent: 'chanakya',
      title: '📧 Reminder Drafted',
      message: `Payment reminder for ${invoice.clientName} (₹${invoice.amount.toLocaleString('en-IN')}) is ready to send.`,
      actionButtons: [
        { label: 'Copy to Clipboard', action: 'copy_reminder' },
        { label: 'View', action: 'view_reminder' },
      ],
    });
    
    return reminder;
  }, [invoices]);
  
  // Mark invoice as paid
  const markInvoicePaid = useCallback((invoiceId: string) => {
    setInvoices(prev => prev.map(i =>
      i.id === invoiceId ? { ...i, status: 'paid' as const } : i
    ));
    
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      addNotification({
        type: 'success',
        agent: 'chanakya',
        title: '💰 Invoice Paid',
        message: `Payment of ₹${invoice.amount.toLocaleString('en-IN')} from ${invoice.clientName} has been recorded.`,
        autoDismiss: true,
        duration: 5000,
      });
    }
  }, [invoices]);
  
  // Approve cooling-off item
  const approveCoolingOffItem = useCallback((transactionId: string) => {
    const item = state.coolingOffItems.find(t => t.id === transactionId);
    if (!item) return;
    
    // Process the expense
    setState(prev => ({
      ...prev,
      safeToSpend: prev.safeToSpend - item.amount,
      totalBalance: prev.totalBalance - item.amount,
      coolingOffItems: prev.coolingOffItems.filter(t => t.id !== transactionId),
    }));
    
    addNotification({
      type: 'info',
      agent: 'kavach',
      title: '✅ Purchase Approved',
      message: `${item.description} for ₹${item.amount.toLocaleString('en-IN')} has been approved after cooling-off period.`,
      autoDismiss: true,
      duration: 5000,
    });
  }, [state.coolingOffItems]);
  
  // Cancel cooling-off item
  const cancelCoolingOffItem = useCallback((transactionId: string) => {
    const item = state.coolingOffItems.find(t => t.id === transactionId);
    if (!item) return;
    
    setState(prev => ({
      ...prev,
      coolingOffItems: prev.coolingOffItems.filter(t => t.id !== transactionId),
    }));
    
    addNotification({
      type: 'success',
      agent: 'lakshmi',
      title: '🎉 Smart Decision!',
      message: `You saved ₹${item.amount.toLocaleString('en-IN')} by canceling "${item.description}". ${lakshmiMotivate('save')}`,
      autoDismiss: true,
      duration: 5000,
    });
  }, [state.coolingOffItems]);
  
  // Clear event log
  const clearEventLog = useCallback(() => {
    setState(prev => ({ ...prev, eventLog: [] }));
  }, []);
  
  // Dismiss celebration
  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
    setCelebrationData(null);
  }, []);
  
  // Computed stats
  const stats = {
    safeToSpend: state.safeToSpend,
    taxVault: state.taxVault,
    goalsSavings: state.goalsSavings,
    totalBalance: state.totalBalance,
    currentTaxRate: state.currentTaxRate,
    predictedNextMonth: state.predictedNextMonth,
    incomeVolatility: state.incomeVolatility,
  };
  
  return {
    state,
    isInitialized,
    activeProfile,
    
    notifications,
    dismissNotification,
    clearAllNotifications,
    
    agentStatus: state.agentStatus,
    
    simulateIncome,
    simulateExpenseAttempt,
    runScenario,
    getScenarios: getSimulationScenarios,
    
    switchProfile,
    resetState,
    
    goals,
    updateGoalProgress,
    checkGoalNudges,
    
    invoices,
    generateInvoiceReminder,
    markInvoicePaid,
    
    coolingOffItems: state.coolingOffItems,
    approveCoolingOffItem,
    cancelCoolingOffItem,
    
    eventLog: state.eventLog,
    clearEventLog,
    
    showCelebration,
    celebrationData,
    dismissCelebration,
    
    stats,
  };
}

export default useRupeeSquad;
