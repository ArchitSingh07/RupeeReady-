import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthChange, 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  logOut,
  getUserProfile,
  updateUserProfile,
  checkRedirectResult
} from '../lib/firebase';

// Types
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  safe_balance: number;
  tax_vault: number;
  total_income: number;
  total_expenses: number;
  notifications_enabled: boolean;
  dark_mode: boolean;
  createdAt: string;
  onboardingCompleted?: boolean;
  userType?: string;
  monthlyIncome?: number;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>, skipRefresh?: boolean) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session storage keys
const SESSION_KEYS = {
  lastActivity: 'rupeeready_last_activity',
  sessionExpiry: 'rupeeready_session_expiry',
};

// Session timeout (24 hours in milliseconds)
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update session activity
  const updateSessionActivity = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(SESSION_KEYS.lastActivity, now.toString());
    localStorage.setItem(SESSION_KEYS.sessionExpiry, (now + SESSION_TIMEOUT).toString());
  }, []);

  // Check if session is valid
  const isSessionValid = useCallback(() => {
    const expiry = localStorage.getItem(SESSION_KEYS.sessionExpiry);
    if (!expiry) return true; // No expiry set, allow initial auth
    return Date.now() < parseInt(expiry, 10);
  }, []);

  // Fetch user profile from Firestore with retry logic
  const fetchUserProfile = useCallback(async (uid: string, retryCount = 0): Promise<UserProfile | null> => {
    try {
      const { data, error: profileError } = await getUserProfile(uid);
      if (data) {
        setUserProfile(data as UserProfile);
        // Update last login time (don't await to avoid blocking)
        updateUserProfile(uid, { lastLoginAt: new Date().toISOString() }).catch(console.error);
        return data as UserProfile;
      } else if (profileError) {
        console.error('Error fetching user profile:', profileError);
        // If profile not found and we haven't retried too many times, wait and retry
        // This handles the case where Firestore write hasn't propagated yet
        if (profileError.includes('not found') && retryCount < 3) {
          console.log(`Profile not found, retrying in 500ms (attempt ${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 500));
          return fetchUserProfile(uid, retryCount + 1);
        }
      }
      return null;
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      return null;
    }
  }, []);

  // Handle Google redirect result on mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const wasRedirecting = sessionStorage.getItem('googleSignInRedirect');
        if (wasRedirecting) {
          sessionStorage.removeItem('googleSignInRedirect');
          const result = await checkRedirectResult();
          if (result.error) {
            setError(result.error);
          }
          // The onAuthStateChanged listener will handle the user state
        }
      } catch (err) {
        console.error('Error handling redirect result:', err);
      }
    };
    
    handleRedirectResult();
  }, []);

  // Listen to auth state changes - this is the single source of truth for auth state
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email || 'null');
      
      if (firebaseUser) {
        // Check session validity
        if (!isSessionValid()) {
          // Session expired, log out
          console.log('Session expired, logging out');
          await logOut();
          setUser(null);
          setUserProfile(null);
          setError('Your session has expired. Please log in again.');
        } else {
          setUser(firebaseUser);
          // Fetch user profile
          const profile = await fetchUserProfile(firebaseUser.uid);
          console.log('Profile fetched:', profile?.email || 'null', 'onboardingCompleted:', profile?.onboardingCompleted);
          updateSessionActivity();
        }
      } else {
        setUser(null);
        setUserProfile(null);
        // Clear session data
        localStorage.removeItem(SESSION_KEYS.lastActivity);
        localStorage.removeItem(SESSION_KEYS.sessionExpiry);
      }
      
      setLoading(false);
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, [fetchUserProfile, isSessionValid, updateSessionActivity]);

  // Update session activity on user interaction
  useEffect(() => {
    if (!user) return;
    
    const handleActivity = () => {
      updateSessionActivity();
    };
    
    // Listen for user activity
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [user, updateSessionActivity]);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setError(null);
    
    try {
      console.log('Attempting login for:', email);
      const { user: firebaseUser, error: loginError } = await signInWithEmail(email, password);
      
      if (loginError) {
        setError(loginError);
        return { success: false, error: loginError };
      }
      
      if (firebaseUser) {
        console.log('Login successful, waiting for auth state change...');
        // The onAuthStateChanged listener will handle updating user and userProfile
        // We just need to signal success here
        return { success: true };
      }
      
      return { success: false, error: 'Login failed - no user returned' };
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register with email/password
  const register = async (email: string, password: string, displayName: string) => {
    setError(null);
    
    try {
      console.log('Attempting registration for:', email);
      const { user: firebaseUser, error: registerError } = await signUpWithEmail(email, password, displayName);
      
      if (registerError) {
        setError(registerError);
        return { success: false, error: registerError };
      }
      
      if (firebaseUser) {
        console.log('Registration successful, waiting for auth state change...');
        // The onAuthStateChanged listener will handle updating user and userProfile
        return { success: true, isNewUser: true };
      }
      
      return { success: false, error: 'Registration failed - no user returned' };
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setError(null);
    
    try {
      console.log('Attempting Google login...');
      const result = await signInWithGoogle();
      
      // Check if redirecting (for popup blocked scenarios)
      if ('redirecting' in result && result.redirecting) {
        return { success: false, error: 'Redirecting to Google...' };
      }
      
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      
      if (result.user) {
        console.log('Google login successful, waiting for auth state change...');
        // The onAuthStateChanged listener will handle updating user and userProfile
        return { success: true, isNewUser: result.isNewUser };
      }
      
      return { success: true, isNewUser: true };
    } catch (err: any) {
      const errorMessage = err.message || 'Google login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    await logOut();
    setUser(null);
    setUserProfile(null);
    setLoading(false);
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>, skipRefresh = false) => {
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }
    
    try {
      const { error: updateError } = await updateUserProfile(user.uid, updates);
      
      if (updateError) {
        return { success: false, error: updateError };
      }
      
      // Optionally skip refresh for faster completion (e.g., during onboarding)
      if (!skipRefresh) {
        await fetchUserProfile(user.uid);
      } else {
        // Update local state optimistically without fetching
        setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    isInitialized,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshProfile,
    updateProfile,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
