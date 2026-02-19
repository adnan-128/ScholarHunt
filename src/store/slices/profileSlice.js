import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../../services/userService'

const loadProfileFromStorage = () => {
  try {
    const saved = localStorage.getItem('profile')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Error loading profile from storage:', e)
  }
  return null
}

const savedProfile = loadProfileFromStorage()

const initialState = {
  profile: savedProfile,
  education: savedProfile?.education || [],
  experience: savedProfile?.experience || [],
  skills: savedProfile?.skills || [],
  targetCountries: savedProfile?.targetCountries || [],
  fieldOfStudy: savedProfile?.fieldOfStudy || [],
  gpa: savedProfile?.gpa || 0,
  englishLevel: savedProfile?.englishLevel || 'intermediate',
  isLoading: false,
  error: null,
}

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(profileData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setEducation: (state, action) => {
      state.education = action.payload
      saveToStorage(state)
    },
    setExperience: (state, action) => {
      state.experience = action.payload
      saveToStorage(state)
    },
    setSkills: (state, action) => {
      state.skills = action.payload
      saveToStorage(state)
    },
    setPreferences: (state, action) => {
      state.targetCountries = action.payload.countries || []
      state.fieldOfStudy = action.payload.fields || []
      saveToStorage(state)
    },
    setGPA: (state, action) => {
      state.gpa = action.payload
      saveToStorage(state)
    },
    setEnglishLevel: (state, action) => {
      state.englishLevel = action.payload
      saveToStorage(state)
    },
    setFullProfile: (state, action) => {
      const profile = action.payload
      state.profile = profile
      state.education = profile.education || []
      state.experience = profile.experience || []
      state.skills = profile.skills || []
      state.targetCountries = profile.targetCountries || []
      state.fieldOfStudy = profile.fieldOfStudy || []
      state.gpa = profile.gpa || 0
      state.englishLevel = profile.englishLevel || 'intermediate'
      saveToStorage(state)
    },
    clearProfile: (state) => {
      state.profile = null
      state.education = []
      state.experience = []
      state.skills = []
      state.targetCountries = []
      state.fieldOfStudy = []
      state.gpa = 0
      state.englishLevel = 'intermediate'
      localStorage.removeItem('profile')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
        saveToStorage(state)
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

function saveToStorage(state) {
  const data = {
    education: state.education,
    experience: state.experience,
    skills: state.skills,
    targetCountries: state.targetCountries,
    fieldOfStudy: state.fieldOfStudy,
    gpa: state.gpa,
    englishLevel: state.englishLevel,
  }
  localStorage.setItem('profile', JSON.stringify(data))
}

export const { 
  setEducation, 
  setExperience, 
  setSkills, 
  setPreferences, 
  setGPA, 
  setEnglishLevel,
  setFullProfile,
  clearProfile 
} = profileSlice.actions

export default profileSlice.reducer
