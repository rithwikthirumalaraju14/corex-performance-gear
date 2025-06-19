
import { useState } from 'react';
import { PaymentData } from '@/pages/Checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Truck, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentOptionsProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  subtotal: number;
}

const PaymentOptions = ({ data, onChange, subtotal }: PaymentOptionsProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const { toast } = useToast();

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'upi', label: 'UPI Payment', icon: Smartphone },
    { value: 'cod', label: 'Cash on Delivery', icon: Truck },
    { value: 'netbanking', label: 'Net Banking', icon: Building }
  ];

  const handleApplyDiscount = () => {
    const validCodes = {
      'SAVE10': 0.1,
      'FIRST20': 0.2,
      'WELCOME15': 0.15
    };

    const discountPercent = validCodes[discountCode as keyof typeof validCodes];
    
    if (discountPercent) {
      const discountAmount = subtotal * discountPercent;
      onChange({ 
        ...data, 
        discountCode, 
        discountAmount 
      });
      toast({
        title: "Discount applied!",
        description: `You saved $${discountAmount.toFixed(2)} with code ${discountCode}`,
      });
    } else {
      toast({
        title: "Invalid discount code",
        description: "Please check your discount code and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <p className="text-sm text-gray-600">Choose your preferred payment option</p>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={data.method} 
            onValueChange={(value) => onChange({ ...data, method: value as PaymentData['method'] })}
          >
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div key={method.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={method.value} id={method.value} />
                  <IconComponent size={20} className="text-gray-600" />
                  <Label htmlFor={method.value} className="flex-1 cursor-pointer">
                    {method.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discount Code</CardTitle>
          <p className="text-sm text-gray-600">Have a promo code? Enter it here</p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            />
            <Button variant="outline" onClick={handleApplyDiscount}>
              Apply
            </Button>
          </div>
          {data.discountCode && (
            <p className="mt-2 text-sm text-green-600">
              Discount code "{data.discountCode}" applied! You saved ${data.discountAmount?.toFixed(2)}
            </p>
          )}
          <div className="mt-4 text-xs text-gray-500">
            <p>Try these codes: SAVE10, FIRST20, WELCOME15</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentOptions;
