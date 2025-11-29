/**
 * Mock Bank Simulation System for RupeeReady
 * 
 * This module simulates bank data that would normally come from bank APIs.
 * It provides different user profiles representing various gig worker scenarios.
 * 
 * 🤖 RupeeSquad Agentic System:
 *    - Chanakya (The Analyst): Auto-manages income splits (Tax Vault, Savings, Safe-to-Spend)
 *    - Kavach (The Guardian): Shields against risky expenses with 24-hour cooling-off
 *    - Lakshmi (The Motivator): Gamifies savings and celebrates goal completions
 */

export type UserProfile = 'delivery_driver' | 'freelance_designer' | 'uber_driver' | 'content_creator' | 'multi_gig';

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface BankAccount {
  accountNumber: string;
  bankName: string;
  accountType: 'savings' | 'current';
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  date: string;
  timestamp: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  merchantName?: string;
  isRecurring: boolean;
  isImpulse?: boolean;
  platform?: string; // For gig income - which platform paid
  agentProcessed?: boolean; // Whether RupeeSquad has processed this
  blockedReason?: string; // If Kavach blocked it
  coolingOff?: boolean; // If in 24-hour cooling period
  coolingOffExpiry?: string; // When cooling period ends
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  category: string;
  isPaid: boolean;
  autoPay: boolean;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  nudgeSent?: boolean; // Lakshmi has nudged about this
  completedAt?: string; // When goal was completed
}

// ============================================================================
// INVOICE TRACKING (Chanakya's Invoice Hunter)
// ============================================================================

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail?: string;
  amount: number;
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  remindersSent: number;
  lastReminderDate?: string;
  generatedReminder?: string; // AI-drafted reminder text
}

// ============================================================================
// BUDGET TRACKING (Kavach's Auto-Stabilization)
// ============================================================================

export interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
  originalAllocation: number;
  autoAdjusted: boolean;
  adjustmentReason?: string;
}

// ============================================================================
// AGENTIC EVENT SYSTEM
// ============================================================================

export type AgentEventType = 
  | 'income_received'
  | 'income_split'
  | 'expense_approved'
  | 'expense_blocked'
  | 'cooling_off_started'
  | 'cooling_off_expired'
  | 'goal_nudge'
  | 'goal_completed'
  | 'invoice_overdue'
  | 'invoice_reminder_generated'
  | 'budget_auto_adjusted'
  | 'lean_month_prediction'
  | 'tax_rate_adjusted';

export interface AgentEvent {
  id: string;
  timestamp: string;
  agent: 'chanakya' | 'kavach' | 'lakshmi';
  eventType: AgentEventType;
  title: string;
  message: string;
  data?: Record<string, any>;
  userActionRequired?: boolean;
  actionButtons?: { label: string; action: string }[];
}

// ============================================================================
// RUPEE SQUAD STATE
// ============================================================================

export interface RupeeSquadState {
  // Core balances (managed by Chanakya)
  safeToSpend: number;
  taxVault: number;
  goalsSavings: number;
  totalBalance: number;
  
  // Tax management
  currentTaxRate: number; // Dynamic tax rate (10-30%)
  taxRateHistory: { date: string; rate: number; reason: string }[];
  
  // Income smoothing (Chanakya's lean month predictor)
  monthlyIncomeHistory: { month: string; amount: number }[];
  averageMonthlyIncome: number;
  predictedNextMonth: 'high' | 'normal' | 'low';
  incomeVolatility: number; // 0-1 score
  
  // Spending protection (Kavach)
  coolingOffItems: Transaction[];
  blockedExpenses: Transaction[];
  monthlyBudgets: BudgetCategory[];
  
  // Goals (Lakshmi's domain)
  activeNudges: AgentEvent[];
  completedGoals: Goal[];
  
  // Invoice tracking (Chanakya's Invoice Hunter)
  invoices: Invoice[];
  overdueInvoices: Invoice[];
  
  // Event log
  eventLog: AgentEvent[];
  
  // Agent status
  agentStatus: {
    chanakya: 'active' | 'thinking' | 'idle';
    kavach: 'active' | 'alert' | 'idle';
    lakshmi: 'active' | 'celebrating' | 'idle';
  };
}

export interface MockBankData {
  profile: UserProfile;
  profileName: string;
  accounts: BankAccount[];
  transactions: Transaction[];
  upcomingBills: Bill[];
  goals: Goal[];
  monthlyStats: {
    totalIncome: number;
    totalExpenses: number;
    savingsRate: number;
    taxReserve: number;
  };
}

// Helper to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get date string
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getISODate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getFutureDate = (daysAhead: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString();
};

// ============================================================================
// PROFILE 1: Swiggy/Zomato Delivery Driver
// ============================================================================
const deliveryDriverData: MockBankData = {
  profile: 'delivery_driver',
  profileName: 'Rajesh - Delivery Partner',
  accounts: [
    {
      accountNumber: 'XXXX1234',
      bankName: 'State Bank of India',
      accountType: 'savings',
      balance: 45280.50,
      currency: 'INR',
    }
  ],
  transactions: [
    // Income - Gig payments
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Swiggy Weekly Payout', amount: 8500, type: 'credit', category: 'income', platform: 'Swiggy', isRecurring: true },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Zomato Incentive Bonus', amount: 1200, type: 'credit', category: 'income', platform: 'Zomato', isRecurring: false },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Swiggy Tips', amount: 450, type: 'credit', category: 'income', platform: 'Swiggy', isRecurring: false },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Swiggy Weekly Payout', amount: 7800, type: 'credit', category: 'income', platform: 'Swiggy', isRecurring: true },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Zomato Weekly Payout', amount: 4200, type: 'credit', category: 'income', platform: 'Zomato', isRecurring: true },
    
    // Expenses
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Petrol - HP Station', amount: 800, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Chai & Snacks', amount: 60, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Mobile Recharge - Jio', amount: 299, type: 'debit', category: 'utilities', isRecurring: true },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Bike Servicing', amount: 1500, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'D-Mart Groceries', amount: 2100, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'New Headphones - Amazon', amount: 1299, type: 'debit', category: 'shopping', isRecurring: false, isImpulse: true },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Rent Payment - October', amount: 8000, type: 'debit', category: 'housing', isRecurring: true },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Electricity Bill', amount: 650, type: 'debit', category: 'utilities', isRecurring: true },
    { id: generateId(), date: getDateString(8), timestamp: getISODate(8), description: 'Petrol - HP Station', amount: 750, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(10), timestamp: getISODate(10), description: 'Dinner with Friends', amount: 800, type: 'debit', category: 'food', isRecurring: false, isImpulse: true },
  ],
  upcomingBills: [
    { id: generateId(), name: 'Airtel Bill', amount: 499, dueDate: getFutureDate(3), frequency: 'monthly', category: 'utilities', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Bike Insurance EMI', amount: 850, dueDate: getFutureDate(7), frequency: 'monthly', category: 'insurance', isPaid: false, autoPay: true },
    { id: generateId(), name: 'Rent', amount: 8000, dueDate: getFutureDate(12), frequency: 'monthly', category: 'housing', isPaid: false, autoPay: false },
  ],
  goals: [
    { id: generateId(), name: 'Emergency Fund', targetAmount: 50000, currentAmount: 32000, deadline: getFutureDate(90), color: '#14B8A6', priority: 'high' },
    { id: generateId(), name: 'New Bike Down Payment', targetAmount: 25000, currentAmount: 15000, deadline: getFutureDate(60), color: '#F59E0B', priority: 'medium' },
    { id: generateId(), name: 'Diwali Shopping', targetAmount: 10000, currentAmount: 4000, deadline: getFutureDate(30), color: '#8B5CF6', priority: 'low' },
  ],
  monthlyStats: {
    totalIncome: 42000,
    totalExpenses: 28500,
    savingsRate: 32,
    taxReserve: 12600,
  }
};

// ============================================================================
// PROFILE 2: Freelance Graphic Designer
// ============================================================================
const freelanceDesignerData: MockBankData = {
  profile: 'freelance_designer',
  profileName: 'Priya - Freelance Designer',
  accounts: [
    {
      accountNumber: 'XXXX5678',
      bankName: 'HDFC Bank',
      accountType: 'savings',
      balance: 125000.00,
      currency: 'INR',
    },
    {
      accountNumber: 'XXXX9012',
      bankName: 'ICICI Bank',
      accountType: 'current',
      balance: 45000.00,
      currency: 'INR',
    }
  ],
  transactions: [
    // Income - Client payments
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Client Payment - TechStartup Logo', amount: 35000, type: 'credit', category: 'income', platform: 'Direct', isRecurring: false },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Fiverr Withdrawal', amount: 12000, type: 'credit', category: 'income', platform: 'Fiverr', isRecurring: false },
    { id: generateId(), date: getDateString(12), timestamp: getISODate(12), description: 'Upwork Payment - UI Design', amount: 28000, type: 'credit', category: 'income', platform: 'Upwork', isRecurring: false },
    { id: generateId(), date: getDateString(18), timestamp: getISODate(18), description: 'Retainer - Monthly Design Work', amount: 40000, type: 'credit', category: 'income', platform: 'Direct', isRecurring: true },
    
    // Expenses
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Adobe Creative Cloud', amount: 4899, type: 'debit', category: 'software', isRecurring: true },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Starbucks - Working Session', amount: 650, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Figma Pro Subscription', amount: 1200, type: 'debit', category: 'software', isRecurring: true },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Coworking Space - November', amount: 6000, type: 'debit', category: 'workspace', isRecurring: true },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'New Wacom Tablet', amount: 15000, type: 'debit', category: 'equipment', isRecurring: false },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Rent Payment', amount: 22000, type: 'debit', category: 'housing', isRecurring: true },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Swiggy Food Order', amount: 450, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(8), timestamp: getISODate(8), description: 'Zara Shopping', amount: 5500, type: 'debit', category: 'shopping', isRecurring: false, isImpulse: true },
    { id: generateId(), date: getDateString(10), timestamp: getISODate(10), description: 'Uber Ride', amount: 320, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(15), timestamp: getISODate(15), description: 'Health Insurance Premium', amount: 2500, type: 'debit', category: 'insurance', isRecurring: true },
  ],
  upcomingBills: [
    { id: generateId(), name: 'Adobe Creative Cloud', amount: 4899, dueDate: getFutureDate(5), frequency: 'monthly', category: 'software', isPaid: false, autoPay: true },
    { id: generateId(), name: 'Internet - Airtel Fiber', amount: 1499, dueDate: getFutureDate(8), frequency: 'monthly', category: 'utilities', isPaid: false, autoPay: true },
    { id: generateId(), name: 'Rent', amount: 22000, dueDate: getFutureDate(10), frequency: 'monthly', category: 'housing', isPaid: false, autoPay: false },
    { id: generateId(), name: 'GST Payment', amount: 18500, dueDate: getFutureDate(20), frequency: 'quarterly', category: 'tax', isPaid: false, autoPay: false },
  ],
  goals: [
    { id: generateId(), name: 'Emergency Fund', targetAmount: 200000, currentAmount: 125000, deadline: getFutureDate(180), color: '#14B8A6', priority: 'high' },
    { id: generateId(), name: 'MacBook Pro M3', targetAmount: 180000, currentAmount: 80000, deadline: getFutureDate(120), color: '#F59E0B', priority: 'medium' },
    { id: generateId(), name: 'Europe Trip 2026', targetAmount: 300000, currentAmount: 45000, deadline: getFutureDate(365), color: '#8B5CF6', priority: 'low' },
    { id: generateId(), name: 'Investment Portfolio', targetAmount: 500000, currentAmount: 150000, deadline: getFutureDate(730), color: '#EC4899', priority: 'medium' },
  ],
  monthlyStats: {
    totalIncome: 115000,
    totalExpenses: 65000,
    savingsRate: 43,
    taxReserve: 34500,
  }
};

// ============================================================================
// PROFILE 3: Uber/Ola Driver
// ============================================================================
const uberDriverData: MockBankData = {
  profile: 'uber_driver',
  profileName: 'Amit - Cab Driver',
  accounts: [
    {
      accountNumber: 'XXXX3456',
      bankName: 'Bank of Baroda',
      accountType: 'savings',
      balance: 68500.00,
      currency: 'INR',
    }
  ],
  transactions: [
    // Income
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Uber Daily Payout', amount: 2800, type: 'credit', category: 'income', platform: 'Uber', isRecurring: false },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Uber Daily Payout', amount: 3200, type: 'credit', category: 'income', platform: 'Uber', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Ola Daily Payout', amount: 2100, type: 'credit', category: 'income', platform: 'Ola', isRecurring: false },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Uber Surge Bonus', amount: 1500, type: 'credit', category: 'income', platform: 'Uber', isRecurring: false },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Uber Daily Payout', amount: 2600, type: 'credit', category: 'income', platform: 'Uber', isRecurring: false },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Ola Weekly Incentive', amount: 3000, type: 'credit', category: 'income', platform: 'Ola', isRecurring: false },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Uber Daily Payout', amount: 2400, type: 'credit', category: 'income', platform: 'Uber', isRecurring: false },
    
    // Expenses
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'CNG Refill - Adani', amount: 1200, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Car Wash', amount: 200, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'CNG Refill - Adani', amount: 1100, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Lunch - Roadside Dhaba', amount: 120, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Car EMI - HDFC', amount: 12500, type: 'debit', category: 'loan', isRecurring: true },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Family Groceries', amount: 4500, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Kids School Fees', amount: 8000, type: 'debit', category: 'education', isRecurring: true },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Gold Chain - Tanishq', amount: 25000, type: 'debit', category: 'shopping', isRecurring: false, isImpulse: true },
    { id: generateId(), date: getDateString(10), timestamp: getISODate(10), description: 'Rent Payment', amount: 12000, type: 'debit', category: 'housing', isRecurring: true },
  ],
  upcomingBills: [
    { id: generateId(), name: 'Car EMI', amount: 12500, dueDate: getFutureDate(5), frequency: 'monthly', category: 'loan', isPaid: false, autoPay: true },
    { id: generateId(), name: 'Car Insurance', amount: 2200, dueDate: getFutureDate(15), frequency: 'monthly', category: 'insurance', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Electricity Bill', amount: 1800, dueDate: getFutureDate(8), frequency: 'monthly', category: 'utilities', isPaid: false, autoPay: false },
  ],
  goals: [
    { id: generateId(), name: 'Car Loan Prepayment', targetAmount: 100000, currentAmount: 35000, deadline: getFutureDate(180), color: '#14B8A6', priority: 'high' },
    { id: generateId(), name: 'Kids Education Fund', targetAmount: 200000, currentAmount: 68000, deadline: getFutureDate(365), color: '#F59E0B', priority: 'high' },
    { id: generateId(), name: 'Family Vacation', targetAmount: 50000, currentAmount: 12000, deadline: getFutureDate(90), color: '#8B5CF6', priority: 'low' },
  ],
  monthlyStats: {
    totalIncome: 72000,
    totalExpenses: 58000,
    savingsRate: 19,
    taxReserve: 21600,
  }
};

// ============================================================================
// PROFILE 4: Content Creator / YouTuber
// ============================================================================
const contentCreatorData: MockBankData = {
  profile: 'content_creator',
  profileName: 'Sneha - YouTuber & Influencer',
  accounts: [
    {
      accountNumber: 'XXXX7890',
      bankName: 'Kotak Mahindra Bank',
      accountType: 'savings',
      balance: 285000.00,
      currency: 'INR',
    },
    {
      accountNumber: 'XXXX4567',
      bankName: 'HDFC Bank',
      accountType: 'savings',
      balance: 95000.00,
      currency: 'INR',
    }
  ],
  transactions: [
    // Income - Multiple revenue streams
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'YouTube AdSense - November', amount: 85000, type: 'credit', category: 'income', platform: 'YouTube', isRecurring: true },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Brand Deal - Boat Audio', amount: 50000, type: 'credit', category: 'income', platform: 'Direct', isRecurring: false },
    { id: generateId(), date: getDateString(8), timestamp: getISODate(8), description: 'Instagram Collaboration', amount: 25000, type: 'credit', category: 'income', platform: 'Instagram', isRecurring: false },
    { id: generateId(), date: getDateString(15), timestamp: getISODate(15), description: 'Affiliate Commission - Amazon', amount: 12000, type: 'credit', category: 'income', platform: 'Amazon', isRecurring: false },
    { id: generateId(), date: getDateString(20), timestamp: getISODate(20), description: 'Course Sales - Skillshare', amount: 18000, type: 'credit', category: 'income', platform: 'Skillshare', isRecurring: true },
    
    // Expenses
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Camera Equipment - Sony A7IV', amount: 185000, type: 'debit', category: 'equipment', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Video Editor Freelancer', amount: 15000, type: 'debit', category: 'business', isRecurring: true },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Studio Rent', amount: 18000, type: 'debit', category: 'workspace', isRecurring: true },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Canva Pro Subscription', amount: 999, type: 'debit', category: 'software', isRecurring: true },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Premium Props for Video', amount: 8500, type: 'debit', category: 'business', isRecurring: false },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Rent - Apartment', amount: 35000, type: 'debit', category: 'housing', isRecurring: true },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Designer Outfit - Brand Video', amount: 12000, type: 'debit', category: 'business', isRecurring: false },
    { id: generateId(), date: getDateString(9), timestamp: getISODate(9), description: 'Spa Day', amount: 5500, type: 'debit', category: 'personal', isRecurring: false, isImpulse: true },
    { id: generateId(), date: getDateString(12), timestamp: getISODate(12), description: 'Netflix + Disney+ Bundle', amount: 499, type: 'debit', category: 'entertainment', isRecurring: true },
  ],
  upcomingBills: [
    { id: generateId(), name: 'Studio Rent', amount: 18000, dueDate: getFutureDate(5), frequency: 'monthly', category: 'workspace', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Apartment Rent', amount: 35000, dueDate: getFutureDate(10), frequency: 'monthly', category: 'housing', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Editor Payment', amount: 15000, dueDate: getFutureDate(7), frequency: 'monthly', category: 'business', isPaid: false, autoPay: true },
    { id: generateId(), name: 'Advance Tax - Q3', amount: 45000, dueDate: getFutureDate(20), frequency: 'quarterly', category: 'tax', isPaid: false, autoPay: false },
  ],
  goals: [
    { id: generateId(), name: 'Emergency Fund', targetAmount: 500000, currentAmount: 280000, deadline: getFutureDate(180), color: '#14B8A6', priority: 'high' },
    { id: generateId(), name: 'Own Studio Setup', targetAmount: 800000, currentAmount: 320000, deadline: getFutureDate(365), color: '#F59E0B', priority: 'high' },
    { id: generateId(), name: 'Investment - Mutual Funds', targetAmount: 1000000, currentAmount: 250000, deadline: getFutureDate(730), color: '#8B5CF6', priority: 'medium' },
    { id: generateId(), name: 'International Trip', targetAmount: 400000, currentAmount: 85000, deadline: getFutureDate(365), color: '#EC4899', priority: 'low' },
  ],
  monthlyStats: {
    totalIncome: 190000,
    totalExpenses: 125000,
    savingsRate: 34,
    taxReserve: 57000,
  }
};

// ============================================================================
// PROFILE 5: Multi-Gig Worker (Multiple Platforms)
// ============================================================================
const multiGigData: MockBankData = {
  profile: 'multi_gig',
  profileName: 'Vikram - Multi-Platform Hustler',
  accounts: [
    {
      accountNumber: 'XXXX2345',
      bankName: 'Axis Bank',
      accountType: 'savings',
      balance: 52000.00,
      currency: 'INR',
    }
  ],
  transactions: [
    // Income from multiple gigs
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Swiggy Weekly Payout', amount: 6500, type: 'credit', category: 'income', platform: 'Swiggy', isRecurring: true },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Urban Company - Home Service', amount: 3200, type: 'credit', category: 'income', platform: 'Urban Company', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Dunzo Delivery Payout', amount: 2800, type: 'credit', category: 'income', platform: 'Dunzo', isRecurring: false },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Rapido Bike Taxi', amount: 1800, type: 'credit', category: 'income', platform: 'Rapido', isRecurring: false },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Porter Delivery', amount: 2500, type: 'credit', category: 'income', platform: 'Porter', isRecurring: false },
    { id: generateId(), date: getDateString(7), timestamp: getISODate(7), description: 'Swiggy Weekly Payout', amount: 7200, type: 'credit', category: 'income', platform: 'Swiggy', isRecurring: true },
    { id: generateId(), date: getDateString(8), timestamp: getISODate(8), description: 'Urban Company - AC Service', amount: 4500, type: 'credit', category: 'income', platform: 'Urban Company', isRecurring: false },
    
    // Expenses
    { id: generateId(), date: getDateString(0), timestamp: getISODate(0), description: 'Petrol', amount: 600, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(1), timestamp: getISODate(1), description: 'Tools - Hardware Store', amount: 1200, type: 'debit', category: 'equipment', isRecurring: false },
    { id: generateId(), date: getDateString(2), timestamp: getISODate(2), description: 'Mobile Recharge', amount: 199, type: 'debit', category: 'utilities', isRecurring: true },
    { id: generateId(), date: getDateString(3), timestamp: getISODate(3), description: 'Street Food', amount: 80, type: 'debit', category: 'food', isRecurring: false },
    { id: generateId(), date: getDateString(4), timestamp: getISODate(4), description: 'Room Rent', amount: 6000, type: 'debit', category: 'housing', isRecurring: true },
    { id: generateId(), date: getDateString(5), timestamp: getISODate(5), description: 'Petrol', amount: 550, type: 'debit', category: 'transport', isRecurring: false },
    { id: generateId(), date: getDateString(6), timestamp: getISODate(6), description: 'Money Sent Home', amount: 10000, type: 'debit', category: 'family', isRecurring: true },
    { id: generateId(), date: getDateString(8), timestamp: getISODate(8), description: 'New Phone Case', amount: 499, type: 'debit', category: 'shopping', isRecurring: false, isImpulse: true },
    { id: generateId(), date: getDateString(10), timestamp: getISODate(10), description: 'Electricity Bill', amount: 450, type: 'debit', category: 'utilities', isRecurring: true },
  ],
  upcomingBills: [
    { id: generateId(), name: 'Room Rent', amount: 6000, dueDate: getFutureDate(5), frequency: 'monthly', category: 'housing', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Family - Monthly Transfer', amount: 10000, dueDate: getFutureDate(3), frequency: 'monthly', category: 'family', isPaid: false, autoPay: false },
    { id: generateId(), name: 'Bike EMI', amount: 3500, dueDate: getFutureDate(10), frequency: 'monthly', category: 'loan', isPaid: false, autoPay: true },
  ],
  goals: [
    { id: generateId(), name: 'Bike Loan Payoff', targetAmount: 35000, currentAmount: 18000, deadline: getFutureDate(120), color: '#14B8A6', priority: 'high' },
    { id: generateId(), name: 'Emergency Fund', targetAmount: 30000, currentAmount: 8000, deadline: getFutureDate(180), color: '#F59E0B', priority: 'high' },
    { id: generateId(), name: 'Sister Wedding Gift', targetAmount: 20000, currentAmount: 5000, deadline: getFutureDate(90), color: '#8B5CF6', priority: 'medium' },
  ],
  monthlyStats: {
    totalIncome: 56000,
    totalExpenses: 42000,
    savingsRate: 25,
    taxReserve: 16800,
  }
};

// ============================================================================
// EXPORTED FUNCTIONS
// ============================================================================

export const profiles: Record<UserProfile, MockBankData> = {
  delivery_driver: deliveryDriverData,
  freelance_designer: freelanceDesignerData,
  uber_driver: uberDriverData,
  content_creator: contentCreatorData,
  multi_gig: multiGigData,
};

export const getProfileData = (profile: UserProfile): MockBankData => {
  return profiles[profile];
};

export const getAllProfiles = (): { id: UserProfile; name: string; description: string }[] => {
  return [
    { id: 'delivery_driver', name: 'Rajesh - Delivery Partner', description: 'Swiggy/Zomato delivery driver with moderate income' },
    { id: 'freelance_designer', name: 'Priya - Freelance Designer', description: 'High-earning freelance graphic designer' },
    { id: 'uber_driver', name: 'Amit - Cab Driver', description: 'Uber/Ola driver with car loan' },
    { id: 'content_creator', name: 'Sneha - YouTuber', description: 'Content creator with multiple revenue streams' },
    { id: 'multi_gig', name: 'Vikram - Multi-Platform', description: 'Works across multiple gig platforms' },
  ];
};

export const getDefaultProfile = (): MockBankData => {
  return deliveryDriverData;
};

// Calculate financial metrics from transactions
export const calculateMetrics = (data: MockBankData) => {
  const last30Days = data.transactions.filter(t => {
    const txDate = new Date(t.timestamp);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return txDate >= thirtyDaysAgo;
  });

  const income = last30Days.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const expenses = last30Days.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
  const impulseSpend = last30Days.filter(t => t.isImpulse).reduce((sum, t) => sum + t.amount, 0);
  
  const upcomingBillsTotal = data.upcomingBills
    .filter(b => !b.isPaid)
    .reduce((sum, b) => sum + b.amount, 0);

  const taxReserve = income * 0.30; // 30% tax reserve
  const safeToSpend = data.accounts[0].balance - taxReserve - upcomingBillsTotal;

  return {
    totalIncome: income,
    totalExpenses: expenses,
    impulseSpend,
    upcomingBillsTotal,
    taxReserve,
    safeToSpend: Math.max(0, safeToSpend),
    savingsRate: income > 0 ? Math.round(((income - expenses) / income) * 100) : 0,
    balance: data.accounts.reduce((sum, a) => sum + a.balance, 0),
  };
};

// ============================================================================
// 🤖 RUPEE SQUAD AGENTIC SYSTEM
// ============================================================================

/**
 * Initialize the RupeeSquad state from profile data
 */
export const initializeRupeeSquadState = (profileData: MockBankData): RupeeSquadState => {
  const metrics = calculateMetrics(profileData);
  const incomeTransactions = profileData.transactions.filter(t => t.type === 'credit');
  
  // Calculate monthly income history (last 3 months)
  const monthlyIncomeHistory = calculateMonthlyIncomeHistory(incomeTransactions);
  const averageMonthlyIncome = monthlyIncomeHistory.reduce((sum, m) => sum + m.amount, 0) / Math.max(monthlyIncomeHistory.length, 1);
  
  return {
    safeToSpend: metrics.safeToSpend,
    taxVault: metrics.taxReserve,
    goalsSavings: profileData.goals.reduce((sum, g) => sum + g.currentAmount, 0),
    totalBalance: metrics.balance,
    
    currentTaxRate: 20, // Start with 20%
    taxRateHistory: [{ date: new Date().toISOString(), rate: 20, reason: 'Initial setup' }],
    
    monthlyIncomeHistory,
    averageMonthlyIncome,
    predictedNextMonth: predictNextMonth(monthlyIncomeHistory),
    incomeVolatility: calculateIncomeVolatility(monthlyIncomeHistory),
    
    coolingOffItems: [],
    blockedExpenses: [],
    monthlyBudgets: initializeMonthlyBudgets(profileData),
    
    activeNudges: [],
    completedGoals: profileData.goals.filter(g => g.currentAmount >= g.targetAmount),
    
    invoices: initializeMockInvoices(profileData.profile),
    overdueInvoices: [],
    
    eventLog: [],
    
    agentStatus: {
      chanakya: 'idle',
      kavach: 'idle',
      lakshmi: 'idle',
    },
  };
};

// Helper: Calculate monthly income history
const calculateMonthlyIncomeHistory = (incomeTransactions: Transaction[]): { month: string; amount: number }[] => {
  const monthMap = new Map<string, number>();
  
  incomeTransactions.forEach(t => {
    const date = new Date(t.timestamp);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + t.amount);
  });
  
  return Array.from(monthMap.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-3); // Last 3 months
};

// Helper: Predict next month's income trend
const predictNextMonth = (history: { month: string; amount: number }[]): 'high' | 'normal' | 'low' => {
  if (history.length < 2) return 'normal';
  
  const avg = history.reduce((sum, m) => sum + m.amount, 0) / history.length;
  const lastMonth = history[history.length - 1]?.amount || 0;
  
  if (lastMonth > avg * 1.2) return 'high';
  if (lastMonth < avg * 0.8) return 'low';
  return 'normal';
};

// Helper: Calculate income volatility (0-1)
const calculateIncomeVolatility = (history: { month: string; amount: number }[]): number => {
  if (history.length < 2) return 0.5;
  
  const amounts = history.map(h => h.amount);
  const avg = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - avg, 2), 0) / amounts.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize to 0-1 (coefficient of variation)
  return Math.min(1, stdDev / avg);
};

// Helper: Initialize monthly budgets
const initializeMonthlyBudgets = (profileData: MockBankData): BudgetCategory[] => {
  const categorySpend = new Map<string, number>();
  
  profileData.transactions
    .filter(t => t.type === 'debit')
    .forEach(t => {
      categorySpend.set(t.category, (categorySpend.get(t.category) || 0) + t.amount);
    });
  
  return Array.from(categorySpend.entries()).map(([category, spent]) => ({
    category,
    allocated: spent * 1.1, // 10% buffer
    spent,
    originalAllocation: spent * 1.1,
    autoAdjusted: false,
  }));
};

// Helper: Initialize mock invoices for freelancers
const initializeMockInvoices = (profile: UserProfile): Invoice[] => {
  if (profile !== 'freelance_designer' && profile !== 'content_creator') {
    return [];
  }
  
  const now = new Date();
  return [
    {
      id: generateId(),
      clientName: 'TechStartup Inc',
      clientEmail: 'payments@techstartup.com',
      amount: 45000,
      invoiceNumber: 'INV-2024-001',
      issuedDate: getISODate(30),
      dueDate: getISODate(15),
      status: 'overdue' as const,
      remindersSent: 1,
      lastReminderDate: getISODate(5),
    },
    {
      id: generateId(),
      clientName: 'Creative Agency',
      clientEmail: 'accounts@creativeagency.in',
      amount: 28000,
      invoiceNumber: 'INV-2024-002',
      issuedDate: getISODate(15),
      dueDate: getFutureDate(5),
      status: 'pending' as const,
      remindersSent: 0,
    },
    {
      id: generateId(),
      clientName: 'Local Business',
      clientEmail: 'owner@localbiz.com',
      amount: 12000,
      invoiceNumber: 'INV-2024-003',
      issuedDate: getISODate(7),
      dueDate: getFutureDate(23),
      status: 'pending' as const,
      remindersSent: 0,
    },
  ];
};

// ============================================================================
// 🧠 CHANAKYA - THE ANALYST (AUTO-MANAGER)
// ============================================================================

export interface ChanakyaIncomeResult {
  success: boolean;
  taxAllocated: number;
  savingsAllocated: number;
  safeToSpendAllocated: number;
  taxRate: number;
  message: string;
  event: AgentEvent;
  adjustedForLeanMonth: boolean;
}

/**
 * Chanakya Agent: Process incoming income and auto-allocate
 * - Dynamically adjusts tax rate based on income patterns
 * - Implements "Variable Income Smoother" for lean months
 */
export const chanakyaProcessIncome = (
  income: number,
  source: string,
  state: RupeeSquadState,
  goals: Goal[]
): ChanakyaIncomeResult => {
  // 1. Calculate dynamic tax rate based on income patterns
  let taxRate = state.currentTaxRate;
  let adjustedForLeanMonth = false;
  
  // Income Smoother: If current income > average, increase tax rate
  if (income > state.averageMonthlyIncome * 1.3) {
    taxRate = Math.min(30, taxRate + 5); // Increase by 5%, max 30%
    adjustedForLeanMonth = true;
  } else if (income < state.averageMonthlyIncome * 0.7) {
    taxRate = Math.max(10, taxRate - 3); // Decrease by 3%, min 10%
  }
  
  // 2. Calculate allocations
  const taxAllocated = Math.round(income * (taxRate / 100));
  
  // 3. Check for close goals (Lakshmi collaboration)
  let savingsAllocated = 0;
  const closeGoals = goals.filter(g => {
    const progress = (g.currentAmount / g.targetAmount) * 100;
    return progress >= 70 && progress < 100;
  });
  
  if (closeGoals.length > 0 && income > state.averageMonthlyIncome) {
    // Auto-save 10% towards closest goal
    savingsAllocated = Math.round(income * 0.10);
  }
  
  // 4. Calculate safe-to-spend
  const safeToSpendAllocated = income - taxAllocated - savingsAllocated;
  
  // 5. Create event
  const event: AgentEvent = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    agent: 'chanakya',
    eventType: 'income_split',
    title: '💰 Income Processed by Chanakya',
    message: adjustedForLeanMonth
      ? `Big payment detected! I've increased your tax reserve to ${taxRate}% to prepare for leaner months. ₹${safeToSpendAllocated.toLocaleString('en-IN')} is safe to spend.`
      : `Income of ₹${income.toLocaleString('en-IN')} from ${source} processed. Tax: ₹${taxAllocated.toLocaleString('en-IN')} | Safe: ₹${safeToSpendAllocated.toLocaleString('en-IN')}`,
    data: {
      totalIncome: income,
      taxAllocated,
      savingsAllocated,
      safeToSpendAllocated,
      taxRate,
      source,
    },
  };
  
  return {
    success: true,
    taxAllocated,
    savingsAllocated,
    safeToSpendAllocated,
    taxRate,
    message: event.message,
    event,
    adjustedForLeanMonth,
  };
};

/**
 * Chanakya's Invoice Hunter: Generate payment reminder
 */
export const chanakyaGenerateInvoiceReminder = (invoice: Invoice): string => {
  const daysPastDue = Math.floor(
    (new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isOverdue = daysPastDue > 0;
  const reminderLevel = invoice.remindersSent + 1;
  
  if (reminderLevel === 1) {
    return `Hi ${invoice.clientName},

I hope this message finds you well! Just a friendly reminder that Invoice #${invoice.invoiceNumber} for ₹${invoice.amount.toLocaleString('en-IN')} ${isOverdue ? `was due ${daysPastDue} days ago` : `is due on ${new Date(invoice.dueDate).toLocaleDateString('en-IN')}`}.

If you've already processed the payment, please disregard this message. Otherwise, I'd appreciate it if you could arrange the payment at your earliest convenience.

Thank you for your continued partnership!

Best regards`;
  } else if (reminderLevel === 2) {
    return `Dear ${invoice.clientName},

I'm following up on my previous reminder regarding Invoice #${invoice.invoiceNumber} for ₹${invoice.amount.toLocaleString('en-IN')}, which is now ${daysPastDue} days overdue.

To help me plan my finances better, could you please let me know when I can expect the payment? If there are any issues or concerns, I'm happy to discuss them.

Looking forward to your response.

Best regards`;
  } else {
    return `Dear ${invoice.clientName},

This is my third follow-up regarding Invoice #${invoice.invoiceNumber} for ₹${invoice.amount.toLocaleString('en-IN')}, which has been pending for ${daysPastDue} days.

I understand that delays can happen, but this payment is crucial for my cash flow. I would really appreciate it if we could resolve this matter within the next 3 business days.

Please let me know if there's anything I can do to expedite the process.

Regards`;
  }
};

// ============================================================================
// 🛡️ KAVACH - THE GUARDIAN (SPENDING SHIELD)
// ============================================================================

export interface KavachExpenseResult {
  approved: boolean;
  reason: string;
  coolingOff: boolean;
  coolingOffExpiry?: string;
  budgetAdjustment?: {
    fromCategory: string;
    toCategory: string;
    amount: number;
    message: string;
  };
  event: AgentEvent;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
}

/**
 * Kavach Agent: Evaluate and protect against risky expenses
 * - Blocks expenses that exceed safe-to-spend
 * - Triggers 24-hour cooling-off for impulse purchases
 * - Auto-stabilizes budgets when overspending detected
 */
export const kavachEvaluateExpense = (
  amount: number,
  category: string,
  description: string,
  state: RupeeSquadState,
  isImpulse: boolean = false
): KavachExpenseResult => {
  const safeBalance = state.safeToSpend;
  const riskCategories = ['shopping', 'entertainment', 'luxury', 'gambling'];
  const essentialCategories = ['food', 'transport', 'healthcare', 'housing', 'utilities', 'education'];
  
  // 1. Check if expense exceeds safe-to-spend
  if (amount > safeBalance) {
    const event: AgentEvent = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      agent: 'kavach',
      eventType: 'expense_blocked',
      title: '🛡️ EXPENSE BLOCKED',
      message: `This ₹${amount.toLocaleString('en-IN')} purchase exceeds your Safe-to-Spend by ₹${(amount - safeBalance).toLocaleString('en-IN')}. I've protected your Tax Vault and savings.`,
      data: { amount, category, exceededBy: amount - safeBalance },
      userActionRequired: true,
      actionButtons: [
        { label: 'Understood', action: 'dismiss' },
        { label: 'See Breakdown', action: 'show_breakdown' },
      ],
    };
    
    return {
      approved: false,
      reason: `Expense exceeds safe balance by ₹${(amount - safeBalance).toLocaleString('en-IN')}`,
      coolingOff: false,
      event,
      riskLevel: 'critical',
    };
  }
  
  // 2. Check remaining balance after expense
  const remainingAfter = safeBalance - amount;
  const minSafeBuffer = 500; // Minimum ₹500 buffer
  
  if (remainingAfter < minSafeBuffer && !essentialCategories.includes(category)) {
    const event: AgentEvent = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      agent: 'kavach',
      eventType: 'expense_blocked',
      title: '⚠️ LOW BALANCE WARNING',
      message: `This purchase would leave only ₹${remainingAfter.toLocaleString('en-IN')} in your Safe-to-Spend. I recommend keeping at least ₹${minSafeBuffer} for emergencies.`,
      data: { amount, category, remainingAfter },
      userActionRequired: true,
      actionButtons: [
        { label: 'Cancel Purchase', action: 'cancel' },
        { label: 'Proceed Anyway', action: 'override' },
      ],
    };
    
    return {
      approved: false,
      reason: 'Would reduce balance below safe minimum',
      coolingOff: false,
      event,
      riskLevel: 'high',
    };
  }
  
  // 3. Check for impulse purchase (> 50% of daily budget equivalent)
  const dailyBudget = safeBalance / 30;
  const isLargeImpulse = isImpulse || (riskCategories.includes(category) && amount > dailyBudget * 3);
  
  if (isLargeImpulse) {
    const coolingOffExpiry = new Date();
    coolingOffExpiry.setHours(coolingOffExpiry.getHours() + 24);
    
    const event: AgentEvent = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      agent: 'kavach',
      eventType: 'cooling_off_started',
      title: '⏱️ 24-HOUR COOLING OFF',
      message: `This looks like an impulse purchase. I've initiated a 24-hour cooling-off period. If you still want "${description}" tomorrow, go ahead! This protects you from regret.`,
      data: { amount, category, description, coolingOffExpiry: coolingOffExpiry.toISOString() },
      userActionRequired: true,
      actionButtons: [
        { label: 'Good Call', action: 'accept_cooloff' },
        { label: 'I Really Need This', action: 'override_cooloff' },
      ],
    };
    
    return {
      approved: false,
      reason: 'Cooling-off period initiated for impulse purchase',
      coolingOff: true,
      coolingOffExpiry: coolingOffExpiry.toISOString(),
      event,
      riskLevel: 'moderate',
    };
  }
  
  // 4. Check category budget and auto-stabilize if needed
  const categoryBudget = state.monthlyBudgets.find(b => b.category === category);
  let budgetAdjustment;
  
  if (categoryBudget && (categoryBudget.spent + amount) > categoryBudget.allocated) {
    // Find a category to borrow from
    const surplusCategory = state.monthlyBudgets.find(
      b => b.category !== category && b.allocated - b.spent > amount * 0.5
    );
    
    if (surplusCategory) {
      const adjustmentAmount = Math.min(
        amount,
        surplusCategory.allocated - surplusCategory.spent
      );
      
      budgetAdjustment = {
        fromCategory: surplusCategory.category,
        toCategory: category,
        amount: adjustmentAmount,
        message: `I've borrowed ₹${adjustmentAmount.toLocaleString('en-IN')} from your ${surplusCategory.category} budget to cover this. Reply 'Undo' if you disagree.`,
      };
    }
  }
  
  // 5. Approved!
  const event: AgentEvent = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    agent: 'kavach',
    eventType: 'expense_approved',
    title: '✅ Expense Approved',
    message: budgetAdjustment
      ? `Expense approved. ${budgetAdjustment.message}`
      : `₹${amount.toLocaleString('en-IN')} for ${category} approved. Remaining safe balance: ₹${remainingAfter.toLocaleString('en-IN')}`,
    data: { amount, category, remainingAfter, budgetAdjustment },
  };
  
  return {
    approved: true,
    reason: 'Expense within safe limits',
    coolingOff: false,
    budgetAdjustment,
    event,
    riskLevel: 'safe',
  };
};

// ============================================================================
// ⭐ LAKSHMI - THE MOTIVATOR (GAMIFICATION)
// ============================================================================

export interface LakshmiNudge {
  goalId: string;
  goalName: string;
  currentProgress: number;
  targetAmount: number;
  suggestedSacrifice?: {
    category: string;
    amount: number;
    description: string;
  };
  message: string;
  event: AgentEvent;
  celebrationTriggered: boolean;
}

/**
 * Lakshmi Agent: Monitor goals and create motivational nudges
 * - Detects when goals are close to completion
 * - Suggests small sacrifices to complete goals faster
 * - Triggers celebrations on goal completion
 */
export const lakshmiCheckGoals = (
  goals: Goal[],
  state: RupeeSquadState,
  recentSpending: { category: string; amount: number }[]
): LakshmiNudge[] => {
  const nudges: LakshmiNudge[] = [];
  
  goals.forEach(goal => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;
    
    // Check if goal just completed
    if (progress >= 100 && !goal.completedAt) {
      const event: AgentEvent = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        agent: 'lakshmi',
        eventType: 'goal_completed',
        title: '🎉 GOAL ACHIEVED!',
        message: `Congratulations! You've reached your "${goal.name}" goal of ₹${goal.targetAmount.toLocaleString('en-IN')}! Time to celebrate! 🎊`,
        data: { goalId: goal.id, goalName: goal.name, targetAmount: goal.targetAmount },
      };
      
      nudges.push({
        goalId: goal.id,
        goalName: goal.name,
        currentProgress: 100,
        targetAmount: goal.targetAmount,
        message: event.message,
        event,
        celebrationTriggered: true,
      });
      return;
    }
    
    // Check if goal is close (85%+) and hasn't been nudged
    if (progress >= 85 && progress < 100 && !goal.nudgeSent) {
      // Find a potential sacrifice from recent spending
      const discretionarySpending = recentSpending.filter(s =>
        ['food', 'entertainment', 'shopping', 'dining'].includes(s.category) &&
        s.amount >= remaining * 0.3 && s.amount <= remaining
      );
      
      let suggestedSacrifice;
      let sacrificeMessage = '';
      
      if (discretionarySpending.length > 0 && remaining <= state.safeToSpend * 0.3) {
        const sacrifice = discretionarySpending[0];
        suggestedSacrifice = {
          category: sacrifice.category,
          amount: Math.min(sacrifice.amount, remaining),
          description: `Skip ${sacrifice.category} this week`,
        };
        sacrificeMessage = ` Skip ${sacrifice.category} spending this week (save ~₹${suggestedSacrifice.amount.toLocaleString('en-IN')}), and you'll hit your goal!`;
      }
      
      const daysUntilDeadline = Math.ceil(
        (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const event: AgentEvent = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        agent: 'lakshmi',
        eventType: 'goal_nudge',
        title: `⭐ So Close to "${goal.name}"!`,
        message: `You're ${progress.toFixed(0)}% there! Only ₹${remaining.toLocaleString('en-IN')} to go.${sacrificeMessage} ${daysUntilDeadline} days until your deadline.`,
        data: {
          goalId: goal.id,
          goalName: goal.name,
          progress,
          remaining,
          daysUntilDeadline,
          suggestedSacrifice,
        },
        userActionRequired: true,
        actionButtons: suggestedSacrifice
          ? [
              { label: `Skip ${suggestedSacrifice.category}`, action: 'accept_sacrifice' },
              { label: 'Not Now', action: 'dismiss' },
            ]
          : [{ label: 'Thanks!', action: 'dismiss' }],
      };
      
      nudges.push({
        goalId: goal.id,
        goalName: goal.name,
        currentProgress: progress,
        targetAmount: goal.targetAmount,
        suggestedSacrifice,
        message: event.message,
        event,
        celebrationTriggered: false,
      });
    }
  });
  
  return nudges;
};

/**
 * Lakshmi's Motivational Messages
 */
export const lakshmiMotivate = (context: 'income' | 'save' | 'goal_close' | 'goal_complete' | 'streak'): string => {
  const messages = {
    income: [
      '💰 Ka-ching! Another day, another rupee. Keep that hustle going!',
      '🎉 Money in! You\'re building your empire one gig at a time.',
      '✨ Income received! The RupeeSquad has your back.',
    ],
    save: [
      '🏦 Smart move! Your future self is doing a happy dance.',
      '💎 Saving today, thriving tomorrow. You got this!',
      '🌟 Every rupee saved is a rupee earned twice!',
    ],
    goal_close: [
      '🎯 You can almost taste it! Just a little more push!',
      '🚀 The finish line is in sight! Don\'t stop now!',
      '⭐ So close! Your goal is waving at you!',
    ],
    goal_complete: [
      '🎊 CHAMPION! You did it! Time to celebrate!',
      '🏆 Goal crushed! You\'re officially a savings superhero!',
      '🎉 Victory! Pop the confetti, you earned this!',
    ],
    streak: [
      '🔥 You\'re on fire! Keep that streak alive!',
      '📈 Consistency is key, and you\'ve got it!',
      '💪 Day after day, you\'re getting stronger!',
    ],
  };
  
  const contextMessages = messages[context];
  return contextMessages[Math.floor(Math.random() * contextMessages.length)];
};

// ============================================================================
// 🏦 BANK SIMULATION CONTROLS
// ============================================================================

export interface SimulationCallbacks {
  onIncomeReceived: (result: ChanakyaIncomeResult) => void;
  onExpenseEvaluated: (result: KavachExpenseResult) => void;
  onGoalNudge: (nudge: LakshmiNudge) => void;
  onStateUpdate: (state: RupeeSquadState) => void;
}

/**
 * Simulate incoming salary/payment (triggers Chanakya)
 */
export const simulateSalary = (
  amount: number,
  source: string,
  state: RupeeSquadState,
  goals: Goal[],
  callbacks: SimulationCallbacks
): RupeeSquadState => {
  // Chanakya processes the income
  const result = chanakyaProcessIncome(amount, source, state, goals);
  
  // Update state
  const newState: RupeeSquadState = {
    ...state,
    safeToSpend: state.safeToSpend + result.safeToSpendAllocated,
    taxVault: state.taxVault + result.taxAllocated,
    goalsSavings: state.goalsSavings + result.savingsAllocated,
    totalBalance: state.totalBalance + amount,
    currentTaxRate: result.taxRate,
    taxRateHistory: [
      ...state.taxRateHistory,
      {
        date: new Date().toISOString(),
        rate: result.taxRate,
        reason: result.adjustedForLeanMonth ? 'Adjusted for lean month preparation' : 'Standard rate',
      },
    ],
    eventLog: [...state.eventLog, result.event],
    agentStatus: { ...state.agentStatus, chanakya: 'active' },
  };
  
  // Trigger callbacks
  callbacks.onIncomeReceived(result);
  callbacks.onStateUpdate(newState);
  
  // Check for goal nudges (Lakshmi)
  setTimeout(() => {
    const recentSpending = state.monthlyBudgets.map(b => ({
      category: b.category,
      amount: b.spent / 4, // Weekly equivalent
    }));
    
    const nudges = lakshmiCheckGoals(goals, newState, recentSpending);
    nudges.forEach(nudge => callbacks.onGoalNudge(nudge));
  }, 1500); // Slight delay for UX
  
  return newState;
};

/**
 * Simulate expense attempt (triggers Kavach)
 */
export const simulateExpense = (
  amount: number,
  category: string,
  description: string,
  state: RupeeSquadState,
  isImpulse: boolean = false,
  callbacks: SimulationCallbacks
): RupeeSquadState => {
  // Kavach evaluates the expense
  const result = kavachEvaluateExpense(amount, category, description, state, isImpulse);
  
  let newState = { ...state };
  
  if (result.approved) {
    newState = {
      ...state,
      safeToSpend: state.safeToSpend - amount,
      totalBalance: state.totalBalance - amount,
      monthlyBudgets: state.monthlyBudgets.map(b =>
        b.category === category
          ? { ...b, spent: b.spent + amount }
          : result.budgetAdjustment && b.category === result.budgetAdjustment.fromCategory
          ? {
              ...b,
              allocated: b.allocated - result.budgetAdjustment.amount,
              autoAdjusted: true,
              adjustmentReason: `Transferred to ${category}`,
            }
          : b
      ),
      eventLog: [...state.eventLog, result.event],
      agentStatus: { ...state.agentStatus, kavach: 'active' },
    };
  } else if (result.coolingOff) {
    // Add to cooling off list
    const coolingOffTransaction: Transaction = {
      id: generateId(),
      date: getDateString(0),
      timestamp: new Date().toISOString(),
      description,
      amount,
      type: 'debit',
      category,
      isRecurring: false,
      isImpulse: true,
      agentProcessed: true,
      coolingOff: true,
      coolingOffExpiry: result.coolingOffExpiry,
    };
    
    newState = {
      ...state,
      coolingOffItems: [...state.coolingOffItems, coolingOffTransaction],
      eventLog: [...state.eventLog, result.event],
      agentStatus: { ...state.agentStatus, kavach: 'alert' },
    };
  } else {
    // Blocked expense
    const blockedTransaction: Transaction = {
      id: generateId(),
      date: getDateString(0),
      timestamp: new Date().toISOString(),
      description,
      amount,
      type: 'debit',
      category,
      isRecurring: false,
      agentProcessed: true,
      blockedReason: result.reason,
    };
    
    newState = {
      ...state,
      blockedExpenses: [...state.blockedExpenses, blockedTransaction],
      eventLog: [...state.eventLog, result.event],
      agentStatus: { ...state.agentStatus, kavach: 'alert' },
    };
  }
  
  // Trigger callbacks
  callbacks.onExpenseEvaluated(result);
  callbacks.onStateUpdate(newState);
  
  return newState;
};

/**
 * Get predefined simulation scenarios for demo
 */
export const getSimulationScenarios = () => [
  {
    id: 'salary_normal',
    name: 'Regular Salary',
    type: 'income' as const,
    amount: 30000,
    source: 'Swiggy Weekly Payout',
    description: 'Normal weekly payout from Swiggy',
  },
  {
    id: 'salary_big',
    name: 'Big Payment (Triggers Income Smoother)',
    type: 'income' as const,
    amount: 75000,
    source: 'Client Project Payment',
    description: 'Large client payment - Chanakya will adjust tax rate',
  },
  {
    id: 'expense_safe',
    name: 'Safe Expense',
    type: 'expense' as const,
    amount: 500,
    category: 'food',
    description: 'D-Mart Groceries',
    isImpulse: false,
  },
  {
    id: 'expense_impulse',
    name: 'Impulse Purchase (Triggers Cooling-Off)',
    type: 'expense' as const,
    amount: 15000,
    category: 'shopping',
    description: 'Gaming Console - Amazon',
    isImpulse: true,
  },
  {
    id: 'expense_block',
    name: 'Risky Expense (Gets Blocked)',
    type: 'expense' as const,
    amount: 50000,
    category: 'luxury',
    description: 'Designer Watch',
    isImpulse: true,
  },
  {
    id: 'expense_budget_adjust',
    name: 'Overspend Category (Triggers Auto-Stabilization)',
    type: 'expense' as const,
    amount: 3000,
    category: 'entertainment',
    description: 'Concert Tickets',
    isImpulse: false,
  },
];
