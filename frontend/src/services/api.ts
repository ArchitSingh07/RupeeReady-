/**
 * API Service for RupeeReady AI Backend Integration
 * Connects frontend to FastAPI backend with Chanakya, Kavach, and Lakshmi agents
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface UserBalance {
  user_id: string;
  safe_balance: number;
  tax_vault: number;
  total_income: number;
  total_expenses: number;
}

export interface ExpenseRequest {
  user_id: string;
  amount: number;
  category: string;
}

export interface ExpenseResponse {
  status: 'APPROVED' | 'BLOCKED';
  message: string;
  remaining_balance?: number;
  motivation?: string;
}

export interface IncomeTransaction {
  user_id: string;
  amount: number;
  source: string;
}

export interface IncomeResponse {
  status: string;
  agent: string;
  message: string;
  breakdown: {
    total_income: number;
    tax_vault_allocation: number;
    safe_balance_allocation: number;
    tax_percentage: number;
  };
  new_balances: {
    safe_balance: number;
    tax_vault: number;
  };
  motivation: string;
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Health check - Verify backend is running
 */
export async function checkHealth(): Promise<{ status: string; app: string; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error('Backend health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
}

/**
 * Get user balance and financial data
 */
export async function getUserBalance(userId: string = 'user_123'): Promise<UserBalance> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${userId}/balance`);
    if (!response.ok) {
      throw new Error('Failed to fetch user balance');
    }
    return await response.json();
  } catch (error) {
    console.error('Get balance error:', error);
    throw error;
  }
}

/**
 * Check expense with Kavach agent (Spending Shield)
 */
export async function checkExpense(
  amount: number,
  category: string,
  userId: string = 'user_123'
): Promise<ExpenseResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check-expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        amount,
        category,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to check expense');
    }

    return await response.json();
  } catch (error) {
    console.error('Check expense error:', error);
    throw error;
  }
}

/**
 * Submit income transaction (for testing - normally webhook from bank)
 */
export async function submitIncome(
  amount: number,
  source: string,
  userId: string = 'user_123'
): Promise<IncomeResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/webhook/income`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        amount,
        source,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to submit income');
    }

    return await response.json();
  } catch (error) {
    console.error('Submit income error:', error);
    throw error;
  }
}

/**
 * Get transaction history (mock for now - implement backend endpoint if needed)
 */
export async function getTransactions(userId: string = 'user_123') {
  // TODO: Implement backend endpoint for transaction history
  // For now, this can use Firestore directly or return mock data
  throw new Error('Transaction history endpoint not yet implemented');
}
