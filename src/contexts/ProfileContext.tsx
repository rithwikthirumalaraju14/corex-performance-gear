
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  preferences: {
    favoriteCategories: string[];
    sizePreferences: {
      tops: string;
      bottoms: string;
      shoes: string;
    };
    notifications: boolean;
  };
  joinDate: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  createProfile: (profileData: Omit<UserProfile, 'id' | 'joinDate'>) => void;
  logout: () => void;
  isProfileComplete: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const createProfile = (profileData: Omit<UserProfile, 'id' | 'joinDate'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      id: `user_${Date.now()}`,
      joinDate: new Date().toISOString(),
    };
    setProfile(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem('userProfile');
  };

  const isProfileComplete = Boolean(
    profile?.name && 
    profile?.email && 
    profile?.preferences?.sizePreferences?.tops
  );

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      createProfile,
      logout,
      isProfileComplete
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
