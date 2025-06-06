import React, { useEffect, useState } from 'react';
import { User } from '@/utils/types';

interface UserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function UserDialog({ user, isOpen, onClose }: UserDialogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (isOpen && user) {
      setShouldRender(true);
      // Small delay to ensure the component is rendered before adding the visible class
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for the animation to complete before unmounting
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, user]);
  
  if (!shouldRender || !user) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`fixed inset-0 bg-[#F5E2E6] bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-gradient-to-r from-[#F3708D] to-[#F24A6F] p-8 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden mb-4">
            <img
              src={user.avatar} 
              alt={`${user.firstname} ${user.lastname}`} 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-white opacity-90">@{user.username}</p>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-800">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="text-gray-800">{user.role}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Joined</h3>
                <p className="text-gray-800">{formatDate(user.join_date)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
              <p className="text-gray-800 whitespace-pre-line">{user.description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#F24A6F] text-white px-6 py-2 rounded-md hover:bg-[#EF3954] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};