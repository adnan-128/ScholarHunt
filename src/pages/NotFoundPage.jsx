import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Header } from '../components/Common'
import { FileQuestion, Home } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container-custom mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FileQuestion className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
