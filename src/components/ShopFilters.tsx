
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';
import { categories, sortOptions } from '@/constants/shopConstants';

interface ShopFiltersProps {
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (v: 'grid' | 'list') => void;
  total: number;
  available: number;
}

const ShopFilters = ({
  filterCategory, setFilterCategory,
  sortBy, setSortBy,
  searchQuery, setSearchQuery,
  viewMode, setViewMode,
  total, available
}: ShopFiltersProps) => (
  <div className="mb-8 space-y-4 animate-slide-in-left">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-64">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <div className="flex border rounded-md">
          <button
            aria-label="Grid view"
            className={`rounded-r-none px-3 py-2 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            aria-label="List view"
            className={`rounded-l-none px-3 py-2 ${viewMode === 'list' ? 'bg-muted' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="text-sm text-gray-600">
      Showing {available} of {total} products
    </div>
  </div>
);

export default ShopFilters;
