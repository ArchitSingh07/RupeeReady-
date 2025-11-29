import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Shield, TrendingUp, Target, AlertCircle, Coffee, Zap, ArrowRight, Check } from 'lucide-react';
import { FinTrio } from './FinTrio';
import { GalacticBackground } from './GalacticBackground';
import { AICompanion } from './AICompanion';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Know Your True Balance',
      subtitle: 'The Safe-to-Spend Orb',
      description: 'Interactive 3D orb that shows your true available balance. Spin it to explore your financial health.',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Shield,
      title: 'Your Proactive Tax Guardian',
      subtitle: 'Never Worry About Tax Season',
      description: 'AI automatically calculates and sets aside the right amount for taxes based on your income patterns.',
      gradient: 'from-magenta-400 to-purple-500',
    },
    {
      icon: Target,
      title: 'Smart Savings & Goal Tracking',
      subtitle: 'Achieve Your Dreams',
      description: 'Set goals and watch Flow help you reach them with intelligent saving suggestions.',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: AlertCircle,
      title: 'Impulse Purchase Interceptor',
      subtitle: 'Think Before You Spend',
      description: 'Glim alerts you when patterns suggest an impulse purchase, with historical context to help you decide.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Coffee,
      title: 'Subscription & Burnout Auditor',
      subtitle: 'Protect Your Peace',
      description: 'Identify unused subscriptions and detect gig-work burnout before it affects your wellbeing.',
      gradient: 'from-rose-400 to-red-500',
    },
    {
      icon: Zap,
      title: 'Proactive AI Nudges',
      subtitle: 'Stay Ahead of Issues',
      description: 'Receive timely insights about spending patterns, income fluctuations, and financial opportunities.',
      gradient: 'from-indigo-400 to-violet-500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Freelance Designer',
      text: 'Finally, financial peace of mind! The Tax Vault feature alone has saved me from so much stress.',
      avatar: '👩‍💼',
    },
    {
      name: 'Marcus T.',
      role: 'Uber Driver',
      text: 'The Fin-Trio feels like having three personal financial advisors in my pocket. Love the impulse purchase alerts!',
      avatar: '🚗',
    },
    {
      name: 'Elena R.',
      role: 'Gig Worker',
      text: 'Safe-to-Spend changed everything. I actually know how much I can spend without worrying about bills.',
      avatar: '💪',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-indigo-950/50 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-400" />
              </motion.div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">AI Financial Guardian</h1>
                <p className="text-xs text-cyan-300/60">Galactic Financial Peace</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 border-0" size="sm">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <p className="text-sm text-blue-600 dark:text-blue-400">✨ AI-Powered Financial Coaching</p>
            </motion.div>

            <h1 className="text-5xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Your Income is Variable. Your Financial Peace Doesn't Have To Be.
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              The intelligent financial companion for gig workers, freelancers, and anyone with variable income. 
              Know your true balance, save for taxes automatically, and make smarter spending decisions.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Connect Your Finances
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <Card className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <AICompanion mood="celebrating" position="inline" />
                    <div>
                      <p className="text-sm text-muted-foreground">Your AI Guardian</p>
                      <p className="text-xs text-muted-foreground">Always watching, always helping</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">Safe to Spend</p>
                    <p className="text-3xl text-green-900 dark:text-green-100">$2,847.50</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Tax Vault</p>
                      <p className="text-lg text-amber-900 dark:text-amber-100">$850.00</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Goals Progress</p>
                      <p className="text-lg text-blue-900 dark:text-blue-100">68%</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Features That Empower You</h2>
            <p className="text-xl text-muted-foreground">Everything you need for financial peace of mind</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{feature.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in minutes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Connect Your Accounts', description: 'Securely link your bank accounts using bank-level encryption' },
              { step: 2, title: 'AI Analyzes Your Finances', description: 'Your AI Guardian learns your income patterns and spending habits' },
              { step: 3, title: 'Make Smarter Decisions', description: 'Get real-time insights, nudges, and always know your safe-to-spend amount' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Loved by Gig Workers & Freelancers</h2>
            <p className="text-xl text-muted-foreground">See what our users are saying</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10">
              <h2 className="text-4xl mb-4">Ready to Take Control of Your Finances?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of gig workers who've found financial peace
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Get Started - It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AICompanion mood="happy" position="inline" />
                <span>AI Financial Guardian</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted companion for variable income management
              </p>
            </div>
            <div>
              <h3 className="text-sm mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-muted-foreground">
            <p>© 2025 AI Financial Guardian. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Companion */}
      <AICompanion mood="happy" message="Hi! I'm your AI Guardian. Click 'Get Started' to begin your journey to financial peace!" />
    </div>
  );
}