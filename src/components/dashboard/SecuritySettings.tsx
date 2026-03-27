import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockIcon, EyeIcon, EyeOffIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function SecuritySettings() {
  const { user } = useAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (currentPassword === newPassword) {
      setMessage({ type: 'error', text: 'New password must be different from current password' });
      return;
    }

    setLoading(true);
    try {
      const usersResponse = await fetch('http://localhost:3001/users');
      const users = await usersResponse.json();
      const currentUser = users.find((u: any) => u.id === user?.id);

      if (!currentUser || currentUser.password !== currentPassword) {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:3001/users/${user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -10
      }}
      className="max-w-2xl">
      
      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-brand-border">
          <h2 className="text-xl font-bold text-brand-navy mb-1">
            Password & Security
          </h2>
          <p className="text-sm text-brand-slate">
            Manage your password and secure your account.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 flex items-center gap-3 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm">{message.text}</span>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handlePasswordChange}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-navy">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white"
                  placeholder="Enter current password" />
                
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-slate hover:text-brand-navy transition-colors">
                  
                  {showCurrent ?
                  <EyeOffIcon className="h-5 w-5" /> :

                  <EyeIcon className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-brand-border my-6" />

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-navy">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white"
                  placeholder="Enter new password" />
                
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-slate hover:text-brand-navy transition-colors">
                  
                  {showNew ?
                  <EyeOffIcon className="h-5 w-5" /> :

                  <EyeIcon className="h-5 w-5" />
                  }
                </button>
              </div>
              <p className="text-xs text-brand-slate mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-navy">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white"
                  placeholder="Confirm new password" />
                
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-brand-navy hover:bg-brand-navy/90 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md focus:ring-4 focus:ring-brand-navy/30 outline-none">
                
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>);

}