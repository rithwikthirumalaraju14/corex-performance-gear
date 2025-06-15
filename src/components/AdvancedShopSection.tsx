import { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import ProductQuickView from './ProductQuickView';
import { useProfile } from "@/hooks/useProfile";
import { useWishlist } from "@/hooks/useWishlist";
import ShopFilters from "./ShopFilters";
import ShopGrid from "./ShopGrid";
import { categories, sortOptions } from '@/constants/shopConstants';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  category: string;
  badge?: string;
  featured?: boolean;
  video?: string;
  fitGuide?: {
    fit: string;
    material: string;
    care: string;
    sizeChart: { size: string, chest: string, length: string }[];
  };
}

const allProducts: Product[] = [
  {
    id: 'xt-001',
    name: 'X-Perform Training Tee',
    price: 45.00,
    originalPrice: 60.00,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80'
    ],
    description: 'Premium performance tee engineered for maximum comfort and durability during intense training sessions.',
    features: ['Moisture-wicking fabric', 'Anti-odor technology', 'Flatlock seams', '4-way stretch'],
    rating: 4.8,
    reviews: 124,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Red'],
    category: 'tees',
    badge: 'SALE',
    featured: true,
    video: 'https://www.youtube.com/embed/xp2qjshr-r4', // sample (pretend promo/fit video)
    fitGuide: {
      fit: "Athletic fit. True to size.",
      material: "92% Polyester / 8% Spandex",
      care: "Machine wash cold, tumble dry low.",
      sizeChart: [
        { size: "S", chest: "34-36\"", length: "28\"" },
        { size: "M", chest: "38-40\"", length: "29\"" },
        { size: "L", chest: "42-44\"", length: "30\"" },
        { size: "XL", chest: "46-48\"", length: "31\"" }
      ]
    }
  },
  {
    id: 'cs-002',
    name: 'Core Compression Shorts',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1506902540976-5005d40e1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'High-performance compression shorts designed for optimal muscle support and recovery.',
    features: ['Graduated compression', 'Breathable mesh panels', 'Secure pocket', 'UPF 50+ protection'],
    rating: 4.9,
    reviews: 89,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal', 'Navy'],
    category: 'compression',
    featured: true
  },
  {
    id: 'xb-003',
    name: 'X-Flex Sports Bra',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
    description: 'Medium to high support sports bra with innovative moisture management technology.',
    features: ['Medium support', 'Removable padding', 'Racerback design', 'Sweat-wicking'],
    rating: 4.7,
    reviews: 156,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink', 'Purple'],
    category: 'sports-bras',
    badge: 'NEW'
  },
  {
    id: 'xj-004',
    name: 'X-Run Performance Joggers',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Premium joggers designed for runners who demand comfort, flexibility, and style.',
    features: ['Water-resistant fabric', 'Zip pockets', 'Tapered fit', 'Reflective details'],
    rating: 4.6,
    reviews: 92,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Charcoal', 'Olive'],
    category: 'joggers'
  },
  {
    id: 'xh-005',
    name: 'X-Core Training Hoodie',
    price: 75.00,
    originalPrice: 95.00,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Versatile training hoodie perfect for pre-workout warmups and post-training recovery.',
    features: ['French terry fabric', 'Kangaroo pocket', 'Thumbhole cuffs', 'Athletic fit'],
    rating: 4.8,
    reviews: 67,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy'],
    category: 'hoodies',
    badge: 'SALE'
  },
  {
    id: 'xt-006',
    name: 'X-Tank Performance Top',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Lightweight performance tank designed for high-intensity training and summer workouts.',
    features: ['Ultra-lightweight', 'Quick-dry technology', 'Mesh ventilation', 'Loose fit'],
    rating: 4.5,
    reviews: 143,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue', 'Green'],
    category: 'tanks'
  }
];

const getAllSizes = () => {
  const allSizes = new Set<string>();
  allProducts.forEach(p => p.sizes.forEach(s => allSizes.add(s)));
  return Array.from(allSizes);
};
const getAllColors = () => {
  const allColors = new Set<string>();
  allProducts.forEach(p => p.colors.forEach(c => allColors.add(c)));
  return Array.from(allColors);
};
const getPriceBounds = () => {
  let min = Number.POSITIVE_INFINITY,
    max = Number.NEGATIVE_INFINITY;
  allProducts.forEach(p => {
    min = Math.min(min, p.price);
    max = Math.max(max, p.price);
  });
  return [Math.floor(min), Math.ceil(max)];
};

const AdvancedShopSection = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(getPriceBounds() as [number, number]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useShoppingCart();
  const { profile } = useProfile();
  const userId = profile?.id ?? null;
  const { wishlisted, loading: wishlistLoading, add, remove, isWishlisted } = useWishlist(userId);
  const { toast } = useToast();

  const minPrice = getPriceBounds()[0];
  const maxPrice = getPriceBounds()[1];

  const filteredProducts = allProducts
    .filter(product => {
      // Multi-category
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // Size
      const matchesSize =
        selectedSizes.length === 0 ||
        product.sizes.some(size => selectedSizes.includes(size));

      // Color
      const matchesColor =
        selectedColors.length === 0 ||
        product.colors.some(color => selectedColors.includes(color));

      // Price
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSize && matchesColor && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return a.badge === 'NEW' ? -1 : 1;
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  const getHighlight = useCallback((text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'ig');
    return text.replace(regex, '<mark class="bg-yellow-200 rounded px-1">$1</mark>');
  }, [searchQuery]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M',
      color: product.colors[0],
    });
    toast({
      title: "Added to cart",
      description: `${product.name} was added to your cart.`,
    });
  };

  const handleWishlist = (productId: string) => {
    if (!userId) {
      toast({ title: "Sign in required", description: "Please sign in to use the wishlist feature." });
      return;
    }
    if (isWishlisted(productId)) {
      remove(productId);
      toast({ title: "Removed from wishlist", description: "Product was removed from your wishlist." });
    } else {
      add(productId);
      toast({ title: "Added to wishlist", description: "Product was added to your wishlist." });
    }
  };

  useEffect(() => {
    (window as any).__ADVANCED_PRODUCTS_LIST__ = allProducts.map((x) => x.name);
  }, []);

  return (
    <section id="shop" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl mb-6 font-bebas">Shop Core X</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of performance athletic wear designed for champions
          </p>
        </div>
        <ShopFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          total={allProducts.length}
          available={filteredProducts.length}
        />
        <ShopGrid
          products={filteredProducts}
          viewMode={viewMode}
          isWishlisted={isWishlisted}
          wishlistLoading={wishlistLoading}
          handleWishlist={handleWishlist}
          handleAddToCart={handleAddToCart}
          handleQuickView={handleQuickView}
          nameHighlight={getHighlight}
        />

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setSelectedSizes([]);
                setSelectedColors([]);
                setPriceRange([minPrice, maxPrice]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <ProductQuickView
        product={selectedProduct}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </section>
  );
};

export default AdvancedShopSection;
