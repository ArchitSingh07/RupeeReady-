import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  getUserTransactions, 
  addTransaction, 
  getUserGoals, 
  addGoal,
  updateGoal as updateGoalInFirestore,
  updateUserProfile 
} from '../lib/firebase';
import { useAuth } from './AuthContext';

// Types
export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  timestamp: string;
  isImpulse?: boolean;
  isIncome?: boolean;
  date?: string;
}

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: 'bill' | 'overspending' | 'security' | 'impulse' | 'subscription' | 'burnout';
  title: string;
  message: string;
  actionLabel: string;
  character?: string;
  dismissed?: boolean;
}

export interface FinancialSummary {
  safeToSpend: number;
  totalBalance: number;
  taxVault: number;
  upcomingBills: number;
  totalIncome: number;
  totalExpenses: number;
  financialHealth: 'good' | 'stable' | 'caution' | 'critical';
}

interface FinancialDataContextType {
  transactions: Transaction[];
  goals: Goal[];
  alerts: Alert[];
  summary: FinancialSummary;
  loading: boolean;
  error: string | null;
  
  // Transaction methods
  addNewTransaction: (transaction: Omit<Transaction, 'id' | 'user_id' | 'timestamp'>) => Promise<{ success: boolean; error?: string }>;
  refreshTransactions: () => Promise<void>;
  
  // Goal methods
  addNewGoal: (goal: Omit<Goal, 'id' | 'user_id' | 'createdAt'>, skipRefresh?: boolean) => Promise<{ success: boolean; error?: string }>;
  updateGoal: (goalId: string, updates: Partial<Goal>) => Promise<{ success: boolean; error?: string }>;
  refreshGoals: () => Promise<void>;
  
  // Alert methods
  dismissAlert: (alertId: string) => void;
  
  // Balance methods
  updateBalance: (updates: { safe_balance?: number; tax_vault?: number }) => Promise<{ success: boolean; error?: string }>;
  
  // Refresh all data
  refreshAllData: () => Promise<void>;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function FinancialDataProvider({ children }: { children: ReactNode }) {
  const { user, userProfile, refreshProfile } = useAuth();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  // Calculate financial summary
  const summary: FinancialSummary = {
    safeToSpend: userProfile?.safe_balance || 0,
    totalBalance: (userProfile?.safe_balance || 0) + (userProfile?.tax_vault || 0),
    taxVault: userProfile?.tax_vault || 0,
    upcomingBills: 7219.50, // This would come from a bills collection in a full implementation
    totalIncome: userProfile?.total_income || 0,
    totalExpenses: userProfile?.total_expenses || 0,
    financialHealth: calculateHealthStatus(userProfile?.safe_balance || 0, userProfile?.total_income || 0),
  };

  function calculateHealthStatus(balance: number, income: number): 'good' | 'stable' | 'caution' | 'critical' {
    if (income === 0) return 'stable';
    const ratio = balance / (income / 12); // Compare to monthly income
    if (ratio >= 3) return 'good';
    if (ratio >= 1) return 'stable';
    if (ratio >= 0.5) return 'caution';
    return 'critical';
  }

  // Generate alerts based on financial data
  const generateAlerts = useCallback(() => {
    const newAlerts: Alert[] = [];
    
    // Low balance alert
    if (summary.safeToSpend < 10000) {
      newAlerts.push({
        id: 'low-balance',
        type: 'security',
        title: 'Low Safe-to-Spend Alert',
        message: `Your Safe-to-Spend is ₹${summary.safeToSpend.toLocaleString('en-IN')}. Consider reducing expenses to maintain buffer.`,
        actionLabel: 'See Breakdown',
        character: 'chanakya',
      });
    }
    
    // Check for impulse purchases in recent transactions
    const impulseTransactions = transactions.filter(t => t.isImpulse);
    if (impulseTransactions.length > 0) {
      newAlerts.push({
        id: 'impulse-warning',
        type: 'impulse',
        title: 'Impulse Purchase Detected',
        message: `You have ${impulseTransactions.length} potential impulse purchase(s) this month. Review them to stay on track.`,
        actionLabel: 'Review Purchases',
        character: 'kavach',
      });
    }
    
    // Upcoming bills reminder (static for now)
    newAlerts.push({
      id: 'upcoming-bills',
      type: 'bill',
      title: 'Upcoming Bill Reminder',
      message: 'You have bills totaling ₹7,219.50 due in the next 7 days.',
      actionLabel: 'View Bills',
      character: 'kavach',
    });
    
    setAlerts(newAlerts);
  }, [summary.safeToSpend, transactions]);

  // Fetch transactions from Firestore
  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error: fetchError } = await getUserTransactions(user.uid, 50);
      if (fetchError) {
        console.error('Error fetching transactions:', fetchError);
        return;
      }
      
      // Transform data to match our Transaction type
      const formattedTransactions: Transaction[] = data.map((t: any) => ({
        id: t.id,
        user_id: t.user_id,
        type: t.type,
        amount: t.amount,
        category: t.category || 'other',
        description: t.description || '',
        timestamp: t.timestamp,
        isImpulse: t.isImpulse || false,
        isIncome: t.type === 'income',
        date: new Date(t.timestamp).toLocaleDateString('en-IN', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
      }));
      
      setTransactions(formattedTransactions);
    } catch (err) {
      console.error('Error in fetchTransactions:', err);
    }
  };

  // Fetch goals from Firestore
  const fetchGoals = async () => {
    if (!user) return;
    
    try {
      const { data, error: fetchError } = await getUserGoals(user.uid);
      if (fetchError) {
        console.error('Error fetching goals:', fetchError);
        return;
      }
      
      setGoals(data as Goal[]);
    } catch (err) {
      console.error('Error in fetchGoals:', err);
    }
  };

  // Fetch all data when user changes
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchTransactions(), fetchGoals()])
        .finally(() => setLoading(false));
    } else {
      setTransactions([]);
      setGoals([]);
      setAlerts([]);
    }
  }, [user]);

  // Update alerts when data changes
  useEffect(() => {
    if (user) {
      generateAlerts();
    }
  }, [user, transactions, userProfile, generateAlerts]);

  // Add a new transaction
  const addNewTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'timestamp'>) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    try {
      // First, try to use the backend API for smart processing with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch(`${API_URL}/api/check-expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: transaction.amount,
          category: transaction.category,
          user_id: user.uid,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const result = await response.json();
        if (result.status === 'BLOCKED') {
          return { success: false, error: result.message };
        }
      }
    } catch (err) {
      // Backend not available or timed out, proceed with direct Firestore write
      console.log('Backend not available, using direct Firestore');
    }
    
    // Add transaction to Firestore
    const { id, error: addError } = await addTransaction({
      user_id: user.uid,
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
    });
    
    if (addError) {
      return { success: false, error: addError };
    }
    
    // Update user totals
    const updates: Record<string, number> = {};
    if (transaction.type === 'income') {
      updates.total_income = (userProfile?.total_income || 0) + transaction.amount;
      // Add to safe balance (minus tax reserve of 30%)
      const taxAmount = transaction.amount * 0.3;
      updates.safe_balance = (userProfile?.safe_balance || 0) + (transaction.amount - taxAmount);
      updates.tax_vault = (userProfile?.tax_vault || 0) + taxAmount;
    } else {
      updates.total_expenses = (userProfile?.total_expenses || 0) + transaction.amount;
      updates.safe_balance = (userProfile?.safe_balance || 0) - transaction.amount;
    }
    
    await updateUserProfile(user.uid, updates);
    
    // Refresh data
    await fetchTransactions();
    await refreshProfile();
    
    return { success: true };
  };

  // Add a new goal
  const addNewGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'createdAt'>, skipRefresh = false) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    const { id, error: addError } = await addGoal({
      user_id: user.uid,
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      color: goal.color,
    });
    
    if (addError) {
      return { success: false, error: addError };
    }
    
    // Optionally skip refresh for faster completion (e.g., during onboarding)
    if (!skipRefresh) {
      await fetchGoals();
    }
    return { success: true };
  };

  // Update goal (would need to add this to firebase.ts)
  const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    try {
      const { error: updateError } = await updateGoalInFirestore(goalId, updates);
      if (updateError) {
        return { success: false, error: updateError };
      }
      
      await fetchGoals();
      return { success: true };
    } catch (err: any) {
      console.error('Update goal error:', err);
      return { success: false, error: err.message };
    }
  };

  // Dismiss an alert
  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Update balance
  const updateBalance = async (updates: { safe_balance?: number; tax_vault?: number }) => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    await updateUserProfile(user.uid, updates);
    await refreshProfile();
    return { success: true };
  };

  // Refresh methods
  const refreshTransactions = async () => {
    setLoading(true);
    await fetchTransactions();
    setLoading(false);
  };

  const refreshGoals = async () => {
    setLoading(true);
    await fetchGoals();
    setLoading(false);
  };

  const refreshAllData = async () => {
    setLoading(true);
    await Promise.all([fetchTransactions(), fetchGoals(), refreshProfile()]);
    setLoading(false);
  };

  const value: FinancialDataContextType = {
    transactions,
    goals,
    alerts,
    summary,
    loading,
    error: _error,
    addNewTransaction,
    refreshTransactions,
    addNewGoal,
    updateGoal,
    refreshGoals,
    dismissAlert,
    updateBalance,
    refreshAllData,
  };

  return (
    <FinancialDataContext.Provider value={value}>
      {children}
    </FinancialDataContext.Provider>
  );
}

export function useFinancialData() {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
}
