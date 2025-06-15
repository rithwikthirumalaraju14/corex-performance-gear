
import ProductCard from './ProductCard';

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

interface ShopGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  isWishlisted: (productId: string) => boolean;
  wishlistLoading: boolean;
  handleWishlist: (productId: string) => void;
  handleAddToCart: (product: Product) => void;
  handleQuickView: (product: Product) => void;
}

const ShopGrid = ({
  products,
  viewMode,
  isWishlisted,
  wishlistLoading,
  handleWishlist,
  handleAddToCart,
  handleQuickView
}: ShopGridProps) => (
  <div className={`grid gap-8 ${viewMode === 'grid'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'grid-cols-1'
    }`}>
    {products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        viewMode={viewMode}
        isWishlisted={isWishlisted(product.id)}
        wishlistLoading={wishlistLoading}
        handleWishlist={handleWishlist}
        handleAddToCart={handleAddToCart}
        handleQuickView={handleQuickView}
      />
    ))}
  </div>
);

export default ShopGrid;
