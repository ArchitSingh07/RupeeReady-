import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Target, Users, Shield, Sparkles, Rocket } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';

interface AboutPageProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function AboutPage({ onBack, onGetStarted }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'We understand the stress of variable income. Every feature is designed with real gig workers in mind.',
      gradient: 'from-rose-500 to-pink-500',
      glow: 'rgba(244, 63, 94, 0.4)',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Your financial data is sacred. We use bank-level encryption and never sell your information.',
      gradient: 'from-teal-500 to-cyan-500',
      glow: 'rgba(20, 184, 166, 0.4)',
    },
    {
      icon: Target,
      title: 'Financial Empowerment',
      description: 'We believe everyone deserves financial peace, regardless of their income structure.',
      gradient: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with feedback from 10,000+ Indian gig workers who told us what they truly need.',
      gradient: 'from-purple-500 to-violet-500',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
  ];

  const team = [
    {
      name: 'Priya Mehta',
      role: 'Co-Founder & CEO',
      bio: 'Former gig worker who struggled with taxes. Built RupeeReady to solve her own problem.',
      avatar: '👩‍💼',
    },
    {
      name: 'Arjun Shah',
      role: 'Co-Founder & CTO',
      bio: 'Ex-fintech engineer passionate about financial inclusion for India\'s workforce.',
      avatar: '👨‍💻',
    },
    {
      name: 'Lakshmi Iyer',
      role: 'Head of Product',
      bio: 'UX designer who makes complex finance simple and delightful.',
      avatar: '👩‍🎨',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] noise-texture relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] aurora-bg rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[80%] h-[80%] bg-gradient-to-tl from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-gradient-to-r from-rose-500/15 to-pink-500/10 rounded-full blur-[80px]"
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -30, 30, -30],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

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
                <span className="text-sm text-gray-300">Our Mission</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6">
                <span className="gradient-text-animated">Financial Peace for</span>
                <br />
                <span className="text-white">India's Gig Economy</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to give every freelancer, gig worker, and variable-income earner in India the financial clarity they deserve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-premium rounded-3xl p-12 md:p-16 border border-white/10 spotlight-effect relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-500/20 to-transparent rounded-full blur-3xl" />
              
              <h2 className="text-4xl md:text-5xl mb-10 relative z-10">
                <span className="gradient-text-animated">Our Story</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed relative z-10">
                <p>
                  RupeeReady AI was born from a personal struggle. Our co-founder Priya, a freelance designer, nearly missed a tax deadline because she didn't know how much to set aside. She had ₹85,000 in her account but only ₹12,000 was actually "safe to spend" after accounting for taxes and bills.
                </p>
                <p>
                  That moment of panic sparked an idea: What if there was an AI companion that could tell you, in real-time, exactly how much you can spend without worry?
                </p>
                <p>
                  We talked to hundreds of gig workers, Uber drivers, delivery partners, and freelancers across India. The same pattern emerged: variable income creates constant anxiety about money. Traditional budgeting apps don't work when your income changes every week.
                </p>
                <p>
                  So we built RupeeReady AI - a financial companion that understands the unique challenges of India's gig economy. With Chanakya analyzing patterns, Kavach protecting your future, and Lakshmi celebrating your wins, we've created more than an app. We've created financial peace of mind.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl mb-4">
                <span className="gradient-text-animated">Our Values</span>
              </h2>
              <p className="text-xl text-gray-400">What drives everything we do</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ background: `radial-gradient(circle at center, ${value.glow}, transparent 70%)` }}
                    />
                    
                    <div className="relative glass-premium rounded-3xl p-10 border border-white/10 h-full spotlight-effect group-hover:border-white/20 transition-all">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl text-white mb-3 group-hover:text-teal-300 transition-colors">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl mb-4">
                <span className="gradient-text-animated">Meet the Team</span>
              </h2>
              <p className="text-xl text-gray-400">The people behind RupeeReady</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-premium rounded-3xl p-10 border border-white/10 text-center spotlight-effect group"
                >
                  <motion.div 
                    className="text-7xl mb-6"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {member.avatar}
                  </motion.div>
                  <h3 className="text-xl text-white mb-2 group-hover:text-teal-300 transition-colors">{member.name}</h3>
                  <p className="text-sm text-teal-400 mb-4 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-purple-500/20 to-orange-500/30 animate-gradient rounded-3xl blur-sm" />
              
              <div className="relative glass-premium rounded-3xl p-12 md:p-16 border border-white/20 spotlight-effect">
                <div className="grid md:grid-cols-3 gap-10 text-center">
                  {[
                    { value: '10K+', label: 'Active Users', icon: '👥' },
                    { value: '₹50Cr+', label: 'Money Managed', icon: '💰' },
                    { value: '4.9★', label: 'User Rating', icon: '⭐' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <motion.div 
                        className="text-4xl mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <div className="text-5xl gradient-text-animated mb-2">{stat.value}</div>
                      <p className="text-gray-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Rocket className="h-16 w-16 mx-auto text-teal-400" />
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl mb-6 gradient-text-animated relative z-10">
                  Join Our Mission
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
                  Let's build financial peace for India's gig economy, together.
                </p>
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black px-10 py-7 text-lg shadow-2xl shadow-teal-500/40 magnetic-btn relative z-10 rounded-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get RupeeReady
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <RupeeReadyLogo size="sm" />
            <p className="text-gray-500 text-sm mt-6">© 2024 RupeeReady AI. Made with ❤️ for India's gig workers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}