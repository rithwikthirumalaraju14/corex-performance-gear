import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  category: string;
  badge?: string;
  featured?: boolean;
  images?: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isWishlisted: boolean;
  wishlistLoading: boolean;
  handleWishlist: (productId: string) => void;
  handleAddToCart: (product: Product) => void;
  handleQuickView: (product: Product) => void;
}

const colorToHex = (color: string) => {
  switch (color.toLowerCase()) {
    case "white": return "#fff";
    case "black": return "#000";
    case "navy": return "#001f3f";
    case "red": return "#ea384c";
    case "blue": return "#0088ff";
    case "green": return "#00ff88";
    case "pink": return "#ff69b4";
    case "purple": return "#8b5cf6";
    case "gray":
    case "charcoal": return "#6b7280";
    case "olive": return "#808000";
    default: return "#ccc";
  }
};

const ProductCard = ({
  product, viewMode, isWishlisted, wishlistLoading,
  handleWishlist, handleAddToCart, handleQuickView
}: ProductCardProps) => (
  <div
    className={`overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in ${viewMode === 'list' ? 'flex flex-row' : ''}`}
    style={{ animationDelay: '0s' }}
  >
    <div className={`relative group ${viewMode === 'list' ? 'w-48' : 'aspect-[3/4] w-full'} overflow-hidden`}>
      <img
        src={product.image}
        alt={product.name.replace(/<[^>]+>/g, '')}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <button
        className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-90 border border-gray-200 shadow-sm outline-none transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-corex-red/70 focus-visible:ring-2 focus-visible:ring-corex-red active:scale-95"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => handleWishlist(product.id)}
        disabled={wishlistLoading}
        tabIndex={0}
      >
        <span className={`flex items-center justify-center transition-colors duration-200 ${isWishlisted ? "text-corex-red" : "text-gray-400 group-hover:text-corex-red"}`}>
          {isWishlisted
            ? <Heart className="w-5 h-5 fill-corex-red" />
            : <Heart className="w-5 h-5" />}
        </span>
      </button>
      {product.badge && (
        <Badge className={`absolute top-3 right-3 ${product.badge === 'SALE' ? 'bg-corex-red' : 'bg-corex-blue'} text-white`}>
          {product.badge}
        </Badge>
      )}
    </div>
    <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
      <div className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        <div className="text-lg font-medium mb-2"
          dangerouslySetInnerHTML={
            /<mark[\s>]/.test(product.name)
              ? { __html: product.name }
              : undefined
          }
        >
          {
            !/<mark[\s>]/.test(product.name) && product.name
          }
        </div>
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
          {product.colors && product.colors.slice(0, 4).map((color, idx) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: colorToHex(color) }}
              title={color}
            />
          ))}
          {product.colors && product.colors.length > 4 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
      <div className="p-4 pt-0 space-y-2">
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
      </div>
    </div>
  </div>
);

export default ProductCard;
