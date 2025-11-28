import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Target, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { GalacticBackground } from './GalacticBackground';
import { FinTrio } from './FinTrio';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [firstGoal, setFirstGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const steps = [
    {
      character: 'pip' as const,
      title: 'Meet Pip, Your Analyst',
      description: 'I analyze your income and spending patterns to give you real-time insights.',
      color: 'from-cyan-400 to-blue-500',
      icon: TrendingUp,
    },
    {
      character: 'glim' as const,
      title: 'Meet Glim, Your Guardian',
      description: 'I protect your financial health by warning you about impulse purchases and managing your Tax Vault.',
      color: 'from-magenta-400 to-purple-500',
      icon: ShieldCheck,
    },
    {
      character: 'flow' as const,
      title: 'Meet Flow, Your Motivator',
      description: 'I celebrate your wins and help you stay motivated to reach your financial goals!',
      color: 'from-amber-400 to-orange-500',
      icon: Target,
    },
    {
      character: null,
      title: 'Set Your First Goal',
      description: 'What would you like to save for? We\'ll help you get there!',
      color: 'from-cyan-400 via-magenta-400 to-amber-400',
      icon: Target,
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

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

  const handleSubmitGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstGoal && goalAmount) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GalacticBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
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
                  className={`h-1.5 rounded-full ${i <= step ? 'bg-gradient-to-r from-cyan-400 to-magenta-400' : 'bg-white/10'}`}
                  initial={{ width: 40 }}
                  animate={{ width: i === step ? 80 : 40 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <p className="text-center text-sm text-cyan-300/60">
              Step {step + 1} of {steps.length}
            </p>
          </motion.div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl"
            >
              {/* Icon */}
              <motion.div
                className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-r ${currentStep.color} flex items-center justify-center`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Title and description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className={`text-3xl mb-4 bg-gradient-to-r ${currentStep.color} bg-clip-text text-transparent`}>
                  {currentStep.title}
                </h2>
                <p className="text-lg text-cyan-100/80">
                  {currentStep.description}
                </p>
              </motion.div>

              {/* Goal form on last step */}
              {step === steps.length - 1 && (
                <motion.form
                  onSubmit={handleSubmitGoal}
                  className="space-y-6 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-2">
                    <label className="text-cyan-100 text-sm">What are you saving for?</label>
                    <Input
                      type="text"
                      value={firstGoal}
                      onChange={(e) => setFirstGoal(e.target.value)}
                      placeholder="e.g., Emergency Fund, Vacation, New Laptop"
                      className="bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-cyan-100 text-sm">Target amount ($)</label>
                    <Input
                      type="number"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      placeholder="1000"
                      className="bg-white/5 border-white/10 text-white placeholder:text-cyan-300/40 focus:border-cyan-400 focus:ring-cyan-400"
                      required
                    />
                  </div>
                </motion.form>
              )}

              {/* Character showcase */}
              {step < steps.length - 1 && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-6xl">
                    {step === 0 ? '🤓' : step === 1 ? '🛡️' : '⭐'}
                  </div>
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
                  className="text-cyan-300 hover:text-cyan-200 disabled:opacity-30"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>

                {step === steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleSubmitGoal}
                    disabled={!firstGoal || !goalAmount}
                    className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 text-white border-0"
                  >
                    Complete Setup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-magenta-500 to-purple-500 hover:from-magenta-600 hover:to-purple-600 text-white border-0"
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
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={onComplete}
              className="text-sm text-cyan-300/60 hover:text-cyan-300 transition-colors"
            >
              Skip tutorial
            </button>
          </motion.div>
        </div>
      </div>

      {/* Fin-Trio with active character highlight */}
      <FinTrio
        mood="happy"
        activeCharacter={currentStep.character}
        message={
          step === 0 ? "Hi! I'm Pip! I love numbers!" :
          step === 1 ? "I'm Glim. I've got your back!" :
          step === 2 ? "I'm Flow! Let's celebrate success together!" :
          "We're all here to help you succeed!"
        }
      />
    </div>
  );
}
