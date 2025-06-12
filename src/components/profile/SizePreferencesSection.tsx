
import { Label } from '../ui/label';

interface SizePreferencesSectionProps {
  sizePreferences: {
    tops: string;
    bottoms: string;
    shoes: string;
  };
  errors: Record<string, string>;
  onSizeChange: (sizeType: string, value: string) => void;
}

const SizePreferencesSection = ({ sizePreferences, errors, onSizeChange }: SizePreferencesSectionProps) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['6', '7', '8', '9', '10', '11', '12', '13'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Size Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Tops</Label>
          <select
            className={`w-full p-2 border rounded-md ${errors.size_tops ? 'border-red-500' : ''}`}
            value={sizePreferences.tops}
            onChange={(e) => onSizeChange('tops', e.target.value)}
          >
            <option value="">Select size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.size_tops && <p className="text-red-500 text-sm mt-1">{errors.size_tops}</p>}
        </div>

        <div>
          <Label>Bottoms</Label>
          <select
            className={`w-full p-2 border rounded-md ${errors.size_bottoms ? 'border-red-500' : ''}`}
            value={sizePreferences.bottoms}
            onChange={(e) => onSizeChange('bottoms', e.target.value)}
          >
            <option value="">Select size</option>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.size_bottoms && <p className="text-red-500 text-sm mt-1">{errors.size_bottoms}</p>}
        </div>

        <div>
          <Label>Shoes</Label>
          <select
            className={`w-full p-2 border rounded-md ${errors.size_shoes ? 'border-red-500' : ''}`}
            value={sizePreferences.shoes}
            onChange={(e) => onSizeChange('shoes', e.target.value)}
          >
            <option value="">Select size</option>
            {shoeSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.size_shoes && <p className="text-red-500 text-sm mt-1">{errors.size_shoes}</p>}
        </div>
      </div>
    </div>
  );
};

export default SizePreferencesSection;
