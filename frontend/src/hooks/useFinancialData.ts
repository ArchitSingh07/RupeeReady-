/**
 * Custom hook for managing user financial data with real-time backend sync
 */

import { useState, useEffect, useCallback } from 'react';
import { getUserBalance, checkExpense, submitIncome } from '../services/api';
import type { UserBalance, ExpenseResponse } from '../services/api';

interface UseFinancialDataOptions {
  userId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // milliseconds
}

interface UseFinancialDataReturn {
  balance: UserBalance | null;
  loading: boolean;
  error: string | null;
  refreshBalance: () => Promise<void>;
  checkExpenseRequest: (amount: number, category: string) => Promise<ExpenseResponse>;
  submitIncomeRequest: (amount: number, source: string) => Promise<void>;
}

export function useFinancialData(
  options: UseFinancialDataOptions = {}
): UseFinancialDataReturn {
  const { 
    userId = 'user_123', 
    autoRefresh = true, 
    refreshInterval = 5000 // 5 seconds
  } = options;

  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch balance from backend
  const refreshBalance = useCallback(async () => {
    try {
      setError(null);
      const data = await getUserBalance(userId);
      setBalance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balance');
      console.error('Balance fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Check expense with Kavach agent
  const checkExpenseRequest = useCallback(
    async (amount: number, category: string): Promise<ExpenseResponse> => {
      try {
        const response = await checkExpense(amount, category, userId);
        
        // Refresh balance after expense check
        await refreshBalance();
        
        return response;
      } catch (err) {
        throw err;
      }
    },
    [userId, refreshBalance]
  );

  // Submit income with Chanakya agent
  const submitIncomeRequest = useCallback(
    async (amount: number, source: string): Promise<void> => {
      try {
        await submitIncome(amount, source, userId);
        
        // Refresh balance after income submission
        await refreshBalance();
      } catch (err) {
        throw err;
      }
    },
    [userId, refreshBalance]
  );

  // Initial load
  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshBalance]);

  return {
    balance,
    loading,
    error,
    refreshBalance,
    checkExpenseRequest,
    submitIncomeRequest,
  };
}
