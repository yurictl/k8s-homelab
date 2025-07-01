import { useState, useEffect } from 'react'
import axios from 'axios'

interface HealthStatus {
  service: string
  status: 'healthy' | 'unhealthy' | 'loading' | 'error'
  response?: any
  error?: string
  details?: string
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

const ServiceHealth = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus[]>([
    { service: 'Python Service', status: 'loading' },
    { service: 'Node.js Service', status: 'loading' }
  ])

  const checkHealth = async () => {
    const newStatus = [...healthStatus]

    // Check Python service
    try {
      const pythonUrl = window.ENV?.VITE_PYTHON_SERVICE_URL || 'http://localhost:8080'
      console.log('Checking Python service at:', `${pythonUrl}/api/health`)
      const pythonResponse = await axios.get(`${pythonUrl}/api/health`, { timeout: 5000 })
      newStatus[0] = {
        service: 'Python Service',
        status: 'healthy',
        response: pythonResponse.data
      }
    } catch (error) {
      console.error('Python service error:', error)
      let errorMessage = 'Unknown error'
      let details = ''
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.message
        details = `Status: ${error.response?.status}, URL: ${error.config?.url}`
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      newStatus[0] = {
        service: 'Python Service',
        status: 'error',
        error: errorMessage,
        details
      }
    }

    // Check Node.js service
    try {
      const nodeUrl = window.ENV?.VITE_NODE_SERVICE_URL || 'http://localhost:5000'
      console.log('Checking Node.js service at:', `${nodeUrl}/health`)
      const nodeResponse = await axios.get(`${nodeUrl}/health`, { timeout: 5000 })
      newStatus[1] = {
        service: 'Node.js Service',
        status: 'healthy',
        response: nodeResponse.data
      }
    } catch (error) {
      console.error('Node.js service error:', error)
      let errorMessage = 'Unknown error'
      let details = ''
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.message
        details = `Status: ${error.response?.status}, URL: ${error.config?.url}`
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      newStatus[1] = {
        service: 'Node.js Service',
        status: 'error',
        error: errorMessage,
        details
      }
    }

    setHealthStatus(newStatus)
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'unhealthy':
        return 'bg-red-100 text-red-800'
      case 'loading':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✓'
      case 'unhealthy':
      case 'error':
        return '✗'
      case 'loading':
        return '⟳'
      default:
        return '?'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Service Health Status</h2>
        <button
          onClick={checkHealth}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthStatus.map((service, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">{service.service}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                {getStatusIcon(service.status)} {service.status}
              </span>
            </div>
            
            {service.status === 'loading' && (
              <div className="text-sm text-gray-500">Checking service health...</div>
            )}
            
            {service.status === 'error' && (
              <div className="text-sm text-red-600">
                <strong>Error:</strong> {service.error}
                {service.details && (
                  <div className="mt-1 text-xs text-gray-500">
                    <strong>Details:</strong> {service.details}
                  </div>
                )}
              </div>
            )}
            
            {service.status === 'healthy' && service.response && (
              <div className="text-sm text-gray-600">
                <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(service.response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceHealth 