from app import app
import json
from mangum import Adapter

# Create a Mangum adapter for AWS Lambda/Vercel
handler = Adapter(app)

# Export the handler for Vercel
__all__ = ["handler"] 