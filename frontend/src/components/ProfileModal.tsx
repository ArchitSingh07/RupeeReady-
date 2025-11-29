import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { userProfile: authProfile, user } = useAuth();
  
  const userProfile = {
    name: authProfile?.displayName || user?.email?.split('@')[0] || 'User',
    email: authProfile?.email || user?.email || 'Not set',
    phone: '+91 98765 43210', // Would come from profile in real app
    location: 'India',
    occupation: 'Gig Worker',
    joinDate: authProfile?.createdAt ? new Date(authProfile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recent',
    avatar: (authProfile?.displayName || user?.email || 'U')[0].toUpperCase(),
    stats: {
      goalsCompleted: 0,
      totalSaved: authProfile?.tax_vault || 0,
      daysActive: 1,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              className="bg-[#141414] rounded-3xl border border-white/10 p-6 max-w-md w-full shadow-2xl glass-effect"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Profile</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mb-4">
                  <span className="text-4xl text-white">{userProfile.avatar}</span>
                </div>
                <h4 className="text-2xl text-white mb-1">{userProfile.name}</h4>
                <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 mb-4">Premium Member</Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-teal-500/10 rounded-xl border border-teal-500/30 p-4 text-center">
                  <p className="text-2xl text-teal-400 mb-1">{userProfile.stats.goalsCompleted}</p>
                  <p className="text-xs text-gray-400">Goals Completed</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-4 text-center">
                  <p className="text-2xl text-amber-400 mb-1">₹{(userProfile.stats.totalSaved / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-400">Total Saved</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl border border-purple-500/30 p-4 text-center">
                  <p className="text-2xl text-purple-400 mb-1">{userProfile.stats.daysActive}</p>
                  <p className="text-xs text-gray-400">Days Active</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-white">{userProfile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-white">{userProfile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-white">{userProfile.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Occupation</p>
                    <p className="text-sm text-white">{userProfile.occupation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm text-white">{userProfile.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black border-0"
                  onClick={() => console.log('Edit Profile')}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" onClick={onClose}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
