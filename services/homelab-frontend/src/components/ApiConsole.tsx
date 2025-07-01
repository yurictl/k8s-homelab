import { useState } from 'react'
import axios from 'axios'

interface ApiRequest {
  method: string
  url: string
  headers: Record<string, string>
  body: string
}

interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  duration: number
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

const ApiConsole = () => {
  const [request, setRequest] = useState<ApiRequest>({
    method: 'GET',
    url: '',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  })
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pythonUrl = window.ENV?.VITE_PYTHON_SERVICE_URL || 'http://localhost:8080'
  const nodeUrl = window.ENV?.VITE_NODE_SERVICE_URL || 'http://localhost:5000'

  const predefinedRequests = [
    {
      name: 'Python Health Check',
      method: 'GET',
      url: `${pythonUrl}/api/health`,
      description: 'Check Python service health'
    },
    {
      name: 'Python Metrics',
      method: 'GET',
      url: `${pythonUrl}/api/metrics`,
      description: 'Get Python service metrics'
    },
    {
      name: 'Python Environment',
      method: 'GET',
      url: `${pythonUrl}/api/env`,
      description: 'Get Python service environment variables'
    },
    {
      name: 'Node.js Health Check',
      method: 'GET',
      url: `${nodeUrl}/health`,
      description: 'Check Node.js service health'
    },
    {
      name: 'Node.js Detailed Health',
      method: 'GET',
      url: `${nodeUrl}/healthdetailed`,
      description: 'Get detailed Node.js service health'
    },
    {
      name: 'Node.js Environment',
      method: 'GET',
      url: `${nodeUrl}/apienv`,
      description: 'Get Node.js service environment variables'
    }
  ]

  const sendRequest = async () => {
    if (!request.url.trim()) {
      setError('URL is required')
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const startTime = Date.now()
      
      const config: any = {
        method: request.method.toLowerCase(),
        url: request.url,
        headers: request.headers,
        timeout: 10000
      }

      if (request.method !== 'GET' && request.body.trim()) {
        try {
          config.data = JSON.parse(request.body)
        } catch {
          config.data = request.body
        }
      }

      const axiosResponse = await axios(config)
      const duration = Date.now() - startTime

      setResponse({
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: axiosResponse.headers as Record<string, string>,
        data: axiosResponse.data,
        duration
      })
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Request failed')
      if (err.response) {
        setResponse({
          status: err.response.status,
          statusText: err.response.statusText,
          headers: err.response.headers as Record<string, string>,
          data: err.response.data,
          duration: 0
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const loadPredefinedRequest = (predefined: any) => {
    setRequest({
      ...request,
      method: predefined.method,
      url: predefined.url
    })
  }

  const addHeader = () => {
    setRequest({
      ...request,
      headers: { ...request.headers, '': '' }
    })
  }

  const updateHeader = (key: string, value: string) => {
    const newHeaders = { ...request.headers }
    if (value === '') {
      delete newHeaders[key]
    } else {
      newHeaders[key] = value
    }
    setRequest({ ...request, headers: newHeaders })
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">API Console</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predefined Requests */}
        <div className="lg:col-span-1">
          <h3 className="text-md font-medium text-gray-900 mb-4">Predefined Requests</h3>
          <div className="space-y-2">
            {predefinedRequests.map((req, index) => (
              <button
                key={index}
                onClick={() => loadPredefinedRequest(req)}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm text-gray-900">{req.name}</div>
                <div className="text-xs text-gray-500 mt-1">{req.description}</div>
                <div className="text-xs font-mono text-gray-400 mt-1">{req.method} {req.url}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-4">Custom Request</h3>
            
            {/* Method and URL */}
            <div className="flex gap-2 mb-4">
              <select
                value={request.method}
                onChange={(e) => setRequest({ ...request, method: e.target.value })}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input
                type="text"
                placeholder="Enter URL..."
                value={request.url}
                onChange={(e) => setRequest({ ...request, url: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
            </div>

            {/* Headers */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Headers</label>
                <button
                  onClick={addHeader}
                  className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add Header
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(request.headers).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Header name"
                      value={key}
                      onChange={(e) => updateHeader(e.target.value, value)}
                      className="flex-1 px-2 py-1 border rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Header value"
                      value={value}
                      onChange={(e) => updateHeader(key, e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Request Body */}
            {request.method !== 'GET' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Body</label>
                <textarea
                  placeholder="Enter JSON body..."
                  value={request.body}
                  onChange={(e) => setRequest({ ...request, body: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md text-sm font-mono"
                />
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={sendRequest}
              disabled={loading}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>

          {/* Response */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800 text-sm">Error: {error}</div>
            </div>
          )}

          {response && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
              <div className="mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  response.status >= 200 && response.status < 300
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {response.status} {response.statusText}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {response.duration}ms
                </span>
              </div>
              <div className="bg-white border rounded p-2 max-h-64 overflow-auto">
                <pre className="text-xs text-gray-800">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApiConsole 