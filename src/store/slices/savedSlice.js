import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { scholarshipService } from '../../services/scholarshipService'

const loadSavedFromStorage = () => {
  const saved = localStorage.getItem('savedScholarships')
  return saved ? JSON.parse(saved) : []
}

const loadStatusFromStorage = () => {
  const status = localStorage.getItem('applicationStatus')
  return status ? JSON.parse(status) : {}
}

const initialState = {
  savedScholarships: loadSavedFromStorage(),
  favorites: [],
  applicationStatus: loadStatusFromStorage(),
  isLoading: false,
  error: null,
}

export const saveScholarship = createAsyncThunk(
  'saved/saveScholarship',
  async (scholarship, { rejectWithValue }) => {
    try {
      await scholarshipService.saveScholarship(scholarship)
      return scholarship
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeSavedScholarship = createAsyncThunk(
  'saved/removeSavedScholarship',
  async (scholarshipId, { rejectWithValue }) => {
    try {
      await scholarshipService.removeSavedScholarship(scholarshipId)
      return scholarshipId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchSavedScholarships = createAsyncThunk(
  'saved/fetchSavedScholarships',
  async (_, { rejectWithValue }) => {
    try {
      const response = await scholarshipService.getSavedScholarships()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addSaved: (state, action) => {
      if (!state.savedScholarships.find(s => s.id === action.payload.id)) {
        state.savedScholarships.push(action.payload)
        localStorage.setItem('savedScholarships', JSON.stringify(state.savedScholarships))
      }
    },
    removeSaved: (state, action) => {
      state.savedScholarships = state.savedScholarships.filter(s => s.id !== action.payload)
      localStorage.setItem('savedScholarships', JSON.stringify(state.savedScholarships))
    },
    updateStatus: (state, action) => {
      const { scholarshipId, status } = action.payload
      state.applicationStatus[scholarshipId] = status
      localStorage.setItem('applicationStatus', JSON.stringify(state.applicationStatus))
    },
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id)
      } else {
        state.favorites.push(id)
      }
    },
    clearAllSaved: (state) => {
      state.savedScholarships = []
      state.applicationStatus = {}
      localStorage.removeItem('savedScholarships')
      localStorage.removeItem('applicationStatus')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveScholarship.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(saveScholarship.fulfilled, (state, action) => {
        state.isLoading = false
        if (!state.savedScholarships.find(s => s.id === action.payload.id)) {
          state.savedScholarships.push(action.payload)
          localStorage.setItem('savedScholarships', JSON.stringify(state.savedScholarships))
        }
      })
      .addCase(saveScholarship.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(removeSavedScholarship.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeSavedScholarship.fulfilled, (state, action) => {
        state.isLoading = false
        state.savedScholarships = state.savedScholarships.filter(s => s.id !== action.payload)
        delete state.applicationStatus[action.payload]
        localStorage.setItem('savedScholarships', JSON.stringify(state.savedScholarships))
        localStorage.setItem('applicationStatus', JSON.stringify(state.applicationStatus))
      })
      .addCase(removeSavedScholarship.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchSavedScholarships.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchSavedScholarships.fulfilled, (state, action) => {
        state.isLoading = false
        state.savedScholarships = action.payload
        localStorage.setItem('savedScholarships', JSON.stringify(action.payload))
      })
      .addCase(fetchSavedScholarships.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { 
  addSaved, 
  removeSaved, 
  updateStatus, 
  toggleFavorite, 
  clearAllSaved 
} = savedSlice.actions

export default savedSlice.reducer
