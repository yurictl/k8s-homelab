import { useState } from 'react'

interface Endpoint {
  service: string
  method: string
  path: string
  description: string
  example: string
}

const ApiEndpoints = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)

  const pythonUrl = import.meta.env.VITE_PYTHON_SERVICE_URL || 'http://localhost:8080'
  const nodeUrl = import.meta.env.VITE_NODE_SERVICE_URL || 'http://localhost:5000'

  const endpoints: Endpoint[] = [
    // Python service endpoints
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/',
      description: 'Root API endpoint - returns basic service information',
      example: `${pythonUrl}/api/`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/items/{item_id}',
      description: 'Get item by ID - returns item details for the specified ID',
      example: `${pythonUrl}/api/items/123`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/health',
      description: 'Health check endpoint - returns service health status',
      example: `${pythonUrl}/api/health`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/actuator/health',
      description: 'Actuator health endpoint - detailed health information',
      example: `${pythonUrl}/api/actuator/health`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/metrics',
      description: 'Prometheus metrics endpoint - system and application metrics',
      example: `${pythonUrl}/api/metrics`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/info',
      description: 'Service information endpoint - metadata about the service',
      example: `${pythonUrl}/api/info`
    },
    {
      service: 'Python Service',
      method: 'GET',
      path: '/api/env',
      description: 'Environment variables endpoint - filtered environment data',
      example: `${pythonUrl}/api/env`
    },
    // Node.js service endpoints
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/health',
      description: 'Basic health check endpoint',
      example: `${nodeUrl}/health`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/healthdetailed',
      description: 'Detailed health check with more information',
      example: `${nodeUrl}/healthdetailed`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/api',
      description: 'Main API endpoint - returns service information',
      example: `${nodeUrl}/api`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/apihello',
      description: 'Hello endpoint - returns greeting message',
      example: `${nodeUrl}/apihello`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/apienv',
      description: 'Environment variables endpoint',
      example: `${nodeUrl}/apienv`
    },
    {
      service: 'Node.js Service',
      method: 'GET',
      path: '/apigoodbye',
      description: 'Goodbye endpoint - returns farewell message',
      example: `${nodeUrl}/apigoodbye`
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