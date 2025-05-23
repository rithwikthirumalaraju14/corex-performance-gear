
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Heart, Share2 } from 'lucide-react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';

interface ProductQuickViewProps {
  product: {
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
    badge?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useShoppingCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
    
    onClose();
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={product.images?.[selectedImage] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-corex-red text-white">
                  {product.badge}
                </Badge>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-corex-red' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bebas">{product.name}</DialogTitle>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-corex-red">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <Badge variant="destructive">{discount}% OFF</Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="font-semibold mb-2">Size:</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size ? 'bg-black text-white' : ''}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="font-semibold mb-2">Color:</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className={selectedColor === color ? 'bg-black text-white' : ''}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="w-full bg-corex-red hover:bg-corex-red/90 text-white"
                size="lg"
              >
                Add to Cart
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart size={16} className="mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
