import { motion } from 'motion/react';
import { AlertCircle, Coffee, Zap, X, TrendingDown, Calendar, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Alert {
  id: string;
  type: 'impulse' | 'burnout' | 'subscription' | 'overspending' | 'bill' | 'security';
  title: string;
  message: string;
  actionLabel?: string;
}

interface InsightsAlertsProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
  onAlertClick?: (alert: Alert) => void;
}

const alertConfig = {
  impulse: {
    icon: AlertCircle,
    color: 'orange',
    bgClass: 'bg-orange-50 border-orange-200',
    iconClass: 'text-orange-600',
    badgeClass: 'bg-orange-100 text-orange-700',
  },
  burnout: {
    icon: Zap,
    color: 'red',
    bgClass: 'bg-red-50 border-red-200',
    iconClass: 'text-red-600',
    badgeClass: 'bg-red-100 text-red-700',
  },
  subscription: {
    icon: Coffee,
    color: 'blue',
    bgClass: 'bg-blue-50 border-blue-200',
    iconClass: 'text-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  overspending: {
    icon: TrendingDown,
    color: 'purple',
    bgClass: 'bg-amber-50 border-amber-200',
    iconClass: 'text-amber-600',
    badgeClass: 'bg-amber-100 text-amber-700',
  },
  bill: {
    icon: Calendar,
    color: 'amber',
    bgClass: 'bg-amber-50 border-amber-200',
    iconClass: 'text-amber-600',
    badgeClass: 'bg-amber-100 text-amber-700',
  },
  security: {
    icon: Shield,
    color: 'teal',
    bgClass: 'bg-teal-50 border-teal-200',
    iconClass: 'text-teal-600',
    badgeClass: 'bg-teal-100 text-teal-700',
  },
};

export function InsightsAlerts({ alerts, onDismiss, onAction, onAlertClick }: InsightsAlertsProps) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-teal-600" />
        <h2 className="text-lg text-[#212121]">Insights & Nudges</h2>
        <Badge variant="secondary">{alerts.length}</Badge>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${config.bgClass} border-2`} data-squad-context="alert">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage: `linear-gradient(45deg, transparent, ${config.color}, transparent)`,
                    backgroundSize: '200% 200%',
                  }}
                />

                <div className="relative p-4">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Icon className={`w-5 h-5 ${config.iconClass}`} />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm text-[#212121]">{alert.title}</h3>
                        <Badge variant="secondary" className={`text-xs ${config.badgeClass}`}>
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#212121]/70 mb-3">
                        {alert.message}
                      </p>

                      {alert.actionLabel && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onAction?.(alert.id);
                            onAlertClick?.(alert);
                          }}
                          className="text-xs"
                        >
                          {alert.actionLabel}
                        </Button>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDismiss?.(alert.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}