// Firebase Configuration for RupeeReady
// Replace the config values with your Firebase project credentials

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile as updateFirebaseProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';

// Your Firebase configuration
// Get these values from Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set persistence to local (survives browser restart)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting persistence:', error);
});

// Google Auth Provider - properly configured
const googleProvider = new GoogleAuthProvider();
// Add scopes for additional user info
googleProvider.addScope('email');
googleProvider.addScope('profile');
// Set custom parameters for better UX
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Check for redirect result on app load (for Google sign-in redirect flow)
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      
      // Check if user profile exists, if not create one
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const isNewUser = !userDoc.exists();
      
      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          safe_balance: 0,
          tax_vault: 0,
          total_income: 0,
          total_expenses: 0,
          notifications_enabled: true,
          dark_mode: true,
          onboardingCompleted: false,
        });
      }
      
      return { user, error: null, isNewUser };
    }
    return { user: null, error: null, isNewUser: false };
  } catch (error: any) {
    console.error('Redirect result error:', error);
    return { user: null, error: error.message, isNewUser: false };
  }
};

// ============================================================================
// AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's display name in Firebase Auth
    await updateFirebaseProfile(user, { displayName });
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      photoURL: null,
      createdAt: new Date().toISOString(),
      // Financial data
      safe_balance: 0,
      tax_vault: 0,
      total_income: 0,
      total_expenses: 0,
      // Preferences
      notifications_enabled: true,
      dark_mode: true,
      onboardingCompleted: false,
    });
    
    return { user, error: null };
  } catch (error: any) {
    // Handle specific Firebase auth errors with user-friendly messages
    let errorMessage = 'Registration failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please sign in instead.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password sign-up is not enabled. Please contact support.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        errorMessage = error.message || 'Registration failed. Please try again.';
    }
    
    console.error('Sign Up Error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    // Handle specific Firebase auth errors with user-friendly messages
    let errorMessage = 'Sign-in failed. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email. Please register first.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password. Please check and try again.';
        break;
      default:
        errorMessage = error.message || 'Sign-in failed. Please try again.';
    }
    
    console.error('Sign In Error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
};

/**
 * Sign in with Google - with popup fallback to redirect
 */
export const signInWithGoogle = async () => {
  try {
    // Try popup first (works on most browsers)
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const isNewUser = !userDoc.exists();
    
    if (isNewUser) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        safe_balance: 0,
        tax_vault: 0,
        total_income: 0,
        total_expenses: 0,
        notifications_enabled: true,
        dark_mode: true,
        onboardingCompleted: false,
      });
    }
    
    return { user, error: null, isNewUser };
  } catch (error: any) {
    // Handle specific Firebase auth errors with user-friendly messages
    let errorMessage = 'Google sign-in failed. Please try again.';
    
    // If popup was blocked, try redirect
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      try {
        // Store that we're using redirect flow
        sessionStorage.setItem('googleSignInRedirect', 'true');
        await signInWithRedirect(auth, googleProvider);
        return { user: null, error: null, isNewUser: false, redirecting: true };
      } catch (redirectError: any) {
        console.error('Redirect also failed:', redirectError);
        errorMessage = 'Google sign-in failed. Please enable popups or try again.';
      }
    }
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed. Please try again.';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Sign-in was cancelled. Please try again.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection and try again.';
        break;
      case 'auth/unauthorized-domain':
        errorMessage = 'This domain is not authorized for Google sign-in. Please contact support.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Google sign-in is not enabled. Please contact support.';
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage = 'An account already exists with this email using a different sign-in method.';
        break;
      default:
        errorMessage = error.message || 'Google sign-in failed. Please try again.';
    }
    
    console.error('Google Sign-In Error:', error.code, error.message);
    return { user: null, error: errorMessage, isNewUser: false };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    let errorMessage = 'Failed to send reset email. Please try again.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email address.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        errorMessage = error.message || 'Failed to send reset email. Please try again.';
    }
    
    console.error('Password Reset Error:', error.code, error.message);
    return { error: errorMessage };
  }
};

/**
 * Sign out
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Auth state listener
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// ============================================================================
// FIRESTORE FUNCTIONS
// ============================================================================

/**
 * Get user profile
 */
export const getUserProfile = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    }
    return { data: null, error: 'User not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (uid: string, updates: Record<string, any>) => {
  try {
    await updateDoc(doc(db, 'users', uid), updates);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Get user transactions
 */
export const getUserTransactions = async (uid: string, limitCount: number = 50) => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('user_id', '==', uid),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { data: transactions, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

/**
 * Add a transaction
 */
export const addTransaction = async (transaction: {
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category?: string;
  description?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transaction,
      timestamp: new Date().toISOString(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

/**
 * Get user goals
 */
export const getUserGoals = async (uid: string) => {
  try {
    const q = query(
      collection(db, 'goals'),
      where('user_id', '==', uid)
    );
    const querySnapshot = await getDocs(q);
    const goals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { data: goals, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

/**
 * Add a goal
 */
export const addGoal = async (goal: {
  user_id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'goals'), {
      ...goal,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

/**
 * Update a goal
 */
export const updateGoal = async (goalId: string, updates: Record<string, any>) => {
  try {
    await updateDoc(doc(db, 'goals', goalId), updates);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Delete a goal
 */
export const deleteGoal = async (goalId: string) => {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'goals', goalId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export default app;
