import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProtectedRoute } from './components/Auth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfileSetupPage from './pages/ProfileSetupPage'
import SearchPage from './pages/SearchPage'
import ScholarshipDetailPage from './pages/ScholarshipDetailPage'
import SavedPage from './pages/SavedPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import { userService } from './services/userService'
import { setFullProfile } from './store/slices/profileSlice'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const loadProfile = async () => {
      if (isAuthenticated) {
        try {
          const profileData = await userService.getProfile()
          if (profileData && profileData.profile) {
            dispatch(setFullProfile(profileData.profile))
          }
        } catch (error) {
          console.error('Failed to load profile:', error)
        }
      }
    }
    loadProfile()
  }, [isAuthenticated, dispatch])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/scholarships" element={<SearchPage />} />
      <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
