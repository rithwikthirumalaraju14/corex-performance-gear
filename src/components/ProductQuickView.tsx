import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Heart, Share2 } from 'lucide-react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'

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
  const [isInWishlist, setIsInWishlist] = useState(false);
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

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    // Here you could add the logic to save to a global wishlist state or localStorage
    console.log(`${isInWishlist ? 'Removed from' : 'Added to'} wishlist:`, product.name);
  };

  // 360° image carousel if >1 image
  const hasMultipleImages = product.images && product.images.length > 1;

  // Video present
  const videoUrl = (product as any).video;

  // Fit/fabric/guide info (may not exist on all)
  const fitGuide = (product as any).fitGuide;

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images/Video */}
          <div className="space-y-4">
            {/* Video block (if present) */}
            {videoUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow">
                <iframe
                  src={videoUrl}
                  title="Product video"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}

            {/* Carousel if multiple images, normal image otherwise */}
            {hasMultipleImages ? (
              <div className="relative w-full">
                <Carousel>
                  <CarouselContent>
                    {product.images!.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                          <img
                            src={img}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-corex-red text-white">
                    {product.badge}
                  </Badge>
                )}
              </div>
            )}

            {/* Tiny thumbnails (optional, one row, if several images) */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 mt-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-corex-red' : 'border-gray-200'}`}
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

            {/* Fit, Fabric, Size Guide: Accordion */}
            {fitGuide && (
              <Accordion type="single" collapsible className="border rounded-lg bg-gray-50">
                <AccordionItem value="fit-fabric-guide">
                  <AccordionTrigger className="p-4 font-semibold text-base">Fit, Fabric & Size Guide</AccordionTrigger>
                  <AccordionContent className="space-y-2 p-4">
                    {fitGuide.fit && <p><b>Fit:</b> {fitGuide.fit}</p>}
                    {fitGuide.material && <p><b>Material:</b> {fitGuide.material}</p>}
                    {fitGuide.care && <p><b>Care:</b> {fitGuide.care}</p>}
                    {/* Simple size chart table */}
                    {fitGuide.sizeChart && (
                      <div className="mt-2">
                        <table className="table-auto text-sm w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left py-1 pr-4">Size</th>
                              <th className="text-left py-1 pr-4">Chest</th>
                              <th className="text-left py-1">Length</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fitGuide.sizeChart.map((row: any, idx: number) => (
                              <tr key={idx}>
                                <td className="py-1 pr-4">{row.size}</td>
                                <td className="py-1 pr-4">{row.chest}</td>
                                <td className="py-1">{row.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`flex-1 ${isInWishlist ? 'bg-red-50 border-red-300 text-red-600' : ''}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart size={16} className={`mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isInWishlist ? 'In Wishlist' : 'Wishlist'}
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
