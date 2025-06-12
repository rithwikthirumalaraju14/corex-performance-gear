
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Camera, User } from 'lucide-react';

interface AvatarSectionProps {
  avatar: string;
  name: string;
  onAvatarChange: (url: string) => void;
}

const AvatarSection = ({ avatar, name, onAvatarChange }: AvatarSectionProps) => {
  const handleAvatarClick = () => {
    const url = prompt('Enter avatar URL:');
    if (url) onAvatarChange(url);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="absolute -bottom-2 -right-2 rounded-full p-2"
          onClick={handleAvatarClick}
        >
          <Camera className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default AvatarSection;
