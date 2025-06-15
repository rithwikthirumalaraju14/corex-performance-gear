
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
        <div className="fixed bottom-4 right-4 w-80 max-w-full z-50 bg-white border rounded-xl shadow-2xl flex flex-col h-[480px] animate-fade-in">
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
