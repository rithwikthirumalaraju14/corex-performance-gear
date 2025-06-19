
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Separator } from './ui/separator';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getItemCount, 
    getTotalPrice,
    isOpen,
    setIsOpen 
  } = useShoppingCart();

  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CartIcon size={20} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-corex-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full h-full max-w-none sm:max-w-none bg-white/95 backdrop-blur-lg p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <ArrowLeft size={20} />
                </Button>
                <span>Shopping Cart ({itemCount})</span>
              </div>
              {items.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 size={16} className="mr-2" />
                  Clear
                </Button>
              )}
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 flex flex-col p-6">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <CartIcon size={80} className="mx-auto text-gray-400 mb-6" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven't added anything to your cart yet
                  </p>
                  <Button 
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-6 p-4 border rounded-lg animate-fade-in">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-gray-500 mt-1">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="font-bold text-corex-red text-xl mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id, item.size, item.color)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6 space-y-6">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-corex-red">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-corex-red hover:bg-corex-red/90 text-white text-lg py-6"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-lg py-6"
                      onClick={() => setIsOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
