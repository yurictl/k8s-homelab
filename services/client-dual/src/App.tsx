import { useState } from 'react'
import ServiceHealth from './components/ServiceHealth'
import ApiEndpoints from './components/ApiEndpoints'
import MetricsDashboard from './components/MetricsDashboard'
import ApiConsole from './components/ApiConsole'

function App() {
  const [activeTab, setActiveTab] = useState('health')

  const tabs = [
    { id: 'health', name: 'Service Health', component: <ServiceHealth /> },
    { id: 'endpoints', name: 'API Endpoints', component: <ApiEndpoints /> },
    { id: 'metrics', name: 'Metrics Dashboard', component: <MetricsDashboard /> },
    { id: 'console', name: 'API Console', component: <ApiConsole /> }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Homelab Microservices Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </main>
    </div>
  )
}

export default App 