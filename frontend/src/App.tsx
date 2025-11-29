import { useState, useEffect } from 'react';
import { LandingPageIndia } from './components/LandingPageIndia';
import { LoginPageIndia } from './components/LoginPageIndia';
import { RegisterPageIndia } from './components/RegisterPageIndia';
import { OnboardingFlowIndia } from './components/OnboardingFlowIndia';
import { DashboardIndia } from './components/DashboardIndia';
import { FeaturesPage } from './components/FeaturesPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { UserProfilePage } from './components/UserProfilePage';
import { RupeeCursor } from './components/RupeeCursor';
import { RupeeSquad } from './components/RupeeSquad';
import { PersistentHeader } from './components/PersistentHeader';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfileModal } from './components/ProfileModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { useAuth } from './contexts/AuthContext';

type AppState = 'landing' | 'login' | 'register' | 'onboarding' | 'dashboard' | 'profile' | 'features' | 'pricing' | 'about' | 'how-it-works' | 'loading';

export default function App() {
  const { user, userProfile, loading, isInitialized, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>('loading');
  
  // Modal states for dashboard
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [manualNavigation, setManualNavigation] = useState(false);

  // Handle auth state changes - only run when initialized and not loading
  useEffect(() => {
    // Skip if manual navigation was triggered (e.g., after onboarding)
    if (manualNavigation) {
      return;
    }
    
    // Wait for auth to be initialized
    if (!isInitialized) {
      setAppState('loading');
      return;
    }

    // Once initialized, handle auth state
    if (user) {
      // User is logged in - check if they need onboarding
      // Wait for userProfile to be loaded
      if (userProfile !== null) {
        if (userProfile.onboardingCompleted) {
          setAppState('dashboard');
        } else {
          setAppState('onboarding');
        }
      } else {
        // User exists but profile not loaded yet, show onboarding as default for new users
        setAppState('onboarding');
      }
    } else {
      // User is not logged in
      // Only go to landing if we're in a "logged in" state or loading
      if (appState === 'loading' || appState === 'dashboard' || appState === 'onboarding') {
        setAppState('landing');
      }
      // Reset manual navigation flag when user logs out
      setManualNavigation(false);
    }
  }, [user, userProfile, isInitialized, manualNavigation]);

  // Navigation handlers
  const handleGetStarted = () => setAppState('register');
  const handleGoToFeatures = () => setAppState('features');
  const handleGoToPricing = () => setAppState('pricing');
  const handleGoToAbout = () => setAppState('about');
  const handleGoToHowItWorks = () => setAppState('how-it-works');
  const handleGoToLanding = () => setAppState('landing');
  const handleGoToLogin = () => setAppState('login');
  const handleGoToRegister = () => setAppState('register');

  // Auth handlers
  const handleRegisterComplete = () => {
    toast.success('Account created successfully! Please log in.');
    setAppState('login');
  };

  const handleLoginSuccess = (isNewUser: boolean = false) => {
    if (isNewUser || !userProfile?.onboardingCompleted) {
      setAppState('onboarding');
    } else {
      setAppState('dashboard');
    }
    toast.success('Welcome back!');
  };

  const handleOnboardingComplete = () => {
    setManualNavigation(true);
    setAppState('dashboard');
    toast.success('Setup complete! Welcome to RupeeReady!');
  };

  const handleLogout = async () => {
    await logout();
    setAppState('landing');
    toast.success('Logged out successfully');
  };

  // Determine states
  const isAuthenticated = !!user;
  const headerMode = isAuthenticated ? 'authenticated' : 'guest';
  const showHeader = !['login', 'register', 'onboarding', 'loading', 'profile', 'landing'].includes(appState);

  // Loading screen
  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading RupeeReady...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Persistent Header */}
      {showHeader && (
        <PersistentHeader
          mode={headerMode}
          currentPage={appState}
          userName={userProfile?.displayName || user?.email?.split('@')[0] || undefined}
          notificationCount={isAuthenticated ? 3 : 0}
          onNavigate={{
            toLanding: handleGoToLanding,
            toFeatures: handleGoToFeatures,
            toPricing: handleGoToPricing,
            toAbout: handleGoToAbout,
            toHowItWorks: handleGoToHowItWorks,
            toLogin: handleGoToLogin,
            toRegister: handleGetStarted,
            toLogout: handleLogout,
          }}
          onNotificationsClick={() => setShowNotifications(true)}
          onSettingsClick={() => setShowSettings(true)}
          onProfileClick={() => setAppState('profile')}
        />
      )}
      
      {appState === 'landing' && (
        <LandingPageIndia 
          onGetStarted={handleGetStarted}
          onLogin={handleGoToLogin}
          onFeatures={handleGoToFeatures}
          onPricing={handleGoToPricing}
          onAbout={handleGoToAbout}
          onHowItWorks={handleGoToHowItWorks}
        />
      )}

      {appState === 'features' && (
        <FeaturesPage
          onBack={handleGoToLanding}
          onGetStarted={handleGetStarted}
        />
      )}

      {appState === 'pricing' && (
        <PricingPage
          onBack={handleGoToLanding}
          onGetStarted={handleGetStarted}
        />
      )}

      {appState === 'about' && (
        <AboutPage
          onBack={handleGoToLanding}
          onGetStarted={handleGetStarted}
        />
      )}

      {appState === 'how-it-works' && (
        <HowItWorksPage
          onBack={handleGoToLanding}
          onGetStarted={handleGetStarted}
        />
      )}

      {appState === 'register' && (
        <RegisterPageIndia
          onRegister={handleRegisterComplete}
          onLogin={handleGoToLogin}
        />
      )}

      {appState === 'login' && (
        <LoginPageIndia
          onLogin={handleLoginSuccess}
          onRegister={handleGoToRegister}
        />
      )}

      {appState === 'onboarding' && (
        <OnboardingFlowIndia onComplete={handleOnboardingComplete} />
      )}

      {appState === 'dashboard' && (
        <DashboardIndia 
          onLogout={handleLogout} 
          onProfile={() => setAppState('profile')}
        />
      )}

      {appState === 'profile' && (
        <UserProfilePage
          onBack={() => setAppState('dashboard')}
          onLogout={handleLogout}
        />
      )}

      {/* Global RupeeSquad */}
      <RupeeSquad />
      <RupeeCursor />
      <Toaster richColors position="top-right" />
      
      {/* Modals */}
      {showNotifications && (
        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
      
      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {showProfile && (
        <ProfileModal
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}