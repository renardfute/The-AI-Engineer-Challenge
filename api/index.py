from app import app
import json

# Simple handler for Vercel
def handler(request, context):
    """Simple handler for Vercel serverless functions"""
    try:
        # For now, return a simple response to test if the handler works
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps({
                "message": "Handler working", 
                "status": "ok",
                "endpoint": "test"
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": str(e), "status": "error"})
        } 