
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Save } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import AvatarSection from './profile/AvatarSection';
import BasicInfoSection from './profile/BasicInfoSection';
import SizePreferencesSection from './profile/SizePreferencesSection';
import CategoryPreferencesSection from './profile/CategoryPreferencesSection';
import NotificationsSection from './profile/NotificationsSection';

interface ProfileFormProps {
  onClose?: () => void;
}

const ProfileForm = ({ onClose }: ProfileFormProps) => {
  const { profile, createProfile, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    avatar: profile?.avatar || '',
    preferences: {
      favoriteCategories: profile?.preferences?.favoriteCategories || [],
      sizePreferences: {
        tops: profile?.preferences?.sizePreferences?.tops || '',
        bottoms: profile?.preferences?.sizePreferences?.bottoms || '',
        shoes: profile?.preferences?.sizePreferences?.shoes || '',
      },
      notifications: profile?.preferences?.notifications ?? true,
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (!value.trim()) {
      newErrors[field] = 'Please fill all the details';
    } else {
      delete newErrors[field];
    }
    
    if (field === 'email' && value.trim() && !value.includes('@')) {
      newErrors[field] = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (typeof value === 'string') {
      validateField(field, value);
    }
  };

  const handleSizeChange = (sizeType: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        sizePreferences: {
          ...prev.preferences.sizePreferences,
          [sizeType]: value
        }
      }
    }));
    
    validateField(`size_${sizeType}`, value);
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        favoriteCategories: prev.preferences.favoriteCategories.includes(category)
          ? prev.preferences.favoriteCategories.filter(c => c !== category)
          : [...prev.preferences.favoriteCategories, category]
      }
    }));
  };

  const handleNotificationsChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email'];
    const newErrors: Record<string, string> = {};
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        newErrors[field] = 'Please fill all the details';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (profile) {
      updateProfile(formData);
    } else {
      createProfile(formData);
    }
    
    onClose?.();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {profile ? 'Edit Profile' : 'Create Your Profile'}
            </h2>
            <p className="text-gray-600">
              {profile ? 'Update your information' : 'Tell us about yourself to get personalized recommendations'}
            </p>
          </div>

          <AvatarSection
            avatar={formData.avatar}
            name={formData.name}
            onAvatarChange={(url) => handleInputChange('avatar', url)}
          />

          <BasicInfoSection
            formData={{
              name: formData.name,
              email: formData.email,
              location: formData.location,
              bio: formData.bio
            }}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <SizePreferencesSection
            sizePreferences={formData.preferences.sizePreferences}
            errors={errors}
            onSizeChange={handleSizeChange}
          />

          <CategoryPreferencesSection
            favoriteCategories={formData.preferences.favoriteCategories}
            onCategoryToggle={handleCategoryToggle}
          />

          <NotificationsSection
            notifications={formData.preferences.notifications}
            onNotificationsChange={handleNotificationsChange}
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {profile ? 'Update Profile' : 'Create Profile'}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
