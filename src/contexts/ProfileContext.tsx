import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
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
  wishlist: string[]; // Product IDs
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  createProfile: (profileData: Omit<UserProfile, 'id' | 'joinDate' | 'wishlist'>) => Promise<void>;
  logout: () => Promise<void>;
  isProfileComplete: boolean;
  refreshProfile: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // On mount/session change, load profile and wishlist from Supabase
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        if (data) {
          const { data: wishlistRows } = await supabase
            .from("wishlists")
            .select("product_id")
            .eq("user_id", session.user.id);
          setProfile({
            ...data,
            preferences: {
              favoriteCategories: [],
              sizePreferences: { tops: "", bottoms: "", shoes: "" },
              notifications: true,
            },
            joinDate: data.created_at ?? new Date().toISOString(),
            wishlist: wishlistRows?.map(w => w.product_id) ?? [],
          });
        }
      } else {
        setProfile(null);
      }
    };
    load();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) load();
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      if (data) {
        const { data: wishlistRows } = await supabase
          .from("wishlists")
          .select("product_id")
          .eq("user_id", session.user.id);
        setProfile(prev =>
          prev
            ? {
                ...prev,
                ...data,
                wishlist: wishlistRows?.map(w => w.product_id) ?? [],
              }
            : null
        );
      }
    }
  };

  const createProfile = async (profileData: Omit<UserProfile, 'id' | 'joinDate' | 'wishlist'>) => {
    // Not needed, handled by trigger on signup
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    const { id, full_name, email, avatar_url, phone } = {
      ...profile,
      ...updates,
    };
    await supabase.from("profiles").update({
      full_name, email, avatar_url, phone,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    await refreshProfile();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const isProfileComplete = Boolean(
    profile?.full_name && profile?.email
  );

  // Add/Remove Wishlist item
  const toggleWishlist = async (productId: string) => {
    if (!profile) return;
    if (profile.wishlist.includes(productId)) {
      // Remove
      await supabase.from("wishlists")
        .delete()
        .eq("user_id", profile.id)
        .eq("product_id", productId);
    } else {
      // Add
      await supabase.from("wishlists")
        .insert({ user_id: profile.id, product_id: productId });
    }
    await refreshProfile();
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      createProfile,
      logout,
      isProfileComplete,
      refreshProfile,
      toggleWishlist,
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
