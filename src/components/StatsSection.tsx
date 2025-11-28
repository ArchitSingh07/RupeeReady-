import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatsSection() {
  const stats: Stat[] = [
    { value: '50,000', label: 'Active Users', suffix: '+' },
    { value: '2.5', label: 'Tax Savings', prefix: '₹', suffix: 'Cr+' },
    { value: '4.9', label: 'User Rating', suffix: '/5' },
    { value: '99.9', label: 'Uptime', suffix: '%' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-orange-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const targetValue = parseFloat(stat.value.replace(/,/g, ''));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  const formatNumber = (num: number): string => {
    if (stat.value.includes(',')) {
      return Math.floor(num).toLocaleString('en-IN');
    }
    return num.toFixed(1);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative text-center p-8 bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div className="relative">
          {/* Value */}
          <div className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {stat.prefix}
              {formatNumber(count)}
              {stat.suffix}
            </span>
          </div>

          {/* Label */}
          <div className="text-sm text-gray-600 tracking-wide uppercase">
            {stat.label}
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-b-3xl"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}
