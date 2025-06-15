import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Filter, Grid, List, Search, Eye, Heart, HeartOff } from 'lucide-react';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import ProductQuickView from './ProductQuickView';
import { useProfile } from "@/hooks/useProfile";
import { useWishlist } from "@/hooks/useWishlist";

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
}

const AdvancedShopSection = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useShoppingCart();
  const { profile } = useProfile();
  const userId = profile?.id ?? null;
  const { wishlisted, loading: wishlistLoading, add, remove, isWishlisted } = useWishlist(userId);

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
      featured: true
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

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'tees', label: 'Performance Tees' },
    { value: 'compression', label: 'Compression Gear' },
    { value: 'joggers', label: 'Joggers' },
    { value: 'sports-bras', label: 'Sports Bras' },
    { value: 'hoodies', label: 'Hoodies' },
    { value: 'tanks', label: 'Tank Tops' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  const filteredProducts = allProducts
    .filter(product => {
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return a.badge === 'NEW' ? -1 : 1;
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

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
      size: 'M', // Default size
      color: product.colors[0], // Default color
    });
  };

  const handleWishlist = (productId: string) => {
    if (!userId) {
      window.alert("Please sign in to use the wishlist feature.");
      return;
    }
    if (isWishlisted(productId)) {
      remove(productId);
    } else {
      add(productId);
    }
  };

  return (
    <section id="shop" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl mb-6 font-bebas">Shop Core X</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of performance athletic wear designed for champions
          </p>
        </div>
        
        {/* Filters and Controls */}
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
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {allProducts.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className={`overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative group ${viewMode === 'list' ? 'w-48' : 'aspect-[3/4] w-full'} overflow-hidden`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* WISHLIST BUTTON - Small & Modern */}
                <button
                  className={`
                    absolute top-2 left-2 z-10
                    w-8 h-8 flex items-center justify-center
                    rounded-full bg-white bg-opacity-90
                    border border-gray-200
                    shadow-sm
                    outline-none
                    transition-all duration-200
                    hover:scale-110 hover:shadow-md hover:border-corex-red/70
                    focus-visible:ring-2 focus-visible:ring-corex-red
                    active:scale-95
                  `}
                  aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => handleWishlist(product.id)}
                  disabled={wishlistLoading}
                  tabIndex={0}
                >
                  <span
                    className={`
                      flex items-center justify-center transition-colors duration-200
                      ${isWishlisted(product.id)
                        ? "text-corex-red"
                        : "text-gray-400 group-hover:text-corex-red"}
                    `}
                  >
                    {isWishlisted(product.id)
                      ? <Heart className="w-5 h-5 fill-corex-red" />
                      : <Heart className="w-5 h-5" />}
                  </span>
                </button>

                {product.badge && (
                  <Badge className={`absolute top-3 right-3 ${
                    product.badge === 'SALE' ? 'bg-corex-red' : 'bg-corex-blue'
                  } text-white`}>
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                </div>
              </div>
              
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <CardTitle className="text-lg font-medium mb-2">{product.name}</CardTitle>
                  {viewMode === 'list' && (
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold text-corex-red">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                         color.toLowerCase() === 'black' ? '#000000' :
                                         color.toLowerCase() === 'navy' ? '#001f3f' :
                                         color.toLowerCase() === 'red' ? '#ea384c' :
                                         color.toLowerCase() === 'blue' ? '#0088ff' :
                                         color.toLowerCase() === 'green' ? '#00ff88' :
                                         color.toLowerCase() === 'pink' ? '#ff69b4' :
                                         color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                         color.toLowerCase() === 'gray' || color.toLowerCase() === 'charcoal' ? '#6b7280' :
                                         color.toLowerCase() === 'olive' ? '#808000' : '#ccc'
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 space-y-2">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black hover:bg-corex-red text-white transition-colors duration-300"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleQuickView(product)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Quick View
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
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
