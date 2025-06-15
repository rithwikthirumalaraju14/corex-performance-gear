
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
        <div className="fixed bottom-4 right-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-sm max-h-[700px] sm:w-96 sm:h-[600px] sm:bottom-6 sm:right-6 z-50 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col animate-scale-in overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-corex-blue via-corex-red to-corex-green p-0.5">
                <div className="w-full h-full bg-white rounded-2xl">
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
            </div>
        </div>
    );
};

export default ChatWindow;
