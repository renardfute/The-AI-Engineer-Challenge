# Import required FastAPI components for building the API
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
# Import Pydantic for data validation and settings management
from pydantic import BaseModel
# Import OpenAI client for interacting with OpenAI's API
from openai import OpenAI
import os
import json
from typing import Optional

# Initialize FastAPI application with a title
app = FastAPI(title="OpenAI Chat API")

# Configure CORS (Cross-Origin Resource Sharing) middleware
# This allows the API to be accessed from different domains/origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin
    allow_credentials=True,  # Allows cookies to be included in requests
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers in requests
)

# Define the data models using Pydantic
class ChatRequest(BaseModel):
    developer_message: str  # Message from the developer/system
    user_message: str      # Message from the user
    model: Optional[str] = "gpt-4.1-mini"  # Optional model selection with default

class ApiKeyRequest(BaseModel):
    api_key: str  # OpenAI API key for storage

# In-memory storage for API key (for serverless compatibility)
_stored_api_key = None

# Helper functions for API key storage
def save_api_key(api_key: str):
    """Save API key to memory (temporary for serverless)"""
    global _stored_api_key
    try:
        _stored_api_key = api_key
        return True
    except Exception as e:
        print(f"Error saving API key: {e}")
        return False

def get_stored_api_key() -> Optional[str]:
    """Retrieve stored API key from memory"""
    global _stored_api_key
    try:
        # First try memory storage
        if _stored_api_key:
            return _stored_api_key
        
        # Fallback to environment variable
        env_key = os.getenv("OPENAI_API_KEY")
        if env_key:
            return env_key
            
        return None
    except Exception as e:
        print(f"Error reading API key: {e}")
        return None

# Define the main chat endpoint that handles POST requests
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Get stored API key
        stored_api_key = get_stored_api_key()
        if not stored_api_key:
            raise HTTPException(status_code=400, detail="No API key stored. Please save an API key first.")
        
        # Initialize OpenAI client with the stored API key
        client = OpenAI(api_key=stored_api_key)
        
        # Create a streaming chat completion request
        stream = client.chat.completions.create(
            model=request.model,
            messages=[
                {"role": "developer", "content": request.developer_message},
                {"role": "user", "content": request.user_message}
            ],
            stream=True  # Enable streaming response
        )
        
        # Create an async generator function for streaming responses
        async def generate():
            try:
                # Yield each chunk of the response as it becomes available
                for chunk in stream:
                    if chunk.choices[0].delta.content is not None:
                        yield chunk.choices[0].delta.content
            except Exception as e:
                print(f"Error in streaming: {e}")
                yield f"Error: {str(e)}"

        # Return a streaming response to the client
        return StreamingResponse(generate(), media_type="text/plain")
    
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Handle any other errors that occur during processing
        print(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Define a health check endpoint to verify API status
@app.get("/api/health")
async def health_check():
    try:
        return {"status": "ok", "message": "API is running", "timestamp": "2024-01-01"}
    except Exception as e:
        print(f"Health check error: {e}")
        return {"status": "error", "message": str(e)}

# Simple test endpoint
@app.get("/api/test")
async def test_endpoint():
    return {"message": "Test endpoint working"}

# Endpoint to save API key
@app.post("/api/save-key")
async def save_key(request: ApiKeyRequest):
    try:
        if save_api_key(request.api_key):
            return {"status": "success", "message": "API key saved successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save API key")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to get stored API key status
@app.get("/api/get-key")
async def get_key():
    try:
        stored_key = get_stored_api_key()
        if stored_key:
            # Return masked version for security (first 7 chars + ...)
            masked_key = stored_key[:7] + "..." + stored_key[-4:] if len(stored_key) > 11 else "***"
            return {"status": "success", "has_key": True, "masked_key": masked_key}
        else:
            return {"status": "success", "has_key": False, "masked_key": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Entry point for running the application directly
if __name__ == "__main__":
    import uvicorn
    # Start the server on all network interfaces (0.0.0.0) on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
