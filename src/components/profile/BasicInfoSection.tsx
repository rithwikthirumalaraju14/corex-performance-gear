
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface BasicInfoSectionProps {
  formData: {
    name: string;
    email: string;
    location: string;
    bio: string;
  };
  errors: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const BasicInfoSection = ({ formData, errors, onInputChange }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          className={errors.name ? 'border-red-500' : ''}
          required
        />
        {(errors.name || !formData.name.trim()) && (
          <p className="text-red-500 text-sm mt-1">Please enter the details</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter your email"
          className={errors.email ? 'border-red-500' : ''}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        {!errors.email && !formData.email.trim() && (
          <p className="text-red-500 text-sm mt-1">Please enter the details</p>
        )}
      </div>

      <div>
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onInputChange('location', e.target.value)}
          placeholder="City, Country"
          className={errors.location ? 'border-red-500' : ''}
          required
        />
        {(errors.location || !formData.location.trim()) && (
          <p className="text-red-500 text-sm mt-1">Please enter the details</p>
        )}
      </div>

      <div>
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onInputChange('bio', e.target.value)}
          placeholder="Tell us about your fitness journey..."
          rows={3}
          className={errors.bio ? 'border-red-500' : ''}
          required
        />
        {(errors.bio || !formData.bio.trim()) && (
          <p className="text-red-500 text-sm mt-1">Please enter the details</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
