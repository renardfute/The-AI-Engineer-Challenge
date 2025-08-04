from app import app
from mangum import Adapter

# Create a Mangum adapter for AWS Lambda/Vercel
handler = Adapter(app) 