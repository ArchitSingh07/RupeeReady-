import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PhoneMockup() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,128,128,0.2), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Your financial companion,{' '}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                always ready
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Access your complete financial picture anytime, anywhere. 
              Smart insights, instant calculations, and proactive guidance—all in your pocket.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                'Real-time Safe-to-Spend calculations',
                'Smart transaction categorization',
                'Proactive bill reminders & alerts',
                'Tax vault with automated GST tracking',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* 3D floating effect */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Phone frame */}
              <div className="relative mx-auto w-[300px] h-[600px] bg-gray-950 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-950 rounded-b-2xl z-10" />
                
                {/* Screen content - gradient placeholder */}
                <div className="absolute inset-2 bg-gradient-to-br from-teal-900 via-gray-900 to-orange-900 rounded-[2.5rem] overflow-hidden">
                  {/* Mock UI elements */}
                  <div className="p-6">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-8 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-white/30 rounded" />
                        <div className="w-4 h-4 bg-white/30 rounded" />
                        <div className="w-4 h-4 bg-white/30 rounded" />
                      </div>
                    </div>

                    {/* Balance card */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-6 mb-6"
                    >
                      <div className="text-white/70 text-sm mb-2">Safe to Spend</div>
                      <div className="text-white text-3xl font-bold mb-4">₹42,350</div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: '70%' }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {['Bills', 'Tax Vault', 'Savings'].map((label, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
                        >
                          <div className="text-white/50 text-xs mb-1">{label}</div>
                          <div className="text-white text-sm font-bold">₹{(i + 1) * 5}K</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing effect around phone */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl -z-10" />
            </motion.div>

            {/* Floating elements around phone */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-lg backdrop-blur-sm"
                style={{
                  left: i % 2 === 0 ? '-10%' : '110%',
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
