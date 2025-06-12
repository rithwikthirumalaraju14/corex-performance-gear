import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Edit, MapPin, Calendar, User, Heart, Settings, LogOut } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import ProfileForm from './ProfileForm';

const ProfileDisplay = () => {
  const { profile, isProfileComplete, logout } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
          <p className="text-gray-600 mb-6">
            Set up your profile to get personalized recommendations and a better shopping experience.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Create Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ProfileForm onClose={() => setIsEditOpen(false)} />
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    );
  }

  const memberSince = new Date(profile.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-2xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-gray-600">{profile.email}</p>
                {profile.location && (
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <ProfileForm onClose={() => setIsEditOpen(false)} />
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            
            {profile.bio && (
              <p className="text-gray-700 mt-4">{profile.bio}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Profile Completion Status */}
      {!isProfileComplete && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Complete Your Profile</h3>
              <p className="text-yellow-700 text-sm">
                Add your size preferences to get better product recommendations.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="ml-auto"
            >
              Complete
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Size Preferences */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Size Preferences</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tops:</span>
              <Badge variant="secondary">
                {profile.preferences.sizePreferences.tops || 'Not set'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bottoms:</span>
              <Badge variant="secondary">
                {profile.preferences.sizePreferences.bottoms || 'Not set'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shoes:</span>
              <Badge variant="secondary">
                {profile.preferences.sizePreferences.shoes || 'Not set'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Favorite Categories */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Favorite Categories</h2>
          <div className="flex flex-wrap gap-2">
            {profile.preferences.favoriteCategories.length > 0 ? (
              profile.preferences.favoriteCategories.map(category => (
                <Badge key={category} className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {category}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No favorite categories selected</p>
            )}
          </div>
        </Card>
      </div>

      {/* Preferences */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email Notifications</span>
            <Badge variant={profile.preferences.notifications ? "default" : "secondary"}>
              {profile.preferences.notifications ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDisplay;
