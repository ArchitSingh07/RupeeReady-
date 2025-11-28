import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Bell, Lock, Palette, Moon, Sun, Globe, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    notifications: {
      billReminders: true,
      goalMilestones: true,
      securityAlerts: true,
      spendingInsights: false,
    },
    preferences: {
      darkMode: false,
      language: 'en',
      currency: 'INR',
    },
    privacy: {
      dataSharing: false,
      analytics: true,
    },
  });

  const toggleSetting = (category: string, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: !prev[category as keyof typeof prev][key as keyof typeof prev[typeof category]],
      },
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 max-w-lg w-full shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-900">Settings</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="overflow-y-auto flex-1 -mx-2 px-2">
                <div className="space-y-6">
                  {/* Notifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="w-5 h-5 text-gray-700" />
                      <h4 className="text-sm text-gray-900">Notification Preferences</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Bill Reminders</p>
                          <p className="text-xs text-gray-600">Get notified before bills are due</p>
                        </div>
                        <Switch
                          checked={settings.notifications.billReminders}
                          onCheckedChange={() => toggleSetting('notifications', 'billReminders')}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Goal Milestones</p>
                          <p className="text-xs text-gray-600">Celebrate your progress</p>
                        </div>
                        <Switch
                          checked={settings.notifications.goalMilestones}
                          onCheckedChange={() => toggleSetting('notifications', 'goalMilestones')}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Security Alerts</p>
                          <p className="text-xs text-gray-600">Important security notifications</p>
                        </div>
                        <Switch
                          checked={settings.notifications.securityAlerts}
                          onCheckedChange={() => toggleSetting('notifications', 'securityAlerts')}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Spending Insights</p>
                          <p className="text-xs text-gray-600">AI-generated spending tips</p>
                        </div>
                        <Switch
                          checked={settings.notifications.spendingInsights}
                          onCheckedChange={() => toggleSetting('notifications', 'spendingInsights')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200" />

                  {/* Appearance */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Palette className="w-5 h-5 text-gray-700" />
                      <h4 className="text-sm text-gray-900">Appearance</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          {settings.preferences.darkMode ? (
                            <Moon className="w-4 h-4 text-gray-700" />
                          ) : (
                            <Sun className="w-4 h-4 text-gray-700" />
                          )}
                          <div>
                            <p className="text-sm text-gray-900">Dark Mode</p>
                            <p className="text-xs text-gray-600">Toggle dark theme</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.preferences.darkMode}
                          onCheckedChange={() => toggleSetting('preferences', 'darkMode')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200" />

                  {/* Privacy */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-5 h-5 text-gray-700" />
                      <h4 className="text-sm text-gray-900">Privacy & Security</h4>
                    </div>
                    <div className="space-y-3 pl-7">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Data Sharing</p>
                          <p className="text-xs text-gray-600">Share anonymized data for insights</p>
                        </div>
                        <Switch
                          checked={settings.privacy.dataSharing}
                          onCheckedChange={() => toggleSetting('privacy', 'dataSharing')}
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm text-gray-900">Analytics</p>
                          <p className="text-xs text-gray-600">Help us improve RupeeReady AI</p>
                        </div>
                        <Switch
                          checked={settings.privacy.analytics}
                          onCheckedChange={() => toggleSetting('privacy', 'analytics')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200" />

                  {/* Account Actions */}
                  <div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Change password')}>
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Export data')}>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Export Financial Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 border-0"
                  onClick={onClose}
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
