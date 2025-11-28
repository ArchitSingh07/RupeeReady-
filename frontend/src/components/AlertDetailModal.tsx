import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface AlertDetailModalProps {
  alert: { type: 'subscription' | 'impulse' | 'burnout'; title: string } | null;
  onClose: () => void;
}

export function AlertDetailModal({ alert, onClose }: AlertDetailModalProps) {
  if (!alert) return null;
  
  const { type: alertType, title } = alert;

  const getModalContent = () => {
    switch (alertType) {
      case 'subscription':
        return {
          icon: DollarSign,
          color: 'from-amber-500 to-orange-500',
          details: {
            name: 'Netflix Premium',
            cost: formatIndianCurrency(649),
            frequency: 'Monthly',
            lastUsed: '62 days ago',
            totalSpent: formatIndianCurrency(1298),
            suggestion: 'Downgrade to Basic plan',
            savings: formatIndianCurrency(200) + '/month',
          },
          actions: [
            { label: 'Downgrade to Basic', variant: 'default' as const },
            { label: 'Cancel Subscription', variant: 'destructive' as const },
            { label: 'Keep Premium', variant: 'outline' as const },
          ],
        };
      case 'impulse':
        return {
          icon: TrendingUp,
          color: 'from-rose-500 to-pink-500',
          details: {
            purchase: 'Designer Shoes - Myntra',
            amount: formatIndianCurrency(3500),
            pattern: 'Similar purchase made 3 times in last 2 months',
            regretRate: '67% (2 out of 3 times)',
            alternative: 'You have 4 pairs of similar shoes unworn',
            cooldown: '24 hours',
          },
          actions: [
            { label: 'Proceed with Purchase', variant: 'default' as const },
            { label: 'Save to Wishlist (24h)', variant: 'outline' as const },
            { label: 'Cancel', variant: 'ghost' as const },
          ],
        };
      case 'burnout':
        return {
          icon: Calendar,
          color: 'from-purple-500 to-indigo-500',
          details: {
            consecutiveDays: '16 days',
            averageHours: '11.5 hrs/day',
            impact: 'Your productivity dropped 18% in last 3 days',
            suggestion: 'Schedule a rest day',
            incomeImpact: formatIndianCurrency(1800) + ' potential loss',
            healthScore: '42/100 (Concerning)',
          },
          actions: [
            { label: 'Schedule Rest Day', variant: 'default' as const },
            { label: 'Set Work Limit', variant: 'outline' as const },
            { label: 'Remind Me Later', variant: 'ghost' as const },
          ],
        };
      default:
        return null;
    }
  };

  const content = getModalContent();
  if (!content) return null;

  const Icon = content.icon;

  return (
    <AnimatePresence>
      {alert && (
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
              className="bg-white rounded-3xl border-2 border-gray-200 p-8 max-w-md w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${content.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-2xl mb-6 text-gray-900">{title}</h3>

              {/* Details */}
              <div className="space-y-4 mb-8">
                {Object.entries(content.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start">
                    <span className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm text-gray-900 text-right ml-4">{value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {content.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="w-full"
                    onClick={() => {
                      console.log(`Action: ${action.label}`);
                      onClose();
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}