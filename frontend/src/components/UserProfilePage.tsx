import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Edit2, 
  Save, 
  X,
  Camera,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  ChevronRight,
  Target,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useAuth } from '../contexts/AuthContext';
import { useFinancialData } from '../contexts/FinancialDataContext';
import { toast } from 'sonner';

interface UserProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function UserProfilePage({ onBack, onLogout }: UserProfilePageProps) {
  const { userProfile: authProfile, user, updateProfile } = useAuth();
  const { goals, summary } = useFinancialData();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState(authProfile?.displayName || '');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('India');
  const [occupation, setOccupation] = useState(authProfile?.userType || 'Gig Worker');
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(authProfile?.notifications_enabled ?? true);
  const [darkMode, setDarkMode] = useState(authProfile?.dark_mode ?? true);

  const userInfo = {
    name: authProfile?.displayName || user?.email?.split('@')[0] || 'User',
    email: authProfile?.email || user?.email || 'Not set',
    avatar: (authProfile?.displayName || user?.email || 'U')[0].toUpperCase(),
    joinDate: authProfile?.createdAt 
      ? new Date(authProfile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) 
      : 'Recent',
    photoURL: authProfile?.photoURL || null,
  };

  // Calculate stats
  const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
  const totalSaved = authProfile?.tax_vault || 0;
  const daysActive = authProfile?.createdAt 
    ? Math.ceil((Date.now() - new Date(authProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 1;

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const result = await updateProfile({
        displayName: displayName || userInfo.name,
        notifications_enabled: notificationsEnabled,
        dark_mode: darkMode,
        userType: occupation,
      });
      
      if (result.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile: ' + result.error);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setDisplayName(authProfile?.displayName || '');
    setNotificationsEnabled(authProfile?.notifications_enabled ?? true);
    setDarkMode(authProfile?.dark_mode ?? true);
    setOccupation(authProfile?.userType || 'Gig Worker');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
                onClick={handleCancelEdit}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black"
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141414] rounded-3xl border border-white/10 p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {userInfo.photoURL ? (
                <img 
                  src={userInfo.photoURL} 
                  alt={userInfo.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-teal-500/30"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center border-4 border-teal-500/30">
                  <span className="text-5xl text-white font-bold">{userInfo.avatar}</span>
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-black hover:bg-teal-400 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <Label className="text-gray-400 text-sm">Display Name</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white text-xl"
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-white mb-2">{userInfo.name}</h1>
              )}
              <p className="text-gray-400 mb-3">{userInfo.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                  Premium Member
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Member since {userInfo.joinDate}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-[#141414] rounded-2xl border border-white/10 p-4 text-center">
            <Target className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{completedGoals}</p>
            <p className="text-xs text-gray-500">Goals Done</p>
          </div>
          <div className="bg-[#141414] rounded-2xl border border-white/10 p-4 text-center">
            <Wallet className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">₹{(totalSaved / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500">Tax Vault</p>
          </div>
          <div className="bg-[#141414] rounded-2xl border border-white/10 p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">₹{(summary.totalIncome / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500">Total Income</p>
          </div>
          <div className="bg-[#141414] rounded-2xl border border-white/10 p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{daysActive}</p>
            <p className="text-xs text-gray-500">Days Active</p>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141414] rounded-3xl border border-white/10 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-400" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-white">{userInfo.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone Number</p>
                {isEditing ? (
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-transparent border-0 p-0 text-white h-auto focus-visible:ring-0"
                  />
                ) : (
                  <p className="text-white">{phone || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Location</p>
                {isEditing ? (
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="bg-transparent border-0 p-0 text-white h-auto focus-visible:ring-0"
                  />
                ) : (
                  <p className="text-white">{location}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Occupation</p>
                {isEditing ? (
                  <Input
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="Your occupation"
                    className="bg-transparent border-0 p-0 text-white h-auto focus-visible:ring-0"
                  />
                ) : (
                  <p className="text-white">{occupation}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141414] rounded-3xl border border-white/10 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            Preferences
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive alerts and reminders</p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 text-gray-400">🌙</div>
                <div>
                  <p className="text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500">Use dark theme</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled={!isEditing}
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#141414] rounded-3xl border border-white/10 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-white">Linked Bank Accounts</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-white">Privacy & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <Target className="w-5 h-5 text-gray-400" />
                <span className="text-white">Goal Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
