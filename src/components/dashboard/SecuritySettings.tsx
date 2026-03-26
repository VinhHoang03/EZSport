import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
export function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                  className="block w-full pl-10 pr-12 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white"
                  placeholder="Confirm new password" />
                
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md focus:ring-4 focus:ring-brand-navy/30 outline-none">
                
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>);

}