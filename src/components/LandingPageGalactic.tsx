import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Shield, TrendingUp, Target, AlertCircle, Coffee, Zap, ArrowRight, Check, Sparkles } from 'lucide-react';
import { FinTrio } from './FinTrio';
import { GalacticBackground } from './GalacticBackground';

interface LandingPageGalacticProps {
  onGetStarted: () => void;
}

export function LandingPageGalactic({ onGetStarted }: LandingPageGalacticProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Interactive Safe-to-Spend Orb',
      description: 'Spin a 3D glassmorphic orb to explore your financial health in real-time.',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Shield,
      title: 'Proactive Tax Guardian',
      description: 'Glim automatically protects your taxes so you never worry about tax season.',
      gradient: 'from-magenta-400 to-purple-500',
    },
    {
      icon: Target,
      title: 'Goal Celebrations',
      description: 'Flow celebrates your wins with full-screen animations and encouragement.',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: AlertCircle,
      title: 'Impulse Interceptor',
      description: 'Glim gently alerts you to potential impulse purchases before they happen.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Coffee,
      title: 'Subscription Auditor',
      description: 'Identify unused subscriptions and gig-work burnout patterns.',
      gradient: 'from-rose-400 to-red-500',
    },
    {
      icon: Zap,
      title: 'Meet the Fin-Trio',
      description: 'Pip, Glim, and Flow - three AI companions who make finance fun.',
      gradient: 'from-indigo-400 to-violet-500',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-indigo-950/30 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 via-magenta-400 to-amber-400"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div>
                <h1 className="text-xl bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                  AI Financial Guardian
                </h1>
                <p className="text-xs text-cyan-300/60">Galactic Financial Peace</p>
              </div>
            </div>
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 border-0"
              size="sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-cyan-500/30 mb-8"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6, 182, 212, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.3)',
                '0 0 20px rgba(6, 182, 212, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-cyan-300">Powered by the Fin-Trio AI</span>
          </motion.div>

          <h1 className="text-6xl mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-amber-400 bg-clip-text text-transparent">
              Your Income is Variable.
            </span>
            <br />
            <span className="text-white">
              Your Financial Peace Doesn't Have To Be.
            </span>
          </h1>

          <p className="text-xl text-cyan-100/80 mb-12 max-w-2xl mx-auto">
            Meet Pip, Glim, and Flow - your AI financial companions who help gig workers and freelancers
            master variable income with interactive tools and delightful animations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 border-0 text-lg px-8"
            >
              Enter the Galaxy
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 text-lg px-8"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-cyan-300/60">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-magenta-400" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-magenta-400" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-magenta-400" />
              <span>No credit card</span>
            </div>
          </div>
        </motion.div>

        {/* Animated preview */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-500/20 p-12 shadow-2xl max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-cyan-300/80 mb-4">Interactive Safe-to-Spend Orb</p>
              <div className="flex justify-center">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/30 via-magenta-400/30 to-amber-400/30 backdrop-blur-lg border-2 border-white/20 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    boxShadow: [
                      '0 0 60px rgba(6, 182, 212, 0.4)',
                      '0 0 80px rgba(236, 72, 153, 0.4)',
                      '0 0 60px rgba(6, 182, 212, 0.4)',
                    ],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                    },
                  }}
                >
                  <div className="text-center">
                    <p className="text-5xl text-white mb-2">$2,847</p>
                    <p className="text-sm text-cyan-200">Safe to Spend</p>
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="text-center text-sm text-cyan-300/60">
              Drag to spin • Your true balance after taxes & bills
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-white mb-4">Galactic Features</h2>
            <p className="text-xl text-cyan-300/80">Everything you need in one beautiful experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-cyan-500/50 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-cyan-100/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-magenta-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1), transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.1), transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1), transparent 50%)',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
            />

            <div className="relative z-10">
              <h2 className="text-4xl text-white mb-4">
                Ready to Meet the Fin-Trio?
              </h2>
              <p className="text-xl text-cyan-100/80 mb-8 max-w-2xl mx-auto">
                Join thousands of gig workers who've found financial peace with Pip, Glim, and Flow
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-magenta-600 hover:bg-cyan-50 border-0 text-lg px-8"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fin-Trio Floating */}
      <FinTrio mood="happy" message="Hi! We're Pip, Glim, and Flow. Ready to help you achieve financial peace! 🌟" />
    </div>
  );
}
