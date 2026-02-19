import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Clock, AlertTriangle } from 'lucide-react'

const UpcomingDeadlines = () => {
  const { savedScholarships } = useSelector((state) => state.saved)
  
  const upcomingDeadlines = savedScholarships
    .filter(s => {
      const deadline = new Date(s.deadline)
      const today = new Date()
      const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
      return daysLeft <= 30 && daysLeft >= 0
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5)

  if (upcomingDeadlines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            No upcoming deadlines in the next 30 days
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingDeadlines.map((scholarship) => {
            const daysLeft = Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24))
            const isUrgent = daysLeft <= 7
            
            return (
              <div
                key={scholarship.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/scholarships/${scholarship.id}`}
                    className="font-medium text-gray-900 hover:text-primary-500 line-clamp-1"
                  >
                    {scholarship.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {scholarship.university}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <Badge variant={isUrgent ? 'destructive' : 'warning'}>
                    {isUrgent && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {daysLeft} days
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default UpcomingDeadlines
