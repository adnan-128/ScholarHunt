import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Header } from '../components/Common'
import { useAuth } from '../hooks/useAuth'
import { GraduationCap, Globe, Award, Search, Users, ArrowRight } from 'lucide-react'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Filter scholarships by country, field, funding type, and more.',
    },
    {
      icon: Award,
      title: 'Fully Funded',
      description: 'Find fully-funded scholarships that cover tuition and living expenses.',
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Access scholarships from top universities around the world.',
    },
  ]

  const stats = [
    { value: '500+', label: 'Scholarships' },
    { value: '50+', label: 'Countries' },
    { value: '10K+', label: 'Students' },
    { value: '95%', label: 'Success Rate' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
          <div className="container-custom mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Find Your Perfect
                <span className="text-primary-500"> Fully-Funded </span>
                Master's Scholarship
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover scholarships for international students pursuing Master's degrees in Computer Science, Engineering, Data Science, and related fields.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/scholarships">
                  <Button size="lg" className="w-full sm:w-auto">
                    Search Scholarships
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary-500">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose ScholarHunter?
              </h2>
              <p className="mt-4 text-gray-600">
                We help international students find the best scholarship opportunities
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary-500">
          <div className="container-custom mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Your Scholarship?
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their dream scholarships through our platform.
            </p>
            <Link to="/scholarships">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Searching Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">ScholarHunter</span>
            </div>
            <p className="text-gray-400 text-sm">
              2026 ScholarHunter. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
