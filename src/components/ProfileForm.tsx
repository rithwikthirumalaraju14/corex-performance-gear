
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Camera, Save, User } from 'lucide-react';
import { useProfile, UserProfile } from '@/contexts/ProfileContext';

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile) {
      updateProfile(formData);
    } else {
      createProfile(formData);
    }
    
    onClose?.();
  };

  const categories = ['Training', 'Running', 'Yoga', 'Swimming', 'Basketball', 'Football'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['6', '7', '8', '9', '10', '11', '12', '13'];

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

          {/* Avatar Section */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full p-2"
                onClick={() => {
                  const url = prompt('Enter avatar URL:');
                  if (url) handleInputChange('avatar', url);
                }}
              >
                <Camera className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about your fitness journey..."
                rows={3}
              />
            </div>
          </div>

          {/* Size Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Size Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Tops</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.preferences.sizePreferences.tops}
                  onChange={(e) => handleSizeChange('tops', e.target.value)}
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Bottoms</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.preferences.sizePreferences.bottoms}
                  onChange={(e) => handleSizeChange('bottoms', e.target.value)}
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Shoes</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.preferences.sizePreferences.shoes}
                  onChange={(e) => handleSizeChange('shoes', e.target.value)}
                >
                  <option value="">Select size</option>
                  {shoeSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Favorite Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Favorite Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  type="button"
                  variant={formData.preferences.favoriteCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifications"
              checked={formData.preferences.notifications}
              onChange={(e) => handleInputChange('preferences', { 
                ...formData.preferences, 
                notifications: e.target.checked 
              })}
              className="rounded"
            />
            <Label htmlFor="notifications">
              Receive notifications about new products and offers
            </Label>
          </div>

          {/* Submit Buttons */}
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
