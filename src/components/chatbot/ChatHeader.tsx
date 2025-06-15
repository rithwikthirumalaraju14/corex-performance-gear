
import { X, Dumbbell } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex shrink-0 justify-between items-center p-4 border-b bg-gradient-to-br from-corex-blue via-corex-green to-corex-red rounded-t-xl">
    <div className="flex items-center space-x-3">
      <div className="bg-white p-2 rounded-full shadow-lg border-2 border-corex-blue flex items-center justify-center">
        <Dumbbell className="h-6 w-6 text-corex-blue" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">Core X AI</h3>
        <p className="text-xs text-gray-600">Your virtual assistant</p>
      </div>
    </div>
    <button onClick={onClose} aria-label="Close chat" className="p-1 rounded-full text-corex-blue/70 hover:bg-white hover:text-corex-blue transition-colors">
      <X className="h-5 w-5" />
    </button>
  </div>
);

export default ChatHeader;
