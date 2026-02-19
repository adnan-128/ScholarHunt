import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { LoadingSpinner } from '../Common'
import { scholarshipService } from '../../services/scholarshipService'
import { Link } from 'react-router-dom'
import { ScholarshipCard } from '../Scholarships'

const MatchedForYou = () => {
  const [scholarships, setScholarships] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await scholarshipService.getMatchedScholarships()
        setScholarships(data)
      } catch (err) {
        setError('Failed to load personalized matches')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (isLoading) return <LoadingSpinner />
  
  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    )
  }

  if (scholarships.length === 0) {
    return (
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">No Matches Found Yet</h3>
          <p className="text-blue-700 mb-6">
            Complete your profile to get personalized scholarship recommendations tailored to your background.
          </p>
          <Link to="/profile-setup">
            <Button>Complete Profile</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Matched For You</h2>
        <Link to="/scholarships?sort=match">
          <Button variant="ghost">View All Matches</Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.slice(0, 3).map(scholarship => (
          <div key={scholarship.id} className="relative">
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className={`${
                scholarship.matchScore >= 85 ? 'bg-green-500' : 
                scholarship.matchScore >= 70 ? 'bg-yellow-500' : 'bg-gray-500'
              } hover:bg-opacity-90`}>
                {scholarship.matchScore}% Match
              </Badge>
            </div>
            <ScholarshipCard scholarship={scholarship} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchedForYou
