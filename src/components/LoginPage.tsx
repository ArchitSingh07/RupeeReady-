import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GalacticBackground } from './GalacticBackground';
import { FinTrio } from './FinTrio';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
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
              AI Financial Guardian
            </h1>
            <p className="text-cyan-300/80 text-sm">Welcome back to financial peace</p>
          </motion.div>

          {/* Login Form - Glassmorphic */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-cyan-300/80 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/10 bg-white/5 text-cyan-400 focus:ring-cyan-400" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-magenta-400 hover:text-magenta-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 text-white border-0"
                size="lg"
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-cyan-300/80 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={onRegister}
                  className="text-magenta-400 hover:text-magenta-300 transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </motion.div>

          {/* Security badge */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-cyan-300/60 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Bank-level 256-bit encryption
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Fin-Trio observing */}
      <FinTrio mood="curious" message="Ready to help you manage your finances!" />
    </div>
  );
}
