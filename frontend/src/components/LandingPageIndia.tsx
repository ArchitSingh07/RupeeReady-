import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Shield, TrendingUp, Target, AlertCircle, Coffee, BarChart3, ArrowRight, Sparkles, Zap, CheckCircle, Star, ChevronDown } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';

interface LandingPageIndiaProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onFeatures: () => void;
  onPricing: () => void;
  onAbout: () => void;
  onHowItWorks: () => void;
}

export function LandingPageIndia({ onGetStarted, onLogin, onFeatures, onPricing, onAbout, onHowItWorks }: LandingPageIndiaProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time "Safe to Spend"',
      description: 'Know your true available balance after taxes and bills. No more guesswork with variable income.',
      gradient: 'from-teal-500 via-cyan-500 to-teal-600',
      glow: 'rgba(20, 184, 166, 0.4)',
    },
    {
      icon: Shield,
      title: 'Smart Tax Vault',
      description: 'Automatically set aside the right amount for taxes. Integrated with Indian tax rates and GST.',
      gradient: 'from-orange-500 via-amber-500 to-orange-600',
      glow: 'rgba(255, 107, 53, 0.4)',
    },
    {
      icon: Target,
      title: 'Goal-Based Savings',
      description: 'Set and achieve financial goals with AI-powered insights and motivational nudges.',
      gradient: 'from-purple-500 via-violet-500 to-purple-600',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    {
      icon: AlertCircle,
      title: 'Mindful Spending Nudges',
      description: 'Get gentle alerts when spending patterns suggest an impulse purchase. Make informed decisions.',
      gradient: 'from-amber-500 via-yellow-500 to-amber-600',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    {
      icon: Coffee,
      title: 'Subscription & Expense Auditor',
      description: 'Identify unused subscriptions and track business expenses for tax deductions.',
      gradient: 'from-cyan-500 via-blue-500 to-cyan-600',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    {
      icon: BarChart3,
      title: 'Income Pattern Analysis',
      description: 'Understand your variable income trends and plan ahead with confidence.',
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer, Mumbai',
      text: 'RupeeReady transformed how I manage my freelance income. The Tax Vault saves me from last-minute panic during filing!',
      avatar: '👩‍💼',
      rating: 5,
    },
    {
      name: 'Arjun Patel',
      role: 'Uber Driver, Bangalore',
      text: 'Finally, I can see exactly how much I can spend without worrying about bills. The RupeeSquad feels like having a CA in my pocket!',
      avatar: '🚗',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Content Creator, Hyderabad',
      text: 'The mindful spending nudges helped me save ₹50,000 in just 3 months. I\'m on track for my first international trip!',
      avatar: '✨',
      rating: 5,
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '₹2Cr+', label: 'Money Managed' },
    { value: '4.9/5', label: 'User Rating' },
    { value: '95%', label: 'Tax Compliance' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />
      
      {/* Subtle gradient overlay for depth - no animation */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-950/20 via-black to-purple-950/10 pointer-events-none" />

      {/* Floating Navigation - Premium Glass Style */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-premium rounded-2xl px-6 py-4 spotlight-effect">
            <div className="flex items-center justify-between">
              <RupeeReadyLogo size="md" animated={true} />
              <div className="hidden md:flex items-center gap-8">
                <button onClick={onFeatures} className="text-gray-300 hover:text-teal-400 transition-all duration-300 relative group">
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </button>
                <button onClick={onHowItWorks} className="text-gray-300 hover:text-teal-400 transition-all duration-300 relative group">
                  How It Works
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </button>
                <button onClick={onPricing} className="text-gray-300 hover:text-teal-400 transition-all duration-300 relative group">
                  Pricing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </button>
                <Button 
                  variant="ghost" 
                  onClick={onLogin}
                  className="text-gray-300 hover:text-white hover:bg-white/10 magnetic-btn"
                >
                  Login
                </Button>
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black shadow-lg shadow-teal-500/30 transition-all duration-300 magnetic-btn breathing-glow"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - CRED Inspired */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-teal-500/10 border border-teal-500/20 mb-8 spotlight-effect"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
              </motion.div>
              <span className="text-sm text-gray-300">AI-Powered Financial Companion for Gig Workers</span>
            </motion.div>

            {/* Main Heading - Premium Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight"
            >
              <span className="gradient-text-animated">
                Master Your
              </span>
              <br />
              <span className="text-white">
                Rupee Game
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              The first AI financial platform built exclusively for India's gig workers and freelancers. 
              <span className="text-gray-300"> Smart budgeting, tax management, and real-time insights</span>—all in one place.
            </motion.p>

            {/* CTA Buttons - Premium Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-400 hover:to-cyan-400 text-black px-10 py-7 text-lg shadow-2xl shadow-teal-500/40 magnetic-btn breathing-glow group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={onHowItWorks}
                className="border-white/20 hover:bg-white/5 hover:border-teal-500/50 text-white px-10 py-7 text-lg group magnetic-btn neon-border"
              >
                See How It Works
                <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform text-teal-400" />
              </Button>
            </motion.div>

            {/* Stats - Premium Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-premium rounded-2xl p-6 card-3d"
                >
                  <motion.div 
                    className="text-3xl md:text-4xl gradient-text-animated mb-2 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid - Premium CRED Style */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-purple-500/20 mb-6"
            >
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Powerful Features</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl mb-6">
              <span className="gradient-text-animated">Everything You Need</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for the hustle. Designed for success. Manage your finances like never before.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${feature.glow}, transparent 70%)` }}
                />
                
                <div className="relative glass-premium rounded-3xl p-8 h-full card-3d spotlight-effect overflow-hidden">
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-r from-teal-500/50 via-purple-500/50 to-orange-500/50 opacity-50" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon with enhanced animation */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    
                    {/* Learn more link */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center gap-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Style */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6"
            >
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-sm text-gray-300">Trusted by Thousands</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl mb-6">
              <span className="gradient-text-animated">Real Stories, Real Impact</span>
            </h2>
            <p className="text-xl text-gray-400">Hear from gig workers who transformed their finances</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass-premium rounded-3xl p-8 h-full card-3d relative overflow-hidden">
                  {/* Quote mark decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-white/5 font-serif">"</div>
                  
                  {/* Rating Stars with animation */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="text-white font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Premium CRED Style */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Animated Background Gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-purple-500/20 to-orange-500/30 rounded-[2.5rem] blur-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Content Card */}
            <div className="relative glass-premium rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden spotlight-effect">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                <span className="gradient-text-animated">Ready to Take Control?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join <span className="text-teal-400 font-semibold">50,000+</span> gig workers who trust RupeeReady AI to manage their finances smarter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 hover:from-teal-400 hover:to-cyan-400 text-black px-10 py-7 text-lg shadow-2xl shadow-teal-500/40 magnetic-btn breathing-glow group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={onPricing}
                  className="border-white/20 hover:bg-white/5 hover:border-teal-500/50 text-white px-10 py-7 text-lg magnetic-btn"
                >
                  View Pricing
                </Button>
              </div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>Cancel anytime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium Style */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <RupeeReadyLogo size="sm" />
              <span className="text-gray-500 text-sm">© 2024 RupeeReady AI. Made with ❤️ for India's gig workers.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <button onClick={onAbout} className="text-gray-400 hover:text-teal-400 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
