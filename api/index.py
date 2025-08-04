from app import app
import asyncio
from mangum import Adapter

# Create a Mangum adapter for AWS Lambda/Vercel
handler = Adapter(app, lifespan="off") 