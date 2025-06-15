
import { X, MessageCircle, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex shrink-0 justify-between items-center p-5 border-b border-gray-100 bg-gradient-to-r from-corex-blue/5 to-corex-red/5 rounded-t-2xl relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-corex-blue/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
    
    <div className="flex items-center space-x-3 relative z-10">
      <div className="relative">
        <div className="bg-gradient-to-r from-corex-blue to-corex-red p-3 rounded-xl shadow-lg">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-800 bg-gradient-to-r from-corex-blue to-corex-red bg-clip-text text-transparent">
          Core X AI
        </h3>
        <p className="text-sm text-gray-500 font-medium">Your intelligent assistant</p>
      </div>
    </div>
    <button 
      onClick={onClose} 
      aria-label="Close chat" 
      className="relative z-10 p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 hover:scale-110 group"
    >
      <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  </div>
);

export default ChatHeader;
