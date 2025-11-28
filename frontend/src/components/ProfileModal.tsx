import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, MapPin, Briefcase, Calendar, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const userProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    occupation: 'Freelance Delivery Partner',
    joinDate: 'March 2024',
    avatar: 'R',
    stats: {
      goalsCompleted: 3,
      totalSaved: 180000,
      daysActive: 234,
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
              className="bg-white rounded-3xl border-2 border-gray-200 p-6 max-w-md w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-gray-900">Profile</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center mb-4">
                  <span className="text-4xl text-white">{userProfile.avatar}</span>
                </div>
                <h4 className="text-2xl text-gray-900 mb-1">{userProfile.name}</h4>
                <Badge className="bg-teal-100 text-teal-700 border-0 mb-4">Premium Member</Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200 p-4 text-center">
                  <p className="text-2xl text-teal-900 mb-1">{userProfile.stats.goalsCompleted}</p>
                  <p className="text-xs text-teal-700">Goals Completed</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 text-center">
                  <p className="text-2xl text-amber-900 mb-1">₹{(userProfile.stats.totalSaved / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-amber-700">Total Saved</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-4 text-center">
                  <p className="text-2xl text-purple-900 mb-1">{userProfile.stats.daysActive}</p>
                  <p className="text-xs text-purple-700">Days Active</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{userProfile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{userProfile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm text-gray-900">{userProfile.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Occupation</p>
                    <p className="text-sm text-gray-900">{userProfile.occupation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Member Since</p>
                    <p className="text-sm text-gray-900">{userProfile.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 border-0"
                  onClick={() => console.log('Edit Profile')}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
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
