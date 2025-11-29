import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, Lock, Sparkles, TrendingUp, Target, ArrowRight, CheckCircle, Zap, Play } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';

interface HowItWorksPageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function HowItWorksPage({ onBack, onGetStarted }: HowItWorksPageProps) {
  const steps = [
    {
      number: '01',
      title: 'Connect Your Bank Securely',
      description: 'Link your bank accounts safely with Setu API integration. We use bank-level 256-bit encryption and only need read-only access.',
      icon: Lock,
      details: [
        'RBI-compliant integrations',
        'No password storage',
        'Read-only access only',
        '2-factor authentication',
      ],
      gradient: 'from-teal-500 to-cyan-500',
      glow: 'rgba(20, 184, 166, 0.4)',
      emoji: '🔐',
    },
    {
      number: '02',
      title: 'AI Learns Your Patterns',
      description: 'RupeeReady analyzes your income, expenses, and spending habits to provide personalized insights tailored for Indian gig workers.',
      icon: Sparkles,
      details: [
        'Variable income analysis',
        'Spending pattern recognition',
        'Income trend predictions',
        'Personalized recommendations',
      ],
      gradient: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.4)',
      emoji: '🤖',
    },
    {
      number: '03',
      title: 'See Your True Balance',
      description: 'Get instant clarity on your "Safe to Spend" amount after automatically setting aside money for taxes, bills, and savings.',
      icon: TrendingUp,
      details: [
        'Real-time calculations',
        'Automatic tax allocation',
        'Bill payment tracking',
        'Indian tax rate integration',
      ],
      gradient: 'from-emerald-500 to-teal-500',
      glow: 'rgba(16, 185, 129, 0.4)',
      emoji: '💰',
    },
    {
      number: '04',
      title: 'Achieve Your Goals',
      description: 'Set financial goals and let the RupeeSquad guide you to success with smart recommendations and celebration animations.',
      icon: Target,
      details: [
        'Multiple savings goals',
        'Progress celebrations',
        'Smart allocation suggestions',
        'Achievement milestones',
      ],
      gradient: 'from-purple-500 to-violet-500',
      glow: 'rgba(139, 92, 246, 0.4)',
      emoji: '🎯',
    },
  ];

  const benefits = [
    {
      title: 'Made for Variable Income',
      description: 'Unlike traditional budgeting apps, RupeeReady understands that your income changes every week.',
      icon: TrendingUp,
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      title: 'Indian Tax Integration',
      description: 'Built-in knowledge of Indian tax slabs, GST calculations, and quarterly payment reminders.',
      icon: CheckCircle,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'AI Companions',
      description: 'Chanakya, Kavach, and Lakshmi provide personalized guidance that feels like having a financial advisor.',
      icon: Sparkles,
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Mindful Spending',
      description: 'Gentle nudges, not restrictions. Make informed decisions about every purchase.',
      icon: Target,
      gradient: 'from-emerald-500 to-teal-500',
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
                <Play className="h-4 w-4 text-teal-400" />
                <span className="text-sm text-gray-300">Simple 4-Step Process</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6">
                <span className="gradient-text-animated">How RupeeReady AI</span>
                <br />
                <span className="text-white">Works</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Four simple steps to transform your relationship with money
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-32">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:grid-flow-col-dense'
                    }`}
                  >
                    {/* Content */}
                    <div className={isEven ? '' : 'lg:col-start-2'}>
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div 
                          className="text-7xl font-bold text-white/5"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                        >
                          {step.number}
                        </motion.div>
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>
                      <h3 className="text-3xl md:text-4xl text-white mb-4">{step.title}</h3>
                      <p className="text-lg text-gray-400 mb-8 leading-relaxed">{step.description}</p>
                      <ul className="space-y-4">
                        {step.details.map((detail, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-3 text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                          >
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center flex-shrink-0`}>
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={`${isEven ? '' : 'lg:col-start-1'} lg:row-start-1`}>
                      <motion.div 
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Glow Effect */}
                        <motion.div 
                          className="absolute inset-0 rounded-3xl blur-2xl"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{ background: `radial-gradient(circle at center, ${step.glow}, transparent 70%)` }}
                        />
                        
                        <div className={`relative glass-premium rounded-3xl p-16 text-center border border-white/10 spotlight-effect overflow-hidden`}>
                          {/* Decorative gradient */}
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.gradient} opacity-20 rounded-full blur-2xl`} />
                          
                          <motion.div 
                            className="text-8xl mb-6"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            {step.emoji}
                          </motion.div>
                          <div className="text-xl text-gray-300">
                            Step {step.number}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl mb-4">
                <span className="gradient-text-animated">Why RupeeReady is Different</span>
              </h2>
              <p className="text-xl text-gray-400">Built specifically for India's gig economy</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass-premium rounded-3xl p-10 border border-white/10 spotlight-effect group"
                  >
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-2xl text-white mb-3 group-hover:text-teal-300 transition-colors">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
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
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-purple-500/20 to-orange-500/30 animate-gradient rounded-3xl blur-sm" />
              
              <div className="relative glass-premium rounded-3xl p-12 md:p-16 border border-white/20 text-center spotlight-effect">
                {/* Decorative orbs */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl mb-6 gradient-text-animated relative z-10">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                  Join thousands of Indian gig workers who've found financial peace
                </p>
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black px-10 py-7 text-lg shadow-2xl shadow-teal-500/40 magnetic-btn relative z-10 rounded-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
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