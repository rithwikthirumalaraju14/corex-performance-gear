
import { CheckoutItem } from '@/pages/Checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

const OrderSummary = ({ items, subtotal, shipping, tax, discount, total }: OrderSummaryProps) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-600">
                  {item.size} | {item.color} | Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {shipping === 0 && subtotal > 0 && (
          <p className="text-xs text-green-600 text-center">
            🎉 You qualified for free shipping!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
