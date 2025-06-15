
import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex justify-between items-center py-3 px-4 border-b">
    <span className="font-bold text-corex-blue">Ask Core X AI</span>
    <button onClick={onClose} aria-label="Close chat">
      <X className="h-5 w-5 text-gray-400 hover:text-gray-800" />
    </button>
  </div>
);

export default ChatHeader;
