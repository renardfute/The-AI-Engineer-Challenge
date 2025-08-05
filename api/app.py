# Import required FastAPI components for building the API
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
# Import Pydantic for data validation and settings management
from pydantic import BaseModel
# Import OpenAI client for interacting with OpenAI's API
from openai import OpenAI
import os
from typing import Optional

# Initialize FastAPI application with a title
app = FastAPI(title="OpenAI Chat API")

# Configure CORS (Cross-Origin Resource Sharing) middleware
# This allows the API to be accessed from different domains/origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # Allow all origins for development
        "https://the-ai-engineer-challenge-8erdxkibe-renard-futes-projects.vercel.app",
        "https://the-ai-engineer-challenge-*.vercel.app",  # Allow all Vercel preview URLs
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Local development
    ],
    allow_credentials=True,  # Allows cookies to be included in requests
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicit methods
    allow_headers=["*"],  # Allows all headers in requests
    expose_headers=["*"],  # Expose all headers
)

# Define the data models using Pydantic
class ChatRequest(BaseModel):
    developer_message: str  # Message from the developer/system
    user_message: str      # Message from the user
    model: Optional[str] = "gpt-4.1-mini"  # Optional model selection with default

# Get API key from environment variable
def get_api_key() -> str:
    """Get OpenAI API key from environment variable"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="OpenAI API key not configured. Please set OPENAI_API_KEY environment variable."
        )
    return api_key

# Define the main chat endpoint that handles POST requests
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Get API key from environment
        api_key = get_api_key()
        
        # Initialize OpenAI client with the API key
        client = OpenAI(api_key=api_key)
        
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
        # Check if API key is configured
        api_key = get_api_key()
        # Return masked version for security
        masked_key = api_key[:7] + "..." + api_key[-4:] if len(api_key) > 11 else "***"
        return {
            "status": "ok", 
            "message": "API is running with OpenAI key configured", 
            "api_key_status": "configured",
            "masked_key": masked_key,
            "timestamp": "2024-01-01"
        }
    except HTTPException as e:
        return {"status": "error", "message": str(e.detail)}
    except Exception as e:
        print(f"Health check error: {e}")
        return {"status": "error", "message": str(e)}

# Debug endpoint for troubleshooting
@app.post("/api/debug")
async def debug_endpoint(request: ChatRequest):
    try:
        # Test 1: Check if we can parse the request
        debug_info = {
            "request_received": True,
            "developer_message": request.developer_message[:50] + "..." if len(request.developer_message) > 50 else request.developer_message,
            "user_message": request.user_message,
            "model": request.model
        }
        
        # Test 2: Check environment variable
        try:
            api_key = os.getenv("OPENAI_API_KEY")
            debug_info["api_key_exists"] = api_key is not None
            debug_info["api_key_length"] = len(api_key) if api_key else 0
        except Exception as e:
            debug_info["api_key_error"] = str(e)
            
        # Test 3: Check OpenAI client creation
        try:
            client = OpenAI(api_key=api_key)
            debug_info["openai_client_created"] = True
        except Exception as e:
            debug_info["openai_client_error"] = str(e)
            
        return debug_info
        
    except Exception as e:
        return {"error": str(e), "type": str(type(e))}

# CORS preflight endpoint
@app.options("/api/{path:path}")
async def options_handler(path: str):
    return {"message": "CORS preflight handled"}

# Simple test endpoint
@app.get("/api/test")
async def test_endpoint():
    return {"message": "Test endpoint working"}

# Entry point for running the application directly
if __name__ == "__main__":
    import uvicorn
    # Start the server on all network interfaces (0.0.0.0) on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
