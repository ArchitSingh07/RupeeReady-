import { motion, useInView } from 'motion/react';
import { Lock, Sparkles, TrendingUp, Target, LucideIcon } from 'lucide-react';
import { useRef } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Connect Securely',
      description: 'Link your bank accounts safely with Setu API integration. Your data is encrypted and protected.',
      icon: Lock,
    },
    {
      number: '02',
      title: 'AI Learns Your Patterns',
      description: 'RupeeReady analyzes your income, expenses, and spending habits to provide personalized insights.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'See Your True Balance',
      description: 'Get instant clarity on your "Safe to Spend" amount after taxes, bills, and savings.',
      icon: TrendingUp,
    },
    {
      number: '04',
      title: 'Achieve Your Goals',
      description: 'Set financial goals and let the RupeeSquad guide you to success with smart recommendations.',
      icon: Target,
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#212121] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            how it{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to financial clarity and confidence
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Step number - large background */}
      <motion.div
        className="absolute -top-4 -left-4 text-[120px] font-bold text-teal-600/5 select-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {step.number}
      </motion.div>

      <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
        {/* Icon */}
        <motion.div
          className="relative mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center">
            <step.icon className="w-8 h-8 text-white" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-30 -z-10" />
        </motion.div>

        {/* Content */}
        <div className="relative">
          <div className="text-sm font-bold text-teal-600 mb-2 tracking-wide">
            STEP {step.number}
          </div>
          <h3 className="text-2xl font-bold text-[#212121] mb-4">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress indicator */}
        {index < 3 && (
          <motion.div
            className="hidden lg:block absolute top-24 -right-4 w-8 h-8"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
