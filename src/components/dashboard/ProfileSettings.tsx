import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, UserIcon, MailIcon, PhoneIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { BookingStats } from './BookingStats';
import { useAuth } from '../../context/AuthContext';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export function ProfileSettings() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user?.id}`);
      const data = await response.json();
      setUserData(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/users/${user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
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
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 p-4 rounded-lg ${
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

          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-brand-offWhite">
                <img
                  src={
                    userData?.avatar ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&q=80"
                  }
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
            onSubmit={handleSaveChanges}>
            
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  name="email"
                  value={formData.email}
                  disabled
                  className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-xl text-brand-slate placeholder:text-brand-slate transition-colors outline-none bg-gray-100 cursor-not-allowed opacity-60" />
                
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-xl text-brand-navy placeholder:text-brand-slate focus:ring-2 focus:ring-brand-coral/30 focus:border-brand-coral transition-colors outline-none bg-brand-offWhite focus:bg-white" />
                
              </div>
            </div>

            <div className="sm:col-span-2 pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-brand-coral hover:bg-[#e0484d] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md focus:ring-4 focus:ring-brand-coral/30 outline-none">
                
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>);

}