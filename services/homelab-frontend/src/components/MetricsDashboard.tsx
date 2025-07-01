import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface MetricsData {
  timestamp: string
  cpu_usage: number
  memory_usage: number
  request_count: number
  response_time: number
}

const MetricsDashboard = () => {
  const [metricsData, setMetricsData] = useState<MetricsData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch metrics from both services (commented out for now since we're using mock data)
      // const [pythonMetrics, nodeMetrics] = await Promise.all([
      //   axios.get('http://server-python:8080/api/metrics').catch(() => null),
      //   axios.get('http://server-node:5000/healthdetailed').catch(() => null)
      // ])

      // Generate mock time series data for demonstration
      const now = new Date()
      const mockData: MetricsData[] = Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString(),
        cpu_usage: Math.random() * 100,
        memory_usage: Math.random() * 100,
        request_count: Math.floor(Math.random() * 1000),
        response_time: Math.random() * 500
      }))

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
    </div>
  )
}

export default MetricsDashboard 