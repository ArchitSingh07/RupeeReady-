import { motion } from 'motion/react';
import { Menu, Bell, Settings, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RupeeReadyLogo } from './RupeeReadyLogo';

interface PersistentHeaderProps {
  mode: 'guest' | 'authenticated';
  currentPage?: string;
  userName?: string;
  notificationCount?: number;
  onNavigate?: {
    toLanding?: () => void;
    toFeatures?: () => void;
    toPricing?: () => void;
    toAbout?: () => void;
    toHowItWorks?: () => void;
    toLogin?: () => void;
    toRegister?: () => void;
    toLogout?: () => void;
  };
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function PersistentHeader({ 
  mode, 
  currentPage = 'landing',
  userName,
  notificationCount = 0,
  onNavigate = {},
  onNotificationsClick,
  onSettingsClick,
  onProfileClick
}: PersistentHeaderProps) {
  const navLinks = [
    { label: 'Features', onClick: onNavigate.toFeatures },
    { label: 'Pricing', onClick: onNavigate.toPricing },
    { label: 'How It Works', onClick: onNavigate.toHowItWorks },
    { label: 'About', onClick: onNavigate.toAbout },
  ];

  return (
    <motion.header
      className="fixed top-6 left-0 right-0 z-40 px-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-effect rounded-2xl border border-white/10 px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Brand */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onNavigate.toLanding}
                className="flex items-center gap-2 group"
              >
                <RupeeReadyLogo size="sm" showText={false} />
                <div>
                  <h1 className="text-lg gradient-text group-hover:opacity-80 transition-opacity">
                    RupeeReady AI
                  </h1>
                  {mode === 'authenticated' && userName && (
                    <p className="text-xs text-gray-400">Welcome back, {userName}!</p>
                  )}
                </div>
              </button>
            </div>

            {/* Center: Navigation (Guest mode only) */}
            {mode === 'guest' && (
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {mode === 'guest' ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={onNavigate.toLogin}
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={onNavigate.toRegister}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black shadow-lg shadow-teal-500/30"
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <>
                  {/* Notifications */}
                  <button
                    onClick={onNotificationsClick}
                    className="relative p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-black border-0 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {notificationCount}
                      </Badge>
                    )}
                  </button>

                  {/* Settings */}
                  <button
                    onClick={onSettingsClick}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  {/* Profile */}
                  <button
                    onClick={onProfileClick}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    onClick={onNavigate.toLogout}
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
