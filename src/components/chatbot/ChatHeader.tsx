
import { X, MessageCircle } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex shrink-0 justify-between items-center p-4 border-b bg-white rounded-t-xl">
    <div className="flex items-center space-x-3">
      <div className="bg-corex-blue p-2 rounded-full">
        <MessageCircle className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">Core X AI</h3>
        <p className="text-xs text-gray-500">Your virtual assistant</p>
      </div>
    </div>
    <button onClick={onClose} aria-label="Close chat" className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors">
      <X className="h-5 w-5" />
    </button>
  </div>
);

export default ChatHeader;
