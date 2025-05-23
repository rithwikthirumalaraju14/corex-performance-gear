
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2 } from 'lucide-react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Separator } from './ui/separator';

const ShoppingCart = () => {
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
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Shopping Cart ({itemCount})</span>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                <Trash2 size={16} className="mr-2" />
                Clear
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <CartIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 animate-fade-in">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-semibold text-corex-red">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id, item.size, item.color)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-corex-red">${totalPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button className="w-full bg-corex-red hover:bg-corex-red/90 text-white">
                    Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
