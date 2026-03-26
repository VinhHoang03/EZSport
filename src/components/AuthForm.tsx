import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
interface AuthFormProps {
  mode: 'login' | 'register';
  onToggleMode: () => void;
}
const GoogleIcon = () =>
<svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
    fill="currentColor"
    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
  
    <path
    fill="#34A853"
    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
  
    <path
    fill="#FBBC05"
    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
  
    <path
    fill="#EA4335"
    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  
  </svg>;

const AppleIcon = () =>
<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.87.69 3.65 1.83-3.14 1.88-2.62 5.82.35 7.04-.75 1.84-1.68 3.12-2.67 4.06zM12.03 7.2c-.15-2.92 2.33-5.32 5.14-5.2.22 3.02-2.65 5.48-5.14 5.2z" />
  </svg>;

export function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}>
          
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-brand-slate">
              {mode === 'login' ?
              'Sign in to your CourtBook account' :
              'Start booking courts in minutes'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === 'register' &&
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                type="text"
                className="block w-full pl-11 pr-4 py-3.5 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-white"
                placeholder="Full name" />
              
              </div>
            }

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-brand-slate" />
              </div>
              <input
                type="email"
                className="block w-full pl-11 pr-4 py-3.5 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-white"
                placeholder="Email address" />
              
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-brand-slate" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full pl-11 pr-12 py-3.5 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-white"
                placeholder="Password" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-slate hover:text-brand-navy transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                
                {showPassword ?
                <EyeOffIcon className="h-5 w-5" /> :

                <EyeIcon className="h-5 w-5" />
                }
              </button>
            </div>

            {mode === 'register' &&
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="block w-full pl-11 pr-12 py-3.5 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-white"
                placeholder="Confirm password" />
              
                <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-slate hover:text-brand-navy transition-colors"
                aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
                }>
                
                  {showConfirmPassword ?
                <EyeOffIcon className="h-5 w-5" /> :

                <EyeIcon className="h-5 w-5" />
                }
                </button>
              </div>
            }

            {mode === 'login' &&
            <div className="flex items-center justify-between pt-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-brand-border text-brand-coral focus:ring-brand-coral/30 cursor-pointer" />
                
                  <span className="text-sm text-brand-slate group-hover:text-brand-navy transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                href="#"
                className="text-sm font-medium text-brand-coral hover:text-[#e0484d] transition-colors">
                
                  Forgot password?
                </a>
              </div>
            }

            <button
              type="submit"
              className="w-full bg-brand-coral hover:bg-[#e0484d] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-brand-coral/30 outline-none mt-2">
              
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-brand-border"></div>
            <span className="text-sm text-brand-slate font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-brand-border"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-brand-border rounded-xl hover:bg-gray-50 transition-colors text-brand-navy font-medium">
              <GoogleIcon />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-brand-border rounded-xl hover:bg-gray-50 transition-colors text-brand-navy font-medium">
              <AppleIcon />
              Apple
            </button>
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-brand-slate">
            {mode === 'login' ?
            "Don't have an account? " :
            'Already have an account? '}
            <button
              onClick={onToggleMode}
              className="font-semibold text-brand-coral hover:text-[#e0484d] transition-colors">
              
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>);

}