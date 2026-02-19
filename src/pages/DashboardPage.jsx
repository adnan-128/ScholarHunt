import { Header } from '../components/Common'
import { Dashboard } from '../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container-custom mx-auto px-4 py-8">
        <Dashboard />
      </div>
    </div>
  )
}

export default DashboardPage
