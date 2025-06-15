import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Save } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import AvatarSection from './profile/AvatarSection';
import BasicInfoSection from './profile/BasicInfoSection';
import NotificationsSection from './profile/NotificationsSection';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface ProfileFormProps {
  onClose?: () => void;
}

const ProfileForm = ({ onClose }: ProfileFormProps) => {
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();

  // Load fields from Supabase profile
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: profile?.email || '',
    avatar: profile?.avatar_url || '',
    phone: profile?.phone || '',
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
  const [showValidation, setShowValidation] = useState(false);

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (!value.trim()) {
      newErrors[field] = 'Please enter the details';
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
    
    if (typeof value === 'string' && showValidation) {
      validateField(field, value);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    const requiredFields = ['name', 'email'];
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        newErrors[field] = 'Please enter the details';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updates = {
      full_name: formData.name,
      email: formData.email,
      avatar_url: formData.avatar,
      phone: formData.phone,
      // No bio/location!
    };

    await updateProfile(updates);

    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {profile ? 'Edit Profile' : 'Create Your Profile'}
              </h2>
              <p className="text-gray-600">
                {profile ? 'Update your information' : 'Tell us about yourself to get personalized recommendations'}
              </p>
            </div>
          </div>
          <AvatarSection
            avatar={formData.avatar}
            name={formData.name}
            onAvatarChange={(url) => setFormData(f => ({ ...f, avatar: url }))}
          />
          <div className="space-y-4">
            <div>
              <label className="font-medium">Full Name</label>
              <Input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} required />
              {errors.name && showValidation && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>
            <div>
              <label className="font-medium">Email</label>
              <Input type="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} required />
              {errors.email && showValidation && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>
            <div>
              <label className="font-medium">Phone</label>
              <Input type="tel" value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
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
              <Button type="button" variant="outline" onClick={handleCancel}>
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
