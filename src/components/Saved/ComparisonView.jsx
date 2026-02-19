import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDeadline } from '../../utils/formatters'
import { X, ExternalLink } from 'lucide-react'

const ComparisonView = ({ scholarships, onClose }) => {
  if (!scholarships || scholarships.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Compare Scholarships</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {scholarship.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {scholarship.university}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Country:</span>
                    <span className="font-medium">{scholarship.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">{scholarship.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Deadline:</span>
                    <span className="font-medium">{formatDeadline(scholarship.deadline)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">IELTS:</span>
                    <span className={scholarship.ieltsRequired ? 'text-red-500' : 'text-green-500'}>
                      {scholarship.ieltsRequired ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">App Fee:</span>
                    <span className="font-medium">
                      {scholarship.applicationFee === 0 ? 'Free' : `$${scholarship.applicationFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Min GPA:</span>
                    <span className="font-medium">{scholarship.minGPA}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {scholarship.fieldOfStudy?.slice(0, 2).map((field) => (
                    <Badge key={field} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>

                <Link to={`/scholarships/${scholarship.id}`} className="mt-4 block">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComparisonView
