import { useEffect } from 'react'
import { FilterSidebar, ScholarshipList } from '../components/Scholarships'
import { Header } from '../components/Common'
import { useScholarships } from '../hooks/useScholarships'

const SearchPage = () => {
  const { loadScholarships } = useScholarships()

  useEffect(() => {
    loadScholarships()
  }, [loadScholarships])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-custom mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Scholarships
          </h1>
          <p className="text-gray-600">
            Discover fully-funded scholarships for your Master's degree
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <ScholarshipList />
          </main>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
