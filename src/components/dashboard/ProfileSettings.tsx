import React from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { BookingStats } from './BookingStats';
export function ProfileSettings() {
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
      className="max-w-4xl">
      
      <BookingStats />

      <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-brand-border">
          <h2 className="text-xl font-bold text-brand-navy mb-1">
            Personal Information
          </h2>
          <p className="text-sm text-brand-slate">
            Update your photo and personal details here.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-brand-offWhite">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover" />
                
              </div>
              <div className="absolute inset-0 bg-brand-navy/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <div className="flex gap-3 mb-2">
                <button className="px-4 py-2 bg-brand-navy text-white text-sm font-medium rounded-lg hover:bg-brand-navy/90 transition-colors">
                  Upload new
                </button>
                <button className="px-4 py-2 bg-brand-offWhite text-brand-navy border border-brand-border text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Remove
                </button>
              </div>
              <p className="text-xs text-brand-slate">
                SVG, PNG, JPG or GIF (max. 800x800px)
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-navy">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type="text"
                  defaultValue="Sarah Jenkins"
                  className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white" />
                
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-navy">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type="email"
                  defaultValue="sarah.j@example.com"
                  className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white" />
                
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-brand-navy">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-brand-slate" />
                </div>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white" />
                
              </div>
            </div>

            <div className="sm:col-span-2 pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-brand-coral hover:bg-[#e0484d] text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md focus:ring-4 focus:ring-brand-coral/30 outline-none">
                
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>);

}