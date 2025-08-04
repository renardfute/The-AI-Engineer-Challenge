# 🧪 **Test Environment Setup**

## 🎯 **Test Environment Overview**

Your AI chat application has multiple test environments available:

### **1. Local Development Environment**
- **Purpose**: Development and testing before deployment
- **Frontend**: Local server (localhost:3000)
- **Backend**: Local FastAPI server (localhost:8000)
- **API Key**: Local environment variable

### **2. Production Environment**
- **Purpose**: Live application for end users
- **Frontend**: Vercel deployment
- **Backend**: Render deployment
- **API Key**: Render environment variable

## 🚀 **Setting Up Local Test Environment**

### **Backend Setup (Local)**
```bash
# Navigate to backend directory
cd api

# Install dependencies
pip install -r requirements.txt

# Set environment variable (Windows PowerShell)
$env:OPENAI_API_KEY="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"

# Start local server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### **Frontend Setup (Local)**
```bash
# Navigate to frontend directory
cd frontend

# Start local server
python -m http.server 3000
# OR if you have Node.js installed:
# npx serve -s . -l 3000
```

### **Test URLs (Local)**
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:3000`
- **Health Check**: `http://localhost:8000/api/health`
- **Chat API**: `http://localhost:8000/api/chat`

## 🧪 **Testing Strategy**

### **1. Unit Tests**
```bash
# Test backend endpoints
curl http://localhost:8000/api/health
curl http://localhost:8000/api/test

# Test chat endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "developer_message": "You are a helpful assistant",
    "user_message": "Hello, test message",
    "model": "gpt-4.1-mini"
  }'
```

### **2. Integration Tests**
- **Frontend → Backend**: Test chat functionality
- **API Key**: Verify environment variable loading
- **Streaming**: Test real-time response streaming
- **CORS**: Test cross-origin requests

### **3. UI Tests**
- **Model Selection**: Test different GPT models
- **System Message**: Test custom AI behavior
- **Auto-save**: Test settings persistence
- **Responsive Design**: Test on different screen sizes

## 🔧 **Environment Variables**

### **Local Development**
```bash
# Windows PowerShell
$env:OPENAI_API_KEY="your-api-key-here"

# Linux/Mac
export OPENAI_API_KEY="your-api-key-here"
```

### **Production (Render)**
- **Key**: `OPENAI_API_KEY`
- **Value**: `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`

## 📊 **Test Environment Comparison**

| Environment | Frontend URL | Backend URL | API Key | Purpose |
|-------------|--------------|-------------|---------|---------|
| **Local** | `http://localhost:3000` | `http://localhost:8000` | Local env var | Development |
| **Production** | Vercel URL | Render URL | Render env var | Live app |

## 🎯 **Quick Test Commands**

### **Backend Health Check**
```bash
# Local
curl http://localhost:8000/api/health

# Production
curl https://ai-chat-backend-3k7m.onrender.com/api/health
```

### **Frontend Test**
```bash
# Local
curl http://localhost:3000

# Production
curl https://the-ai-engineer-challenge-8erdxkibe-renard-futes-projects.vercel.app
```

### **Chat API Test**
```bash
# Local
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"developer_message":"Test","user_message":"Hello","model":"gpt-4.1-mini"}'

# Production
curl -X POST https://ai-chat-backend-3k7m.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"developer_message":"Test","user_message":"Hello","model":"gpt-4.1-mini"}'
```

## 🚀 **Starting Local Test Environment**

### **Option 1: Quick Start**
```bash
# Terminal 1 - Backend
cd api
pip install -r requirements.txt
$env:OPENAI_API_KEY="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"
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
python -m http.server 3000
```

### **Option 2: Production Testing**
- **Frontend**: `https://the-ai-engineer-challenge-8erdxkibe-renard-futes-projects.vercel.app`
- **Backend**: `https://ai-chat-backend-3k7m.onrender.com`

## 🎉 **Test Environment Ready!**

Your AI chat application now has:
- ✅ **Local development** environment
- ✅ **Production** environment
- ✅ **Comprehensive testing** strategy
- ✅ **Environment variable** management
- ✅ **Quick test commands**

Choose your preferred environment and start testing! 🚀 