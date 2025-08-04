'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { Settings } from './Settings';
import { apiClient } from '@/lib/api';
import { Trash2, Download, Upload } from 'lucide-react';
import { Bot } from 'lucide-react';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4.1-mini');
  const [developerMessage, setDeveloperMessage] = useState(
    'You are a helpful AI assistant. Provide clear, concise, and accurate responses.'
  );
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!apiKey.trim()) {
      setError('Please configure your OpenAI API key in settings.');
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    let aiMessageContent = '';
    const aiMessageId = (Date.now() + 1).toString();
    
    const aiMessage: Message = {
      id: aiMessageId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      const response = await apiClient.sendMessage(
        {
          developer_message: developerMessage,
          user_message: userMessage,
          model,
          api_key: apiKey,
        },
        (chunk) => {
          aiMessageContent += chunk;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: aiMessageContent }
                : msg
            )
          );
        }
      );

      if (response.error) {
        setError(response.error);
        setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
      }
    } catch (err) {
      setError('Failed to send message. Please check your API key and try again.');
      setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const exportChat = () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })));
          setError(null);
        }
      } catch (err) {
        setError('Invalid chat file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Chat Interface</h1>
          <p className="text-text-secondary text-sm">Powered by OpenAI</p>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".json"
            onChange={importChat}
            className="hidden"
            id="import-chat"
          />
          <label
            htmlFor="import-chat"
            className="btn-secondary flex items-center gap-2 cursor-pointer"
          >
            <Upload size={16} />
            Import
          </label>
          
          <button
            onClick={exportChat}
            disabled={messages.length === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={16} />
            Export
          </button>
          
          <button
            onClick={clearChat}
            disabled={messages.length === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 size={16} />
            Clear
          </button>
          
          <Settings
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            model={model}
            onModelChange={setModel}
            developerMessage={developerMessage}
            onDeveloperMessageChange={setDeveloperMessage}
          />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-text-secondary mb-4">
              <Bot size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Welcome to AI Chat
              </h3>
              <p className="text-text-secondary">
                Configure your API key in settings and start chatting!
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-red-300">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="p-4 border-t border-gray-700">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
}; 