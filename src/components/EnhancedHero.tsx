import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface EnhancedHeroProps {
  onGetStarted: () => void;
}

export function EnhancedHero({ onGetStarted }: EnhancedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-teal-950 to-gray-900">
      {/* Dark gradient background with animated mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,128,0.15),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,128,128,0.1) 1px, transparent 1px),
              linear-gradient(rgba(0,128,128,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating 3D-like geometric elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 15 + 10) % 100}%`,
              top: `${(i * 25 + 15) % 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <div 
              className={`${
                i % 3 === 0 
                  ? 'w-16 h-16 border-2 border-teal-400/30' 
                  : i % 3 === 1
                  ? 'w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20'
                  : 'w-10 h-10 border-2 border-orange-400/30 rounded-full'
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${i * 15}deg) rotateY(${i * 20}deg)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-orange-500/10 border border-teal-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-teal-300">AI-Powered Financial Freedom for India's Gig Workers</span>
        </motion.div>

        {/* Hero headline - large serif-style text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="block text-white" style={{ fontFamily: 'Georgia, serif' }}>
              crafted for the
            </span>
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
              financially free
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          RupeeReady AI is your intelligent financial companion, built for India's freelancers, 
          gig workers, and independent professionals. Smart tax planning, real-time spending insights, 
          and proactive financial guidance—all powered by AI.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onGetStarted}
            className="group relative px-8 py-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl shadow-2xl shadow-teal-500/30 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg">
              Start Your Journey
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
          
          <Button
            variant="outline"
            className="px-8 py-6 border-2 border-teal-400/50 text-teal-300 hover:bg-teal-500/10 rounded-xl text-lg"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Active Users' },
            { value: '₹2.5Cr+', label: 'Tax Savings' },
            { value: '4.9/5', label: 'User Rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="relative"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F8FA] to-transparent" />
    </div>
  );
}
