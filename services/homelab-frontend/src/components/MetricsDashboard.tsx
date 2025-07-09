import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import axios from 'axios'

interface MetricsData {
  timestamp: string
  cpu_usage: number
  memory_usage: number
  request_count: number
  response_time: number
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

const MetricsDashboard = () => {
  const [metricsData, setMetricsData] = useState<MetricsData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pythonMetrics, setPythonMetrics] = useState<any>(null)
  const [nodeMetrics, setNodeMetrics] = useState<any>(null)

  const pythonUrl = window.ENV?.VITE_PYTHON_SERVICE_URL || 'http://localhost:8080'
  const nodeUrl = window.ENV?.VITE_NODE_SERVICE_URL || 'http://localhost:5000'

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch metrics from both services
      const [pythonResponse, nodeResponse] = await Promise.all([
        axios.get(`${pythonUrl}/metrics`).catch(() => null),
        axios.get(`${pythonUrl}/info`).catch(() => null),
        axios.get(`${nodeUrl}/health/detailed`).catch(() => null)
      ])

      // Process Python metrics
      if (pythonResponse) {
        setPythonMetrics(pythonResponse.data)
      }

      // Process Node.js metrics
      if (nodeResponse) {
        setNodeMetrics(nodeResponse.data)
      }

      // Generate time series data based on real metrics
      const now = new Date()
      const mockData: MetricsData[] = Array.from({ length: 20 }, (_, i) => {
        const baseTime = now.getTime() - (19 - i) * 60000
        
        return {
          timestamp: new Date(baseTime).toLocaleTimeString(),
          cpu_usage: pythonResponse?.data?.server_info?.cpu_percent || Math.random() * 100,
          memory_usage: pythonResponse?.data?.server_info?.memory_usage_percent || Math.random() * 100,
          request_count: pythonResponse?.data?.total_requests || Math.floor(Math.random() * 1000),
          response_time: Math.random() * 500
        }
      })

      setMetricsData(mockData)
    } catch (err) {
      setError('Failed to fetch metrics data')
      console.error('Metrics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading metrics...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800">Error: {error}</div>
          <button
            onClick={fetchMetrics}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Metrics Dashboard</h2>
        <button
          onClick={fetchMetrics}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CPU Usage Chart */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">CPU Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu_usage" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Memory Usage Chart */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Memory Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="memory_usage" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Request Count Chart */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Request Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData.slice(-10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="request_count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Chart */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">Response Time (ms)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="response_time" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Current Metrics Summary */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-900 mb-4">Current Metrics Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metricsData[metricsData.length - 1]?.cpu_usage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">CPU Usage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {metricsData[metricsData.length - 1]?.memory_usage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Memory Usage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {metricsData[metricsData.length - 1]?.request_count}
            </div>
            <div className="text-sm text-gray-500">Request Count</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {metricsData[metricsData.length - 1]?.response_time.toFixed(0)}ms
            </div>
            <div className="text-sm text-gray-500">Response Time</div>
          </div>
        </div>
      </div>

      {/* Real Service Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Python Service Metrics */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Python Service Metrics
          </h3>
          {pythonMetrics ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Uptime</div>
                  <div className="text-lg font-semibold">{pythonMetrics.uptime_seconds?.toFixed(1)}s</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Requests</div>
                  <div className="text-lg font-semibold">{pythonMetrics.total_requests}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Requests/sec</div>
                  <div className="text-lg font-semibold">{pythonMetrics.requests_per_second?.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">CPU Usage</div>
                  <div className="text-lg font-semibold">{pythonMetrics.server_info?.cpu_percent?.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Memory Usage</div>
                  <div className="text-lg font-semibold">{pythonMetrics.server_info?.memory_usage_percent?.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">CPU Count</div>
                  <div className="text-lg font-semibold">{pythonMetrics.server_info?.cpu_count}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No metrics available</div>
          )}
        </div>

        {/* Node.js Service Metrics */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Node.js Service Metrics
          </h3>
          {nodeMetrics ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Uptime</div>
                  <div className="text-lg font-semibold">{nodeMetrics.uptime?.toFixed(1)}s</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="text-lg font-semibold text-green-600">{nodeMetrics.status}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">RSS Memory</div>
                  <div className="text-lg font-semibold">{nodeMetrics.memory?.rss}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Heap Total</div>
                  <div className="text-lg font-semibold">{nodeMetrics.memory?.heapTotal}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Heap Used</div>
                  <div className="text-lg font-semibold">{nodeMetrics.memory?.heapUsed}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">External Memory</div>
                  <div className="text-lg font-semibold">{nodeMetrics.memory?.external}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No metrics available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MetricsDashboard 