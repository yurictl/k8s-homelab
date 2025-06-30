#!/bin/sh

# Default values
PYTHON_SERVICE_URL=${VITE_PYTHON_SERVICE_URL:-http://localhost:8080}
NODE_SERVICE_URL=${VITE_NODE_SERVICE_URL:-http://localhost:5000}
API_TIMEOUT=${VITE_API_TIMEOUT:-10000}
DEV_MODE=${VITE_DEV_MODE:-false}

# Create a temporary file with environment variables
cat > /tmp/env.js << EOF
window.ENV = {
  VITE_PYTHON_SERVICE_URL: '$PYTHON_SERVICE_URL',
  VITE_NODE_SERVICE_URL: '$NODE_SERVICE_URL',
  VITE_API_TIMEOUT: '$API_TIMEOUT',
  VITE_DEV_MODE: '$DEV_MODE'
};
EOF

# Replace environment variables in the built files
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|import.meta.env.VITE_PYTHON_SERVICE_URL|window.ENV.VITE_PYTHON_SERVICE_URL|g" {} \;
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|import.meta.env.VITE_NODE_SERVICE_URL|window.ENV.VITE_NODE_SERVICE_URL|g" {} \;
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|import.meta.env.VITE_API_TIMEOUT|window.ENV.VITE_API_TIMEOUT|g" {} \;
find /usr/share/nginx/html -name "*.js" -type f -exec sed -i "s|import.meta.env.VITE_DEV_MODE|window.ENV.VITE_DEV_MODE|g" {} \;

# Add environment script to index.html
sed -i '/<head>/a \    <script src="/env.js"></script>' /usr/share/nginx/html/index.html

# Start nginx
exec nginx -g "daemon off;" 