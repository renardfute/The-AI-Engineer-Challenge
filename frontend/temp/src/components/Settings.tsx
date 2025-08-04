'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Eye, EyeOff, Check } from 'lucide-react';

interface SettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  model: string;
  onModelChange: (model: string) => void;
  developerMessage: string;
  onDeveloperMessageChange: (message: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  apiKey,
  onApiKeyChange,
  model,
  onModelChange,
  developerMessage,
  onDeveloperMessageChange,
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const models = [
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center gap-2"
      >
        <SettingsIcon size={16} />
        Settings
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-background-secondary border border-gray-600 rounded-xl p-6 shadow-xl z-50">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Configuration</h3>
          
          <div className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => onApiKeyChange(e.target.value)}
                  placeholder="sk-..."
                  className="input-field w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => onModelChange(e.target.value)}
                className="input-field w-full"
              >
                {models.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Developer Message */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                System Message
              </label>
              <textarea
                value={developerMessage}
                onChange={(e) => onDeveloperMessageChange(e.target.value)}
                placeholder="Enter the system message for the AI..."
                className="input-field w-full resize-none"
                rows={3}
              />
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-text-secondary">
                {apiKey ? 'API Key configured' : 'API Key required'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full mt-4"
          >
            <Check size={16} />
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}; 