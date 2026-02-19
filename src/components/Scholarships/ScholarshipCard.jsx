import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { formatDeadline, calculateMatchScore } from '../../utils/formatters'
import { useSelector, useDispatch } from 'react-redux'
import { addSaved, removeSaved, saveScholarship, removeSavedScholarship } from '../../store/slices/savedSlice'
import { Heart, Clock, MapPin, GraduationCap, ExternalLink } from 'lucide-react'
import { useToast } from '../ui/toast'
import { useState } from 'react'
import { cn } from '../../lib/utils'

const ScholarshipCard = ({ scholarship }) => {
  const dispatch = useDispatch()
  const { savedScholarships } = useSelector((state) => state.saved)
  const profile = useSelector((state) => state.profile)
  const { addToast } = useToast()
  
  const [isSaved, setIsSaved] = useState(savedScholarships.some(s => s.id === scholarship.id))
  
  const matchScore = calculateMatchScore(profile, scholarship)
  
  const getScoreColor = (score) => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isSaved) {
      dispatch(removeSaved(scholarship.id))
      dispatch(removeSavedScholarship(scholarship.id))
      addToast({ type: 'success', message: 'Scholarship removed from saved' })
    } else {
      dispatch(addSaved(scholarship))
      dispatch(saveScholarship(scholarship))
      addToast({ type: 'success', message: 'Scholarship saved!' })
    }
    setIsSaved(!isSaved)
  }

  return (
    <Link to={`/scholarships/${scholarship.id}`}>
      <div className="h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                className={cn(
                  "text-white font-medium",
                  getScoreColor(matchScore)
                )}
              >
                {matchScore}% Match
              </Badge>
              <Badge variant="success" className="text-xs">
                {scholarship.fundingType}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {scholarship.title}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="shrink-0"
          >
            <Heart 
              className={cn(
                "h-5 w-5",
                isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
              )} 
            />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {scholarship.university || scholarship.partnerUniversities?.join(', ')}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {scholarship.ieltsRequired === false && (
            <Badge variant="secondary" className="text-xs">
              No IELTS
            </Badge>
          )}
          {scholarship.applicationFee === 0 && (
            <Badge variant="secondary" className="text-xs">
              No Fee
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {scholarship.country}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDeadline(scholarship.deadline)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-primary-500">{scholarship.amount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ScholarshipCard
