
import { AddressData } from '@/pages/Checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddressFormProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const AddressForm = ({ data, onChange }: AddressFormProps) => {
  const handleInputChange = (field: keyof AddressData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <p className="text-sm text-gray-600">Please provide your delivery information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="House number, building name, street"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="state">State *</Label>
            <Select value={data.state} onValueChange={(value) => handleInputChange('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={data.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              placeholder="Enter pincode"
              maxLength={6}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
