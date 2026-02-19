import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSavedScholarships } from '../store/slices/savedSlice'
import { Header, EmptyState } from '../components/Common'
import { SavedScholarships, ComparisonView } from '../components/Saved'
import { Button } from '../components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Card, CardContent } from '../components/ui/card'
import { APPLICATION_STATUS } from '../utils/constants'
import { GitCompare } from 'lucide-react'

const SavedPage = () => {
  const dispatch = useDispatch()
  const { savedScholarships, applicationStatus } = useSelector((state) => state.saved)
  const [selectedForComparison, setSelectedForComparison] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    dispatch(fetchSavedScholarships())
  }, [dispatch])

  const statusCounts = {
    all: savedScholarships.length,
    saved: savedScholarships.filter(s => (applicationStatus[s.id] || 'saved') === 'saved').length,
    applied: savedScholarships.filter(s => applicationStatus[s.id] === 'applied').length,
    accepted: savedScholarships.filter(s => applicationStatus[s.id] === 'accepted').length,
    rejected: savedScholarships.filter(s => applicationStatus[s.id] === 'rejected').length,
  }

  // Placeholder functions for future comparison feature
  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      setShowComparison(true)
    }
  }

  const toggleForComparison = (id) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter(i => i !== id))
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, id])
    }
  }

  // To avoid unused vars warning until implemented
  console.log(handleCompare, toggleForComparison, showComparison)

  if (savedScholarships.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-custom mx-auto px-4 py-8">
          <EmptyState
            title="No saved scholarships"
            description="Start exploring scholarships and save your favorites"
            actionLabel="Search Scholarships"
            onAction={() => window.location.href = '/scholarships'}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-custom mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Scholarships</h1>
            <p className="text-gray-600">{savedScholarships.length} scholarships saved</p>
          </div>
          {selectedForComparison.length >= 2 && (
            <Button onClick={() => setShowComparison(true)}>
              <GitCompare className="h-4 w-4 mr-2" />
              Compare ({selectedForComparison.length})
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary-500">{statusCounts.all}</div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-amber-500">{statusCounts.applied}</div>
              <div className="text-sm text-gray-600">Applied</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">{statusCounts.accepted}</div>
              <div className="text-sm text-gray-600">Accepted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-500">{statusCounts.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
            <TabsTrigger value="saved">Saved ({statusCounts.saved})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({statusCounts.applied})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({statusCounts.accepted})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <SavedScholarships filter="all" />
          </TabsContent>
          <TabsContent value="saved">
            <SavedScholarships filter="saved" />
          </TabsContent>
          <TabsContent value="applied">
            <SavedScholarships filter="applied" />
          </TabsContent>
          <TabsContent value="accepted">
            <SavedScholarships filter="accepted" />
          </TabsContent>
          <TabsContent value="rejected">
            <SavedScholarships filter="rejected" />
          </TabsContent>
        </Tabs>

        {showComparison && (
          <ComparisonView
            scholarships={savedScholarships.filter(s => selectedForComparison.includes(s.id))}
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>
    </div>
  )
}

export default SavedPage
