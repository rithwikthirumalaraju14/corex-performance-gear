
import { CheckoutItem } from '@/pages/Checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface ItemSelectionProps {
  items: CheckoutItem[];
  onItemsChange: (items: CheckoutItem[]) => void;
}

const ItemSelection = ({ items, onItemsChange }: ItemSelectionProps) => {
  const handleSelectItem = (id: string, size: string, color: string, selected: boolean) => {
    const updatedItems = items.map(item =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, selected }
        : item
    );
    onItemsChange(updatedItems);
  };

  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = items.map(item =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, quantity: newQuantity }
        : item
    );
    onItemsChange(updatedItems);
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    const updatedItems = items.filter(item =>
      !(item.id === id && item.size === size && item.color === color)
    );
    onItemsChange(updatedItems);
  };

  const handleSelectAll = () => {
    const allSelected = items.every(item => item.selected);
    const updatedItems = items.map(item => ({ ...item, selected: !allSelected }));
    onItemsChange(updatedItems);
  };

  const selectedCount = items.filter(item => item.selected).length;
  const selectedSubtotal = items
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Select Items ({selectedCount} of {items.length} selected)</CardTitle>
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            {items.every(item => item.selected) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Subtotal for selected items: <span className="font-semibold">${selectedSubtotal.toFixed(2)}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Checkbox
              checked={item.selected}
              onCheckedChange={(checked) => 
                handleSelectItem(item.id, item.size, item.color, checked as boolean)
              }
            />
            
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus size={14} />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
              >
                <Plus size={14} />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveItem(item.id, item.size, item.color)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ItemSelection;
