
import { Label } from '../ui/label';

interface NotificationsSectionProps {
  notifications: boolean;
  onNotificationsChange: (checked: boolean) => void;
}

const NotificationsSection = ({ notifications, onNotificationsChange }: NotificationsSectionProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="notifications"
        checked={notifications}
        onChange={(e) => onNotificationsChange(e.target.checked)}
        className="rounded"
      />
      <Label htmlFor="notifications">
        Receive notifications about new products and offers
      </Label>
    </div>
  );
};

export default NotificationsSection;
