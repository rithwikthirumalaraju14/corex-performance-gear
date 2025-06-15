
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';
import { categories, sortOptions } from '@/constants/shopConstants';
import MultiSelect from './ui/multiselect';

interface ShopFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  total: number;
  available: number;
}

const SIZE_OPTIONS = [
  { value: "XS", label: "XS" }, { value: "S", label: "S" }, { value: "M", label: "M" },
  { value: "L", label: "L" }, { value: "XL", label: "XL" }, { value: "XXL", label: "XXL" },
];

const COLOR_OPTIONS = [
  // update according to product data if needed
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Navy", label: "Navy" },
  { value: "Gray", label: "Gray" },
  { value: "Charcoal", label: "Charcoal" },
  { value: "Red", label: "Red" },
  { value: "Pink", label: "Pink" },
  { value: "Purple", label: "Purple" },
  { value: "Olive", label: "Olive" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
];

const ShopFilters = ({
  selectedCategories, setSelectedCategories,
  selectedSizes, setSelectedSizes,
  selectedColors, setSelectedColors,
  priceRange, setPriceRange,
  minPrice, maxPrice,
  sortBy, setSortBy,
  searchQuery, setSearchQuery,
  total, available
}: ShopFiltersProps) => (
  <div className="mb-8 space-y-4 animate-slide-in-left">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="w-full sm:w-auto flex flex-col gap-2">
          <span className="text-xs text-gray-600 mb-1 flex items-center gap-1"><Filter className="w-4 h-4" /> Category</span>
          <MultiSelect
            options={categories}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            placeholder="Select categories"
          />
        </div>
        <div className="w-full sm:w-auto flex flex-col gap-2">
          <span className="text-xs text-gray-600 mb-1">Size</span>
          <MultiSelect
            options={SIZE_OPTIONS}
            selected={selectedSizes}
            onChange={setSelectedSizes}
            placeholder="Select sizes"
          />
        </div>
        <div className="w-full sm:w-auto flex flex-col gap-2">
          <span className="text-xs text-gray-600 mb-1">Color</span>
          <MultiSelect
            options={COLOR_OPTIONS}
            selected={selectedColors}
            onChange={setSelectedColors}
            placeholder="Select colors"
          />
        </div>
        <div className="w-full sm:w-auto flex flex-col gap-1.5 min-w-[120px]">
          <span className="text-xs text-gray-600 mb-1">Price</span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={minPrice}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-16 text-xs"
            />
            <span className="text-xs">—</span>
            <Input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-16 text-xs"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="text-sm text-gray-600">
      Showing {available} of {total} products
    </div>
  </div>
);

export default ShopFilters;
