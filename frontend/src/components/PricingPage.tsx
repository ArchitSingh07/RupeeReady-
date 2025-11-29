import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Check, ArrowLeft, Sparkles, Star, Zap, Crown } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';
import { formatIndianCurrency } from '../utils/indianCurrency';

interface PricingPageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function PricingPage({ onBack, onGetStarted }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started with financial clarity',
      features: [
        'Real-time Safe to Spend',
        'Basic Tax Vault',
        'Up to 2 savings goals',
        'Transaction tracking',
        'Monthly income analysis',
        'Mobile app access',
        'RupeeSquad guidance',
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'from-gray-600 to-gray-700',
      glowColor: 'rgba(107, 114, 128, 0.3)',
      icon: '🆓',
    },
    {
      name: 'Pro',
      price: 199,
      period: 'month',
      description: 'Best for active freelancers and gig workers',
      features: [
        'Everything in Free, plus:',
        'Advanced Tax Vault with GST',
        'Unlimited savings goals',
        'Mindful spending nudges',
        'Subscription auditor',
        'Burnout prevention alerts',
        'Detailed income patterns',
        'Export tax reports',
        'Priority support',
      ],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-teal-500 to-cyan-500',
      glowColor: 'rgba(20, 184, 166, 0.5)',
      icon: '⚡',
    },
    {
      name: 'Business',
      price: 499,
      period: 'month',
      description: 'For teams and growing businesses',
      features: [
        'Everything in Pro, plus:',
        'Multi-user accounts (up to 5)',
        'Team expense tracking',
        'Custom tax profiles',
        'Advanced analytics dashboard',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label option',
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-orange-500 to-amber-500',
      glowColor: 'rgba(255, 107, 53, 0.4)',
      icon: '👑',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <Button
                variant="ghost"
                onClick={onBack}
                className="mb-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-purple-500/10 border border-teal-500/20 mb-8"
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span className="text-sm text-gray-300">Simple, Transparent Pricing</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6">
                <span className="gradient-text-animated">Choose Your Plan</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Start free and upgrade as you grow. All plans include our AI-powered RupeeSquad companions.
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black px-5 py-1.5 rounded-full shadow-lg shadow-teal-500/40 flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-black" />
                        <span className="text-xs font-medium">Most Popular</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Glow Effect for Popular Plan */}
                  {plan.popular && (
                    <motion.div 
                      className="absolute inset-0 rounded-3xl blur-2xl"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ background: `radial-gradient(circle at center, ${plan.glowColor}, transparent 70%)` }}
                    />
                  )}
                  
                  <div 
                    className={`relative glass-premium rounded-3xl p-8 border ${plan.popular ? 'border-teal-500/50 shadow-2xl' : 'border-white/10'} h-full spotlight-effect`}
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{plan.icon}</span>
                        <h3 className="text-2xl text-white">{plan.name}</h3>
                      </div>
                      <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-gray-400 text-lg">₹</span>
                        <span className="text-5xl gradient-text-animated font-light">{formatIndianCurrency(plan.price)}</span>
                        <span className="text-gray-500">/{plan.period}</span>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={onGetStarted}
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black shadow-lg shadow-teal-500/40 magnetic-btn' 
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        } py-6 rounded-xl transition-all`}
                      >
                        {plan.cta}
                        {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500 mb-3">What's included:</div>
                      {plan.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className={`text-sm ${feature.includes('Everything') ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20 text-center"
            >
              <div className="glass-premium rounded-3xl p-10 border border-white/10 max-w-4xl mx-auto spotlight-effect">
                <h3 className="text-2xl text-white mb-8">All plans include:</h3>
                <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400">
                  {[
                    { icon: '🔒', title: 'Bank-Grade Security', desc: 'Your data is always protected' },
                    { icon: '🤖', title: 'AI Companions', desc: 'RupeeSquad always included' },
                    { icon: '📱', title: 'Cross-Platform', desc: 'Web, iOS, and Android' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="group"
                    >
                      <motion.div 
                        className="text-4xl mb-4"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="text-white mb-2 text-lg">{item.title}</div>
                      <div className="text-gray-500">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl mb-4">
                <span className="gradient-text-animated">Frequently Asked Questions</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I switch plans anytime?',
                  a: 'Yes! You can upgrade, downgrade, or cancel anytime. Changes take effect immediately.',
                },
                {
                  q: 'Is there a free trial for Pro?',
                  a: 'Absolutely! Get 30 days free when you sign up for Pro. No credit card required.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets.',
                },
                {
                  q: 'Is my financial data secure?',
                  a: 'Yes. We use bank-grade encryption and never store your banking credentials.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="glass-premium rounded-2xl p-6 border border-white/10 spotlight-effect cursor-pointer group"
                >
                  <h4 className="text-lg text-white mb-2 group-hover:text-teal-300 transition-colors">{faq.q}</h4>
                  <p className="text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <RupeeReadyLogo size="sm" />
            <p className="text-gray-500 text-sm mt-6">© 2025 RupeeReady AI. Made with ❤️ for India's gig workers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
