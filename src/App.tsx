import { useState } from 'react';
import { LandingPageIndia } from './components/LandingPageIndia';
import { LoginPageIndia } from './components/LoginPageIndia';
import { RegisterPageIndia } from './components/RegisterPageIndia';
import { OnboardingFlowIndia } from './components/OnboardingFlowIndia';
import { DashboardIndia } from './components/DashboardIndia';
import { FeaturesPage } from './components/FeaturesPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { RupeeCursor } from './components/RupeeCursor';
import { RupeeSquad } from './components/RupeeSquad';
import { PersistentHeader } from './components/PersistentHeader';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfileModal } from './components/ProfileModal';
import { Toaster } from './components/ui/sonner';

type AppState = 'landing' | 'login' | 'register' | 'onboarding' | 'dashboard' | 'features' | 'pricing' | 'about' | 'how-it-works';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Modal states for dashboard
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Landing -> Register
  const handleGetStarted = () => {
    setAppState('register');
  };

  // Navigate to info pages
  const handleGoToFeatures = () => {
    setAppState('features');
  };

  const handleGoToPricing = () => {
    setAppState('pricing');
  };

  const handleGoToAbout = () => {
    setAppState('about');
  };

  const handleGoToHowItWorks = () => {
    setAppState('how-it-works');
  };

  const handleGoToLanding = () => {
    setAppState('landing');
  };

  const handleGoToLogin = () => {
    setAppState('login');
  };

  const handleGoToRegister = () => {
    setAppState('register');
  };

  // Register -> Login
  const handleRegisterComplete = () => {
    setAppState('login');
  };

  // Login -> Onboarding (first time) or Dashboard
  const handleLogin = () => {
    // For first-time users, show onboarding
    // In a real app, you'd check if user has completed onboarding
    setIsAuthenticated(true);
    setAppState('onboarding');
  };

  // Onboarding -> Dashboard
  const handleOnboardingComplete = () => {
    setAppState('dashboard');
  };

  // Dashboard -> Landing (logout)
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAppState('landing');
  };

  // Determine header mode based on authentication state
  const headerMode = isAuthenticated ? 'authenticated' : 'guest';
  
  // Show header on all pages except login, register, and onboarding
  const showHeader = !['login', 'register', 'onboarding'].includes(appState);

  return (
    <div className="relative">
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Persistent Header - shown on all main pages */}
      {showHeader && (
        <PersistentHeader
          mode={headerMode}
          currentPage={appState}
          userName={isAuthenticated ? "Rahul" : undefined}
          notificationCount={isAuthenticated ? 5 : 0}
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
          onProfileClick={() => setShowProfile(true)}
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
          onLogin={handleLogin}
          onRegister={handleGoToRegister}
        />
      )}

      {appState === 'onboarding' && (
        <OnboardingFlowIndia onComplete={handleOnboardingComplete} />
      )}

      {appState === 'dashboard' && (
        <DashboardIndia onLogout={handleLogout} />
      )}

      {/* Global RupeeSquad - appears on all pages */}
      <RupeeSquad />
      
      <RupeeCursor />
      <Toaster />
      
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