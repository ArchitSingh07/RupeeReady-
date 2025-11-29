import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Target, TrendingUp, ShieldCheck, Building2, Users, Sparkles, CheckCircle2, Loader2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RupeeReadyLogo } from './RupeeReadyLogo';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { toast } from 'sonner';

// Mock bank data for demo
const MOCK_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', logo: '🏦', accountEnding: '4521', balance: 45230 },
  { id: 'icici', name: 'ICICI Bank', logo: '🏛️', accountEnding: '8934', balance: 12500 },
  { id: 'sbi', name: 'State Bank of India', logo: '🇮🇳', accountEnding: '2156', balance: 8750 },
  { id: 'axis', name: 'Axis Bank', logo: '💳', accountEnding: '7623', balance: 23100 },
  { id: 'kotak', name: 'Kotak Mahindra', logo: '🔴', accountEnding: '9087', balance: 67800 },
  { id: 'paytm', name: 'Paytm Payments Bank', logo: '📱', accountEnding: '3344', balance: 5200 },
];

interface OnboardingFlowIndiaProps {
  onComplete: () => void;
}

export function OnboardingFlowIndia({ onComplete }: OnboardingFlowIndiaProps) {
  const { updateProfile } = useAuth();
  const { addNewGoal } = useFinancialData();
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [firstGoal, setFirstGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Bank connection states
  const [showBankSelector, setShowBankSelector] = useState(false);
  const [connectingBank, setConnectingBank] = useState<string | null>(null);
  const [connectedBanks, setConnectedBanks] = useState<typeof MOCK_BANKS>([]);

  // Handle simulated bank connection
  const handleConnectBank = async (bank: typeof MOCK_BANKS[0]) => {
    setConnectingBank(bank.id);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    setConnectedBanks(prev => [...prev, bank]);
    setConnectingBank(null);
    toast.success(`${bank.name} connected successfully! 🎉`);
  };

  const handleDisconnectBank = (bankId: string) => {
    setConnectedBanks(prev => prev.filter(b => b.id !== bankId));
  };

  const totalBalance = connectedBanks.reduce((sum, bank) => sum + bank.balance, 0);

  const steps = [
    {
      character: 'chanakya' as const,
      title: 'Meet Chanakya, Your Analyst',
      description: 'I analyze your income patterns and spending to give you real-time insights tailored for Indian gig workers.',
      color: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.4)',
      icon: TrendingUp,
      emoji: '🤓',
    },
    {
      character: 'kavach' as const,
      title: 'Meet Kavach, Your Guardian',
      description: 'I protect your financial health by managing your Tax Vault and alerting you about mindful spending opportunities.',
      color: 'from-teal-500 to-cyan-500',
      glow: 'rgba(20, 184, 166, 0.4)',
      icon: ShieldCheck,
      emoji: '🛡️',
    },
    {
      character: 'lakshmi' as const,
      title: 'Meet Lakshmi, Your Motivator',
      description: 'I celebrate your wins and keep you motivated to reach your financial goals with positive reinforcement!',
      color: 'from-orange-500 to-amber-500',
      glow: 'rgba(255, 107, 53, 0.4)',
      icon: Target,
      emoji: '⭐',
    },
    {
      character: null,
      title: 'Tell Us About Yourself',
      description: 'Help us personalize RupeeReady for your unique needs',
      color: 'from-purple-500 to-violet-500',
      glow: 'rgba(139, 92, 246, 0.4)',
      icon: Users,
      emoji: '👤',
    },
    {
      character: null,
      title: 'Connect Your Bank',
      description: 'Securely link your accounts with Setu API integration',
      color: 'from-teal-500 to-cyan-500',
      glow: 'rgba(20, 184, 166, 0.4)',
      icon: Building2,
      emoji: '🏦',
    },
    {
      character: null,
      title: 'Set Your First Goal',
      description: 'What would you like to save for? We\'ll help you get there!',
      color: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.4)',
      icon: Target,
      emoji: '🎯',
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const userTypes = [
    { value: 'gig-driver', label: 'Gig Driver (Uber/Ola)', icon: '🚗' },
    { value: 'freelancer', label: 'Freelancer', icon: '💼' },
    { value: 'content-creator', label: 'Content Creator', icon: '✨' },
    { value: 'delivery', label: 'Delivery Partner', icon: '🛵' },
    { value: 'consultant', label: 'Consultant', icon: '👔' },
    { value: 'other', label: 'Other Variable Income', icon: '💰' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmitGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstGoal || !goalAmount) return;
    
    setIsSubmitting(true);
    
    // Prepare profile updates including onboarding completion
    const profileUpdates: Record<string, any> = {
      onboardingCompleted: true,
      userType: userType || 'other',
    };
    
    if (monthlyIncome) {
      profileUpdates.monthlyIncome = parseFloat(monthlyIncome);
    }
    
    // Prepare goal data
    const goalColors = ['#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444', '#3B82F6'];
    const randomColor = goalColors[Math.floor(Math.random() * goalColors.length)];
    const goalData = {
      name: firstGoal,
      targetAmount: parseFloat(goalAmount),
      currentAmount: 0,
      color: randomColor,
    };
    
    // Fire and forget - start the Firestore operations but don't wait for them
    // This ensures the UI responds immediately
    Promise.all([
      updateProfile(profileUpdates, true),
      addNewGoal(goalData, true),
    ]).then(([profileResult, goalResult]) => {
      if (!profileResult.success) {
        console.error('Failed to save profile:', profileResult.error);
      }
      if (!goalResult.success) {
        console.warn('Failed to create goal:', goalResult.error);
      }
    }).catch(error => {
      console.error('Onboarding save error:', error);
    });
    
    // Immediately navigate to dashboard - don't wait for Firestore
    toast.success('Welcome to RupeeReady! 🎉');
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <RupeeReadyLogo size="md" animated={true} />
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-white/10'}`}
                  initial={{ width: 32 }}
                  animate={{ width: i === step ? 64 : 32 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              Step {step + 1} of {steps.length}
            </p>
          </motion.div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-premium rounded-[2rem] p-10 md:p-12 spotlight-effect relative overflow-hidden"
            >
              {/* Top accent line */}
              <motion.div 
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r ${currentStep.color}`}
                layoutId="accent"
              />

              {/* Icon */}
              <motion.div
                className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-2xl relative`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Icon className="w-12 h-12 text-white" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-50 blur-xl"
                  style={{ background: `radial-gradient(circle, ${currentStep.glow}, transparent 70%)` }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <h2 className={`text-3xl md:text-4xl mb-4 gradient-text-animated`}>
                  {currentStep.title}
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {currentStep.description}
                </p>
              </motion.div>

              {/* Step-specific content */}
              {step === 3 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-3">
                    <Label className="text-gray-300 text-base">What best describes you?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {userTypes.map((type, index) => (
                        <motion.button
                          key={type.value}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          onClick={() => setUserType(type.value)}
                          className={`p-4 rounded-xl border transition-all text-left group ${
                            userType === type.value
                              ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/20'
                              : 'border-white/10 bg-white/5 hover:border-teal-500/50 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <p className={`text-sm ${userType === type.value ? 'text-teal-300' : 'text-gray-400 group-hover:text-gray-300'}`}>{type.label}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="income" className="text-gray-300 text-base">Average Monthly Income (₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="e.g., 35000"
                      className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 py-6 rounded-xl"
                    />
                    <p className="text-xs text-gray-500">This helps us calculate your Tax Vault accurately</p>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Connected Banks Display */}
                  {connectedBanks.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm text-gray-400">Connected Accounts</h3>
                        <span className="text-xs text-teal-400">
                          Total: ₹{totalBalance.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {connectedBanks.map((bank) => (
                        <motion.div
                          key={bank.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="glass-premium rounded-xl p-4 border border-teal-500/30 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{bank.logo}</span>
                            <div>
                              <p className="text-white text-sm">{bank.name}</p>
                              <p className="text-gray-500 text-xs">••••{bank.accountEnding}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-teal-400 text-sm font-medium">₹{bank.balance.toLocaleString('en-IN')}</p>
                              <div className="flex items-center gap-1 text-green-400 text-xs">
                                <CheckCircle2 className="w-3 h-3" />
                                Connected
                              </div>
                            </div>
                            <button
                              onClick={() => handleDisconnectBank(bank.id)}
                              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-500 hover:text-red-400" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Bank Selector Modal */}
                  <AnimatePresence>
                    {showBankSelector && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowBankSelector(false)}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl text-white">Select Your Bank</h3>
                            <button
                              onClick={() => setShowBankSelector(false)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-gray-400" />
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            {MOCK_BANKS.filter(bank => !connectedBanks.find(b => b.id === bank.id)).map((bank) => (
                              <motion.button
                                key={bank.id}
                                onClick={() => handleConnectBank(bank)}
                                disabled={connectingBank !== null}
                                className="w-full glass-premium rounded-xl p-4 border border-white/10 hover:border-teal-500/50 transition-all flex items-center justify-between group disabled:opacity-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{bank.logo}</span>
                                  <div className="text-left">
                                    <p className="text-white group-hover:text-teal-300 transition-colors">{bank.name}</p>
                                    <p className="text-gray-500 text-xs">Account ••••{bank.accountEnding}</p>
                                  </div>
                                </div>
                                {connectingBank === bank.id ? (
                                  <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                                ) : (
                                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" />
                                )}
                              </motion.button>
                            ))}
                            
                            {MOCK_BANKS.filter(bank => !connectedBanks.find(b => b.id === bank.id)).length === 0 && (
                              <p className="text-center text-gray-500 py-4">All available banks connected!</p>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-4 text-center">
                            🔒 Demo mode: No real bank data is accessed
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Connect Card */}
                  <div className="glass-premium rounded-2xl p-6 border border-teal-500/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg mb-2 text-white">Secure Setu API Integration</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          Your banking data is encrypted and never stored. We use Setu API, India's leading financial data platform.
                        </p>
                        <Button 
                          onClick={() => setShowBankSelector(true)}
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black shadow-lg shadow-teal-500/30 magnetic-btn"
                        >
                          {connectedBanks.length > 0 ? (
                            <>
                              <Building2 className="w-4 h-4 mr-2" />
                              Add Another Bank
                            </>
                          ) : (
                            'Connect Your Bank Securely'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    {['256-bit encryption', 'RBI compliant', 'Read-only access', 'No passwords stored'].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skip hint if no banks connected */}
                  {connectedBanks.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-xs text-gray-500 text-center"
                    >
                      You can skip this step and connect your bank later from Settings
                    </motion.p>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.form
                  onSubmit={handleSubmitGoal}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-3">
                    <Label htmlFor="goal" className="text-gray-300 text-base">What are you saving for?</Label>
                    <Input
                      id="goal"
                      type="text"
                      value={firstGoal}
                      onChange={(e) => setFirstGoal(e.target.value)}
                      placeholder="e.g., Emergency Fund, New Bike, House Down Payment"
                      className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 py-6 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-gray-300 text-base">Target amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      placeholder="e.g., 50000"
                      className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-teal-500 focus:ring-teal-500/20 py-6 rounded-xl"
                      required
                    />
                  </div>

                  <div className="glass-premium rounded-xl p-4 border border-amber-500/20">
                    <p className="text-sm text-amber-300">
                      💡 <strong>Tip:</strong> Start with an emergency fund equal to 3-6 months of expenses. 
                      Lakshmi will celebrate each milestone with you!
                    </p>
                  </div>
                </motion.form>
              )}

              {/* Character showcase for intro steps */}
              {step < 3 && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <motion.div 
                    className="text-7xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {currentStep.emoji}
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <motion.div
                className="flex items-center justify-between mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>

                {step === steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleSubmitGoal}
                    disabled={!firstGoal || !goalAmount || isSubmitting}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black shadow-lg shadow-orange-500/30 magnetic-btn disabled:opacity-50"
                  >
                    {isSubmitting ? 'Setting up...' : 'Complete Setup'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 3 && (!userType || !monthlyIncome)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black shadow-lg shadow-teal-500/30 magnetic-btn disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Skip option */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={async () => {
                await updateProfile({ onboardingCompleted: true });
                onComplete();
              }}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Skip tutorial
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
