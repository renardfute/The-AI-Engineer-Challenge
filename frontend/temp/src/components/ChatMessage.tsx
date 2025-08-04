import React from 'react';
import { User, Bot } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-primary-accent text-white' 
            : 'bg-background-secondary text-text-primary border border-gray-600'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        {/* Message Bubble */}
        <div className={`message-bubble ${isUser ? 'user-message' : 'ai-message'}`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
          <div className={`text-xs mt-2 opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 