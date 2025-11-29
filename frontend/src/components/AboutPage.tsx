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
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Your financial data is sacred. We use bank-level encryption and never sell your information.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Financial Empowerment',
      description: 'We believe everyone deserves financial peace, regardless of their income structure.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with feedback from 10,000+ Indian gig workers who told us what they truly need.',
      gradient: 'from-purple-500 to-violet-500',
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Button
                variant="ghost"
                onClick={onBack}
                className="mb-8 text-gray-400 hover:text-teal-400 hover:bg-white/5 rounded-xl px-5 py-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6"
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span className="text-sm text-teal-300 font-medium">Our Mission</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Financial Peace for</span>
                <br />
                <span className="text-white">India's Gig Economy</span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                We're on a mission to give every freelancer, gig worker, and variable-income earner in India the financial clarity they deserve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#141414]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Our Story</span>
              </h2>
              <div className="space-y-5 text-gray-300 leading-relaxed">
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
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Our Values</span>
              </h2>
              <p className="text-gray-400">What drives everything we do</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-[#141414]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full hover:border-white/20 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Meet the Team</span>
              </h2>
              <p className="text-gray-400">The people behind RupeeReady</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#141414]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="text-5xl mb-5">{member.avatar}</div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-teal-400 transition-colors">{member.name}</h3>
                  <p className="text-sm text-teal-400 mb-4 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#141414] rounded-2xl p-10 md:p-12 border border-white/10"
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
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
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-1">{stat.value}</div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gradient-to-br from-teal-500/10 via-[#141414] to-purple-500/10 rounded-2xl p-10 md:p-14 border border-white/10 text-center"
            >
              <Rocket className="h-12 w-12 mx-auto text-teal-400 mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Join Our Mission
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Let's build financial peace for India's gig economy, together.
              </p>
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black font-semibold px-8 py-6 text-base shadow-lg shadow-teal-500/25 rounded-xl"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get RupeeReady
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <RupeeReadyLogo size="sm" />
            <p className="text-gray-600 text-sm mt-4">© 2024 RupeeReady AI. Made with ❤️ for India's gig workers.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}