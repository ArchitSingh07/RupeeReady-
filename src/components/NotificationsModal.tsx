import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, TrendingUp, Shield, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const notifications = [
    {
      id: '1',
      type: 'bill',
      icon: Calendar,
      title: 'Airtel Bill Due Soon',
      message: 'Your Airtel bill of ₹499 is due in 3 days.',
      time: '2 hours ago',
      unread: true,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: '2',
      type: 'goal',
      icon: TrendingUp,
      title: 'Goal Milestone Reached!',
      message: 'You\'ve reached 80% of your Emergency Fund goal!',
      time: '5 hours ago',
      unread: true,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: '3',
      type: 'security',
      icon: Shield,
      title: 'Security Tip',
      message: 'Kavach suggests enabling two-factor authentication.',
      time: '1 day ago',
      unread: false,
      color: 'from-teal-600 to-emerald-600',
    },
    {
      id: '4',
      type: 'income',
      icon: DollarSign,
      title: 'Swiggy Payment Received',
      message: 'You received ₹4,500 from Swiggy for deliveries.',
      time: '2 days ago',
      unread: false,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: '5',
      type: 'insight',
      icon: Bell,
      title: 'Spending Insight',
      message: 'Your food delivery expenses are 20% higher this month.',
      time: '3 days ago',
      unread: false,
      color: 'from-purple-500 to-indigo-500',
    },
  ];

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
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            <motion.div
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 max-w-md w-full mx-4 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-600">
                      {notifications.filter(n => n.unread).length} unread
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto flex-1 -mx-2 px-2">
                <div className="space-y-3">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          notification.unread
                            ? 'bg-teal-50 border-teal-200 hover:bg-teal-100'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${notification.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-gray-900">{notification.title}</h4>
                              {notification.unread && (
                                <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-gray-700 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log('Mark all as read')}
                >
                  Mark All as Read
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
