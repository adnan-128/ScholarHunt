import { useScholarships } from '../../hooks/useScholarships'
import ScholarshipCard from './ScholarshipCard'
import SortOptions from './SortOptions'
import { LoadingSpinner, EmptyState } from '../Common'
import { useFilters } from '../../hooks/useFilters'

const ScholarshipList = () => {
  const { filteredWithScores, isLoading, totalCount } = useScholarships()
  const { filters, updateSortBy, loadScholarships } = useFilters()

  const handleSortChange = (value) => {
    updateSortBy(value)
    loadScholarships()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (filteredWithScores.length === 0) {
    return (
      <EmptyState
        title="No scholarships found"
        description="Try adjusting your filters to see more results"
        actionLabel="Clear Filters"
        onAction={() => window.location.reload()}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredWithScores.length}</span> of{' '}
          <span className="font-medium">{totalCount}</span> scholarships
        </p>
        <SortOptions value={filters.sortBy} onChange={handleSortChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredWithScores.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>
    </div>
  )
}

export default ScholarshipList
