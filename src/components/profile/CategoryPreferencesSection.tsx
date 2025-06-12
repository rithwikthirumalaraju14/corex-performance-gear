
import { Button } from '../ui/button';

interface CategoryPreferencesSectionProps {
  favoriteCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const CategoryPreferencesSection = ({ favoriteCategories, onCategoryToggle }: CategoryPreferencesSectionProps) => {
  const categories = ['Training', 'Running', 'Yoga', 'Swimming', 'Basketball', 'Football'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Favorite Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {categories.map(category => (
          <Button
            key={category}
            type="button"
            variant={favoriteCategories.includes(category) ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryToggle(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreferencesSection;
