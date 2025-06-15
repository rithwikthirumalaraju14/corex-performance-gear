
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';

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
    <div className="border-t p-3 bg-white rounded-b-xl shrink-0">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pr-12 h-12 rounded-full bg-gray-100 border-gray-100 focus:border-corex-blue focus:ring-corex-blue"
          placeholder="Ask a question..."
          onKeyDown={handleInputKeyDown}
          disabled={loading}
        />
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || loading} 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-corex-blue text-white hover:bg-corex-blue/90 disabled:bg-gray-300"
          size="icon"
          aria-label="Send message"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
