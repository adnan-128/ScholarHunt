import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeSaved, removeSavedScholarship, updateStatus } from '../../store/slices/savedSlice'
import { scholarshipService } from '../../services/scholarshipService'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { formatDeadline, calculateMatchScore } from '../../utils/formatters'
import { APPLICATION_STATUS } from '../../utils/constants'
import { Trash2, Heart, ExternalLink } from 'lucide-react'
import { useToast } from '../ui/toast'
import { cn } from '../../lib/utils'

const SavedScholarships = ({ filter = 'all' }) => {
  const dispatch = useDispatch()
  const { savedScholarships, applicationStatus } = useSelector((state) => state.saved)
  const profile = useSelector((state) => state.profile)
  const { addToast } = useToast()

  const filteredScholarships = savedScholarships.filter((scholarship) => {
    if (filter === 'all') return true
    const status = applicationStatus[scholarship.id] || 'saved'
    return status === filter
  })

  const handleStatusChange = async (scholarshipId, status) => {
    dispatch(updateStatus({ scholarshipId, status }))
    try {
      await scholarshipService.updateApplicationStatus(scholarshipId, status)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
    addToast({ type: 'success', message: 'Status updated' })
  }

  const handleRemove = (scholarshipId) => {
    dispatch(removeSaved(scholarshipId))
    dispatch(removeSavedScholarship(scholarshipId))
    addToast({ type: 'success', message: 'Scholarship removed' })
  }

  if (filteredScholarships.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No scholarships found in this category
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredScholarships.map((scholarship) => {
        const status = applicationStatus[scholarship.id] || 'saved'
        const matchScore = calculateMatchScore(profile, scholarship)
        
        return (
          <div
            key={scholarship.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link
                  to={`/scholarships/${scholarship.id}`}
                  className="font-semibold text-gray-900 hover:text-primary-500 line-clamp-1"
                >
                  {scholarship.title}
                </Link>
                <Badge
                  className={cn(
                    "shrink-0 text-white",
                    matchScore >= 70 ? "bg-green-500" : matchScore >= 50 ? "bg-amber-500" : "bg-red-500"
                  )}
                >
                  {matchScore}%
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {scholarship.university} • {scholarship.country}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>Deadline: {formatDeadline(scholarship.deadline)}</span>
                <span>•</span>
                <span>{scholarship.amount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-col sm:items-end">
              <Select
                value={status}
                onValueChange={(value) => handleStatusChange(scholarship.id, value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {APPLICATION_STATUS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-1">
                <Link to={`/scholarships/${scholarship.id}`}>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(scholarship.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SavedScholarships
