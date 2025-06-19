
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check } from 'lucide-react';
import ItemSelection from '@/components/checkout/ItemSelection';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useToast } from '@/hooks/use-toast';

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  selected: boolean;
}

export interface AddressData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PaymentData {
  method: 'card' | 'upi' | 'cod' | 'netbanking';
  discountCode?: string;
  discountAmount?: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useShoppingCart();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [addressData, setAddressData] = useState<AddressData>({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: 'card'
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
      return;
    }
    
    // Convert cart items to checkout items with selection state
    const initialCheckoutItems: CheckoutItem[] = items.map(item => ({
      ...item,
      selected: true
    }));
    setCheckoutItems(initialCheckoutItems);
  }, [items, navigate]);

  const steps = [
    { number: 1, title: 'Items', completed: currentStep > 1 },
    { number: 2, title: 'Address', completed: currentStep > 2 },
    { number: 3, title: 'Payment', completed: currentStep > 3 }
  ];

  const getSelectedItems = () => checkoutItems.filter(item => item.selected);
  const getSubtotal = () => getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  const getShipping = () => getSubtotal() > 100 ? 0 : 10;
  const getTax = () => getSubtotal() * 0.08; // 8% tax
  const getDiscount = () => paymentData.discountAmount || 0;
  const getFinalTotal = () => getSubtotal() + getShipping() + getTax() - getDiscount();

  const handleNextStep = () => {
    if (currentStep === 1 && getSelectedItems().length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2) {
      const requiredFields = ['fullName', 'phoneNumber', 'address', 'city', 'state', 'pincode'];
      const missingFields = requiredFields.filter(field => !addressData[field as keyof AddressData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing information",
          description: "Please fill in all required address fields.",
          variant: "destructive"
        });
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order placed successfully!",
      description: `Your order for $${getFinalTotal().toFixed(2)} has been confirmed.`,
    });
    clearCart();
    navigate('/');
  };

  const progressValue = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progressValue} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? <Check size={16} /> : step.number}
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <ItemSelection
                items={checkoutItems}
                onItemsChange={setCheckoutItems}
              />
            )}
            
            {currentStep === 2 && (
              <AddressForm
                data={addressData}
                onChange={setAddressData}
              />
            )}
            
            {currentStep === 3 && (
              <PaymentOptions
                data={paymentData}
                onChange={setPaymentData}
                subtotal={getSubtotal()}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={handleNextStep}>
                  Next Step
                </Button>
              ) : (
                <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700">
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={getSelectedItems()}
              subtotal={getSubtotal()}
              shipping={getShipping()}
              tax={getTax()}
              discount={getDiscount()}
              total={getFinalTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
