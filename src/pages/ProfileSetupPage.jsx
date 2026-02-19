import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, LoadingSpinner } from '../components/Common'
import { ResumeUploadWizard, ManualProfileForm } from '../components/Profile'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Upload, FileText } from 'lucide-react'

const ProfileSetupPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upload')

  const handleProfileComplete = () => {
    setTimeout(() => {
      navigate('/scholarships')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-custom mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Set Up Your Profile
            </h1>
            <p className="text-gray-600">
              Create your profile to get personalized scholarship recommendations
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <FileText className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>
                    Upload your PDF resume and we'll automatically extract your information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResumeUploadWizard onComplete={handleProfileComplete} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Details</CardTitle>
                  <CardDescription>
                    Fill out your profile information step by step
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ManualProfileForm onComplete={handleProfileComplete} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetupPage
