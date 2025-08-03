# AI Chat Frontend

A modern, interactive chat interface built with Next.js and TypeScript that integrates with the FastAPI backend.

## Features

- 🎨 **Modern Dark Theme**: Beautiful dark theme with blue accents
- 💬 **Real-time Chat**: Stream responses from OpenAI API
- ⚙️ **Configurable Settings**: API key, model selection, and system message
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Import/Export**: Save and load chat conversations
- 🎯 **Error Handling**: Comprehensive error handling and user feedback
- ⚡ **Performance**: Optimized with streaming responses

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **FastAPI** - Backend API integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- FastAPI backend running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Configure API Key**: Click the "Settings" button and enter your OpenAI API key
2. **Select Model**: Choose from available OpenAI models (GPT-4.1 Mini, GPT-4, GPT-3.5 Turbo)
3. **Customize System Message**: Set the initial context for the AI assistant
4. **Start Chatting**: Type your message and press Enter or click Send
5. **Export/Import**: Use the Export/Import buttons to save and load conversations

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Main page component
├── components/         # React components
│   ├── Chat.tsx        # Main chat interface
│   ├── ChatInput.tsx   # Message input component
│   ├── ChatMessage.tsx # Individual message display
│   ├── Settings.tsx    # Configuration panel
│   └── TypingIndicator.tsx # Loading animation
└── lib/               # Utility functions
    └── api.ts         # API client for backend communication
```

## API Integration

The frontend communicates with the FastAPI backend through:

- **Health Check**: `GET /api/health`
- **Chat**: `POST /api/chat` with streaming responses

The API client handles:
- Streaming response parsing
- Error handling
- Request formatting
- CORS configuration

## Customization

### Theme Colors

The theme uses a dark blue color scheme defined in `tailwind.config.js`:

- Primary Dark: `#1a1a2e`
- Electric Blue: `#16213e`
- Accent: `#0f3460`

### Adding New Models

To add new OpenAI models, update the `models` array in `Settings.tsx`:

```typescript
const models = [
  { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  // Add your new model here
];
```

## Development

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for better UX

### Testing

The application includes:
- TypeScript type checking
- ESLint for code quality
- Responsive design testing
- Error boundary handling

## Troubleshooting

### Common Issues

1. **API Connection Failed**: Ensure the FastAPI backend is running on port 8000
2. **CORS Errors**: The backend is configured to allow all origins
3. **Streaming Issues**: Check browser compatibility for streaming responses
4. **API Key Errors**: Verify your OpenAI API key is valid and has sufficient credits

### Debug Mode

Enable debug logging by adding to the browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Test on different screen sizes
4. Ensure error handling is comprehensive
5. Update documentation for new features

## License

This project is part of The AI Engineer Challenge.