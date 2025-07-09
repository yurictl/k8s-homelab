import os
import logging
import time
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Homelab Python Server",
    description="A FastAPI server for homelab experiments and testing",
    version="1.0.0"
)

# Add CORS middleware for homelab development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for metrics
start_time = time.time()
request_count = 0

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Middleware to track request processing time and count"""
    global request_count
    request_count += 1
    
    start_time_request = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time_request
    
    response.headers["X-Process-Time"] = str(process_time)
    response.headers["X-Request-Count"] = str(request_count)
    
    logger.info(f"Request {request_count}: {request.method} {request.url.path} - {process_time:.3f}s")
    return response

@app.get("/")
def read_root():
    """Root endpoint with basic information"""
    return {
        "message": "Hello from Homelab Python Server!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.get("/ready")
def ready_check():
    """Kubernetes readiness probe endpoint"""
    uptime = time.time() - start_time
    return {
        "status": "ready",
        "uptime_seconds": round(uptime, 2),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    """Get item information with optional query parameter"""
    return {
        "item_id": item_id,
        "query": q,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
def health_check():
    """Standard health check endpoint"""
    uptime = time.time() - start_time
    return {
        "status": "healthy",
        "uptime_seconds": round(uptime, 2),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/actuator/health")
def actuator_health():
    """Spring Boot style health check endpoint"""
    uptime = time.time() - start_time
    return {
        "status": "UP",
        "details": {
            "uptime": f"{uptime:.2f}s",
            "timestamp": datetime.now().isoformat()
        }
    }

@app.get("/metrics")
def get_metrics():
    """Prometheus-style metrics endpoint for monitoring"""
    uptime = time.time() - start_time
    return {
        "uptime_seconds": round(uptime, 2),
        "total_requests": request_count,
        "requests_per_second": round(request_count / uptime, 2) if uptime > 0 else 0,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/env")
def get_environment_variables():
    """Get environment variables (filtered for security)"""
    # Filter out sensitive environment variables
    sensitive_keys = {
        'PASSWORD', 'SECRET', 'KEY', 'TOKEN', 'CREDENTIALS'
    }
    
    env_vars = {}
    for key, value in os.environ.items():
        # Skip sensitive variables
        if any(sensitive in key.upper() for sensitive in sensitive_keys):
            env_vars[key] = "***REDACTED***"
        else:
            env_vars[key] = value
    
    return {
        "environment_variables": env_vars,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/info")
def get_server_info():
    """Get detailed server information"""
    import platform
    import psutil
    
    return {
        "server_info": {
            "python_version": platform.python_version(),
            "platform": platform.platform(),
            "processor": platform.processor(),
            "memory_usage_percent": psutil.virtual_memory().percent,
            "cpu_count": psutil.cpu_count(),
            "cpu_percent": psutil.cpu_percent(interval=1)
        },
        "application_info": {
            "name": "Homelab Python Server",
            "version": "1.0.0",
            "uptime_seconds": round(time.time() - start_time, 2),
            "total_requests": request_count
        },
        "timestamp": datetime.now().isoformat()
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for better error responses"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        access_log=True
    )  