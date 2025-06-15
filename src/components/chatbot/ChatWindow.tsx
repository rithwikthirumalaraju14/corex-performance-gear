
import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatWindowProps {
    onClose: () => void;
    messages: { role: "system" | "user" | "assistant"; content: string }[];
    loading: boolean;
    input: string;
    setInput: (value: string) => void;
    sendMessage: () => void;
    handleSample: (question: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const ChatWindow = ({ onClose, messages, loading, input, setInput, sendMessage, handleSample, inputRef }: ChatWindowProps) => {
    return (
        <div className="fixed bottom-4 right-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-sm max-h-[700px] sm:w-96 sm:h-[600px] sm:bottom-8 sm:right-8 z-50 bg-white border rounded-xl shadow-2xl flex flex-col animate-fade-in overflow-hidden">
            <ChatHeader onClose={onClose} />
            <MessageList messages={messages} loading={loading} onSampleClick={handleSample} />
            <ChatInput 
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                loading={loading}
                inputRef={inputRef}
            />
        </div>
    );
};

export default ChatWindow;
