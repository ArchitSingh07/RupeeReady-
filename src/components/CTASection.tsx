import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900" />
      
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,128,128,0.3) 1px, transparent 1px),
            linear-gradient(rgba(0,128,128,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 15) % 100}%`,
            top: `${(i * 20) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div className={`w-16 h-16 ${
            i % 2 === 0 
              ? 'border-2 border-teal-400/30 rounded-lg' 
              : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full'
          }`} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 border border-teal-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-300">Join 50,000+ financially empowered Indians</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Ready to take control of{' '}
            <span className="block mt-2 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              your financial future?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Start your journey to financial freedom today. No credit card required. 
            Free for the first 30 days.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onGetStarted}
              className="group relative px-10 py-7 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-2xl shadow-2xl shadow-teal-500/40 text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started Free
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Bank-level encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
