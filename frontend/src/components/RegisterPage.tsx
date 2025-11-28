import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GalacticBackground } from './GalacticBackground';
import { FinTrio } from './FinTrio';

interface RegisterPageProps {
  onRegister: () => void;
  onLogin: () => void;
}

export function RegisterPage({ onRegister, onLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onRegister();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl mb-2 bg-gradient-to-r from-cyan-400 via-magenta-400 to-amber-400 bg-clip-text text-transparent">
              Join the Guardian
            </h1>
            <p className="text-cyan-300/80 text-sm">Start your journey to financial peace</p>
          </motion.div>

          {/* Register Form - Glassmorphic */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cyan-100">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyan-100">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyan-100">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-cyan-100">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded border-white/10 bg-white/5 text-cyan-400 focus:ring-cyan-400" required />
                <span className="text-cyan-300/80">
                  I agree to the{' '}
                  <button type="button" className="text-magenta-400 hover:text-magenta-300 transition-colors">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-magenta-400 hover:text-magenta-300 transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 text-white border-0"
                size="lg"
              >
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-cyan-300/80 text-sm">
                Already have an account?{' '}
                <button
                  onClick={onLogin}
                  className="text-magenta-400 hover:text-magenta-300 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {['Smart tax calculations', 'AI-powered insights', 'Secure bank connections'].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 text-sm text-cyan-300/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-magenta-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Fin-Trio welcoming */}
      <FinTrio mood="happy" message="Welcome! We're excited to help you succeed!" />
    </div>
  );
}
