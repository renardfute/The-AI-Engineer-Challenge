import json

# Minimal handler for Vercel - no imports that might fail
def handler(request, context):
    """Minimal handler for Vercel serverless functions"""
    try:
        # Return a simple response without any complex imports
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps({
                "message": "Minimal handler working", 
                "status": "ok",
                "test": True
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