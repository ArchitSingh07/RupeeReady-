import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Shield, TrendingUp, Target, AlertCircle, Coffee, BarChart3, Lock, Zap, PieChart, Bell, FileText, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';

interface FeaturesPageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function FeaturesPage({ onBack, onGetStarted }: FeaturesPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time "Safe to Spend"',
      description: 'Your true spendable balance, calculated in real-time after taxes, bills, and savings goals.',
      benefits: [
        'Instant clarity on what you can actually spend',
        'Automatically updated with every transaction',
        'Never overspend again with variable income',
        'Indian Rupee numbering system (₹1,00,000)',
      ],
      gradient: 'from-teal-500 to-cyan-500',
      glow: 'rgba(20, 184, 166, 0.4)',
    },
    {
      icon: Shield,
      title: 'Smart Tax Vault',
      description: 'Automatically sets aside money for taxes based on Indian tax rates and your income patterns.',
      benefits: [
        'Integrated with Indian tax slabs (5%, 20%, 30%)',
        'GST calculations for freelancers',
        'Quarterly tax payment reminders',
        'Export-ready tax reports for filing',
      ],
      gradient: 'from-orange-500 to-amber-500',
      glow: 'rgba(255, 107, 53, 0.4)',
    },
    {
      icon: Target,
      title: 'Goal-Based Savings',
      description: 'Set financial goals and watch Lakshmi celebrate each milestone as you progress.',
      benefits: [
        'Multiple savings goals with progress tracking',
        'AI-powered suggestions for goal amounts',
        'Automatic allocation from income',
        'Celebration animations on achievement',
      ],
      gradient: 'from-purple-500 to-violet-500',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    {
      icon: AlertCircle,
      title: 'Mindful Spending Nudges',
      description: 'Kavach alerts you about potential impulse purchases based on your spending patterns.',
      benefits: [
        'Pattern recognition for repeat regrets',
        'Gentle nudges, not restrictions',
        'Comparison with similar past purchases',
        'One-click to proceed or reconsider',
      ],
      gradient: 'from-amber-500 to-yellow-500',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    {
      icon: Coffee,
      title: 'Subscription & Expense Auditor',
      description: 'Identify unused subscriptions and categorize business expenses for tax deductions.',
      benefits: [
        'Auto-detect recurring subscriptions',
        'Usage tracking for each subscription',
        'Suggested downgrades or cancellations',
        'Business expense categorization',
      ],
      gradient: 'from-cyan-500 to-blue-500',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    {
      icon: BarChart3,
      title: 'Income Pattern Analysis',
      description: 'Chanakya analyzes your variable income to predict trends and help you plan ahead.',
      benefits: [
        'Monthly and quarterly income trends',
        'Peak earning period identification',
        'Low-income month preparation',
        'Personalized budgeting recommendations',
      ],
      gradient: 'from-emerald-500 to-green-500',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'Your data is encrypted with the same standards used by banks.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'We never sell your data. Your financial information stays yours.',
    },
    {
      icon: FileText,
      title: 'Compliant & Transparent',
      description: 'Fully compliant with RBI guidelines and Indian data protection laws.',
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
                <span className="text-sm text-gray-300">AI-Powered Features</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6">
                <span className="gradient-text-animated">Everything You Need</span>
                <br />
                <span className="text-white">To Master Your Finances</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Built exclusively for India's gig workers and freelancers, RupeeReady AI combines powerful automation with simple, actionable insights.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${feature.glow}, transparent 70%)` }}
                  />
                  
                  <div className="relative glass-premium rounded-3xl p-8 border border-white/10 h-full spotlight-effect group-hover:border-white/20 transition-all duration-300">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Title & Description */}
                    <h3 className="text-2xl text-white mb-3 group-hover:text-teal-300 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

                    {/* Benefits List */}
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl mb-4">
                <span className="gradient-text-animated">Security & Privacy</span>
              </h2>
              <p className="text-xl text-gray-400">Your trust is our top priority</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-premium rounded-3xl p-10 border border-white/10 text-center spotlight-effect group"
                >
                  <motion.div 
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-purple-500/20 to-orange-500/30 animate-gradient rounded-3xl blur-sm" />
              
              <div className="relative glass-premium rounded-3xl p-12 md:p-16 border border-white/20 text-center spotlight-effect">
                {/* Decorative orbs */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🚀
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl mb-6 gradient-text-animated relative z-10">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                  Join thousands of gig workers who've taken control of their finances
                </p>
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black px-10 py-7 text-lg shadow-2xl shadow-teal-500/40 magnetic-btn relative z-10 rounded-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
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
