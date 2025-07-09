import { useState } from 'react'

interface Endpoint {
  service: string
  method: string
  path: string
  description: string
  example: string
}

// @ts-ignore
// eslint-disable-next-line
declare global {
  interface Window {
    ENV?: {
      VITE_PYTHON_SERVICE_URL?: string;
      VITE_NODE_SERVICE_URL?: string;
      VITE_API_TIMEOUT?: string;
      VITE_DEV_MODE?: string;
    };
  }
}

const ApiEndpoints = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)

  const pythonUrl = window.ENV?.VITE_PYTHON_SERVICE_URL || 'http://localhost:8080'
  const nodeUrl = window.ENV?.VITE_NODE_SERVICE_URL || 'http://localhost:5000'

  const endpoints: Endpoint[] = [
    // Python service endpoints
    {
      service: 'Python Service',
      method: 'GET',
      path: '/',
      description: 'Server info and version',
      example: `${pythonUrl}/`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/health',
      description: 'Health check endpoint',
      example: `${pythonUrl}/health`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/ready',
      description: 'Kubernetes readiness probe',
      example: `${pythonUrl}/ready`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/metrics',
      description: 'Prometheus-style metrics',
      example: `${pythonUrl}/metrics`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/info',
      description: 'System information and resource usage',
      example: `${pythonUrl}/info`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/env',
      description: 'Environment variables (filtered)',
      example: `${pythonUrl}/env`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/actuator/health',
      description: 'Spring Boot style health check',
      example: `${pythonUrl}/actuator/health`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/items/{item_id}',
      description: 'Data endpoint with optional query parameter',
      example: `${pythonUrl}/items/123`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/docs',
      description: 'Interactive API documentation',
      example: `${pythonUrl}/docs`
    },
    // Node.js service endpoints
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/',
      description: 'Service status and available endpoints',
      example: `${nodeUrl}/`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/health',
      description: 'Basic health check',
      example: `${nodeUrl}/health`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/health/detailed',
      description: 'Memory usage and detailed status',
      example: `${nodeUrl}/health/detailed`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/ready',
      description: 'Readiness check for Kubernetes',
      example: `${nodeUrl}/ready`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/hello',
      description: 'Hello endpoint with custom header',
      example: `${nodeUrl}/hello`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/env',
      description: 'Filtered environment variables',
      example: `${nodeUrl}/env`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/goodbye',
      description: 'Goodbye endpoint',
      example: `${nodeUrl}/goodbye`
    }
  ]

  const pythonEndpoints = endpoints.filter(ep => ep.service === 'Python Service')
  const nodeEndpoints = endpoints.filter(ep => ep.service === 'Node.js Service')

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">API Endpoints</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Python Service Endpoints */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Python Service ({pythonUrl})
          </h3>
          <div className="space-y-3">
            {pythonEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="text-sm font-mono text-gray-600">{endpoint.path}</span>
                </div>
                <p className="text-sm text-gray-600">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Node.js Service Endpoints */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Node.js Service ({nodeUrl})
          </h3>
          <div className="space-y-3">
            {nodeEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="text-sm font-mono text-gray-600">{endpoint.path}</span>
                </div>
                <p className="text-sm text-gray-600">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Endpoint Details */}
      {selectedEndpoint && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Endpoint Details</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Service</h4>
                <p className="text-sm text-gray-900">{selectedEndpoint.service}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Method</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedEndpoint.method}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Path</h4>
                <p className="text-sm font-mono text-gray-900">{selectedEndpoint.path}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-900">{selectedEndpoint.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Example URL</h4>
              <code className="text-sm bg-white p-2 rounded border block overflow-x-auto">
                {selectedEndpoint.example}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiEndpoints 