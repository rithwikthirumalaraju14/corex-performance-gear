
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ChatInput = ({ input, setInput, sendMessage, loading, inputRef }: ChatInputProps) => {
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim() && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className="border-t border-gray-100 p-4 bg-gradient-to-r from-gray-50/50 to-white rounded-b-2xl shrink-0">
      <div className="relative">
        {/* Input container with gradient border */}
        <div className="relative bg-gradient-to-r from-corex-blue/10 via-corex-red/10 to-corex-green/10 p-0.5 rounded-2xl">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pr-14 h-12 rounded-2xl bg-white border-0 focus:ring-2 focus:ring-corex-blue/30 focus:border-transparent placeholder:text-gray-400 text-gray-700 font-medium"
            placeholder="Ask me anything..."
            onKeyDown={handleInputKeyDown}
            disabled={loading}
          />
        </div>
        
        {/* Send button */}
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || loading} 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-gradient-to-r from-corex-blue to-corex-red text-white hover:from-corex-red hover:to-corex-blue disabled:from-gray-300 disabled:to-gray-400 transition-all duration-300 hover:scale-105 group shadow-lg"
          size="icon"
          aria-label="Send message"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="relative">
              <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              {input.trim() && (
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
              )}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
