
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      sendMessage();
    }
  };
  
  return (
    <div className="border-t p-3 bg-white">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          placeholder="Ask anything..."
          onKeyDown={handleInputKeyDown}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={!input.trim() || loading} className="bg-corex-blue text-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
