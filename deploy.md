# Vercel Deployment Guide

## Backend Deployment (FastAPI)

### 1. Deploy Backend First
```bash
# Navigate to backend directory
cd api

# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name (e.g., ai-chat-backend)
# - Confirm deployment
```

### 2. Get Backend URL
After deployment, you'll get a URL like:
`https://ai-chat-backend-xxxxx.vercel.app`

### 3. Update Frontend Configuration
Update `frontend/next.config.js` with your backend URL:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://your-backend-url.vercel.app/api/:path*',
    },
  ];
},
```

## Frontend Deployment (Next.js)

### 1. Deploy Frontend
```bash
# Navigate to frontend directory
cd frontend

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set project name (e.g., ai-chat-frontend)
# - Confirm deployment
```

### 2. Environment Variables (Optional)
If needed, set environment variables in Vercel dashboard:
- `OPENAI_API_KEY` (if you want to set a default)

## Alternative: Deploy via GitHub

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure deployment settings:
   - **Backend**: Set root directory to `/api`
   - **Frontend**: Set root directory to `/frontend`

## Post-Deployment

### 1. Test Backend Endpoints
- Health check: `https://your-backend-url.vercel.app/api/health`
- Save API key: `POST https://your-backend-url.vercel.app/api/save-key`
- Get API key status: `GET https://your-backend-url.vercel.app/api/get-key`

### 2. Test Frontend
- Open your frontend URL
- Configure API key in settings
- Test chat functionality

### 3. Update URLs
After deployment, update the frontend URLs in `frontend/index.html`:
```javascript
// Replace with your actual backend URL
const BACKEND_URL = 'https://your-backend-url.vercel.app';
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Backend already has CORS configured
2. **API Key Storage**: File storage works on Vercel
3. **Streaming Issues**: Vercel supports streaming responses
4. **Build Errors**: Check Python/Node.js versions in vercel.json

### Environment Variables:
- Set in Vercel dashboard under Project Settings > Environment Variables
- Available in both development and production

## URLs Structure
- **Backend**: `https://ai-chat-backend-xxxxx.vercel.app`
- **Frontend**: `https://ai-chat-frontend-xxxxx.vercel.app`
- **API Endpoints**: `https://ai-chat-backend-xxxxx.vercel.app/api/*` 