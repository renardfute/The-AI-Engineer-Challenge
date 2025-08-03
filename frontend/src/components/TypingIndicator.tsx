import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="chat-message flex justify-start mb-4">
      <div className="flex items-start gap-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-background-secondary text-text-primary border border-gray-600">
          <Bot size={16} />
        </div>
        
        {/* Typing Indicator */}
        <div className="message-bubble ai-message">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 