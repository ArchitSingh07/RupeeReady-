import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, ShieldAlert, Target, FileText } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'income' | 'expense-blocked' | 'goal-nudge' | 'invoice';
  title: string;
  message: string;
  amount?: number;
  character: 'chanakya' | 'kavach' | 'lakshmi';
  timestamp: Date;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationSlideInProps {
  notification: Notification | null;
  onDismiss: () => void;
  duration?: number;
}

const characterColors = {
  chanakya: 'from-amber-500 to-orange-600',
  kavach: 'from-red-500 to-rose-600',
  lakshmi: 'from-emerald-500 to-teal-600',
};

const characterIcons = {
  income: TrendingUp,
  'expense-blocked': ShieldAlert,
  'goal-nudge': Target,
  invoice: FileText,
};

export function NotificationSlideIn({ notification, onDismiss, duration = 5000 }: NotificationSlideInProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / duration) * 50;
        if (newProgress <= 0) {
          clearInterval(interval);
          onDismiss();
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [notification, duration, onDismiss]);

  if (!notification) return null;

  const Icon = characterIcons[notification.type];
  const colorClass = characterColors[notification.character];

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
        >
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700/30">
              <motion.div
                className={`h-full bg-gradient-to-r ${colorClass}`}
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>

            {/* Header */}
            <div className={`p-4 bg-gradient-to-r ${colorClass} bg-opacity-10`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <p className="text-xs text-slate-400">
                      {notification.character.charAt(0).toUpperCase() + notification.character.slice(1)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onDismiss}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-slate-300 text-sm mb-3">{notification.message}</p>
              
              {notification.amount && (
                <div className="mb-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Amount</div>
                  <div className="text-2xl font-bold text-white">
                    ₹{notification.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              )}

              {notification.actionLabel && notification.onAction && (
                <button
                  onClick={notification.onAction}
                  className={`w-full py-2.5 px-4 bg-gradient-to-r ${colorClass} text-white rounded-lg font-medium hover:opacity-90 transition-opacity`}
                >
                  {notification.actionLabel}
                </button>
              )}
            </div>

            {/* Decorative glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${colorClass} opacity-20 blur-3xl`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage notifications queue
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (currentNotification === null && notifications.length > 0) {
      setCurrentNotification(notifications[0]);
      setNotifications((prev) => prev.slice(1));
    }
  }, [currentNotification, notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    setNotifications((prev) => [
      ...prev,
      {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
      },
    ]);
  };

  const dismissCurrent = () => {
    setCurrentNotification(null);
  };

  return {
    currentNotification,
    addNotification,
    dismissCurrent,
  };
}
