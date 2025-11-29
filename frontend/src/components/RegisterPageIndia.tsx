import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { RupeeReadyLogo } from './RupeeReadyLogo';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface RegisterPageIndiaProps {
  onRegister: () => void;
  onLogin: () => void;
}

export function RegisterPageIndia({ onRegister, onLogin }: RegisterPageIndiaProps) {
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      toast.error('Passwords do not match!');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    
    const result = await register(formData.email, formData.password, formData.name);
    
    if (result.success) {
      toast.success('Account created successfully!');
      // After registration, go directly to onboarding (user is already logged in)
      // The App.tsx useEffect will handle the navigation based on auth state
    } else {
      setError(result.error || 'Registration failed');
      toast.error(result.error || 'Registration failed');
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await loginWithGoogle();
    
    if (result.success) {
      toast.success('Account created with Google!');
      // After Google signup, user is logged in, App.tsx will handle navigation
    } else {
      setError(result.error || 'Google signup failed');
      toast.error(result.error || 'Google signup failed');
    }
    
    setIsLoading(false);
  };

  const benefits = [
    { text: 'Free for first 30 days', icon: '🎁' },
    { text: 'No credit card required', icon: '💳' },
    { text: 'AI-powered insights', icon: '🤖' },
    { text: 'Cancel anytime', icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-6xl z-10"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-premium rounded-3xl p-12 border border-white/10 relative overflow-hidden spotlight-effect">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-500/20 to-transparent rounded-full blur-3xl" />
              
              <motion.div 
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <h2 className="text-4xl md:text-5xl mb-4 relative z-10">
                <span className="gradient-text-animated">Join 50,000+ Gig Workers</span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed relative z-10">
                Take control of your finances with India's most advanced AI-powered financial platform designed specifically for freelancers and gig workers.
              </p>

              {/* Benefits List */}
              <div className="space-y-5 relative z-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                      <span className="text-lg">{benefit.icon}</span>
                    </div>
                    <span className="text-gray-300 text-lg">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
                {[
                  { value: '50K+', label: 'Users' },
                  { value: '₹2Cr+', label: 'Managed' },
                  { value: '4.9/5', label: 'Rating' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl gradient-text-animated mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <div>
            {/* Logo */}
            <motion.div 
              className="flex justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RupeeReadyLogo size="md" animated={true} />
            </motion.div>

            {/* Register Card */}
            <div className="glass-premium rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden spotlight-effect">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-2xl" />
              
              {/* Header */}
              <div className="mb-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-purple-500/10 border border-teal-500/20 mb-4"
                >
                  <Sparkles className="h-4 w-4 text-teal-400" />
                  <span className="text-sm text-gray-300">Get Started Free</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl mb-3">
                  <span className="gradient-text-animated">Create Account</span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Start your financial freedom journey today
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Name Input */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="name" className="text-sm text-gray-300">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="pl-12 py-6 bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl transition-all"
                    />
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label htmlFor="email" className="text-sm text-gray-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="pl-12 py-6 bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl transition-all"
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="password" className="text-sm text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="pl-12 pr-12 py-6 bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label htmlFor="confirmPassword" className="text-sm text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      className="pl-12 pr-12 py-6 bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Terms Checkbox */}
                <motion.div 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-[#141414] text-teal-500 focus:ring-teal-500/20 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{' '}
                    <button type="button" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                      Terms & Conditions
                    </button>
                    {' '}and{' '}
                    <button type="button" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                      Privacy Policy
                    </button>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black py-6 rounded-xl shadow-lg shadow-teal-500/30 magnetic-btn group disabled:opacity-50"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                      />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0d0d0d] text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58 }}
              >
                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full py-6 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </motion.div>

              {/* Login Link */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={onLogin}
                    className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                  >
                    Login here
                  </button>
                </p>
              </motion.div>
            </div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-2"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-white/5">
                <Shield className="w-4 h-4 text-teal-400" />
                <p className="text-sm text-gray-400">
                  Your data is protected with bank-grade encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
