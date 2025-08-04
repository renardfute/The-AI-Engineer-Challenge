import json

def handler(request, context):
    """Simple test handler"""
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "message": "Test handler working",
            "status": "ok"
        })
    } 