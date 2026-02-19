import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { scholarshipService } from '../../services/scholarshipService'

const initialState = {
  allScholarships: [],
  filteredScholarships: [],
  selectedScholarship: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 50,
}

export const fetchScholarships = createAsyncThunk(
  'scholarships/fetchScholarships',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await scholarshipService.getScholarships(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchScholarshipById = createAsyncThunk(
  'scholarships/fetchScholarshipById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await scholarshipService.getScholarshipById(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const scholarshipsSlice = createSlice({
  name: 'scholarships',
  initialState,
  reducers: {
    setAllScholarships: (state, action) => {
      state.allScholarships = action.payload
    },
    setFilteredScholarships: (state, action) => {
      state.filteredScholarships = action.payload.scholarships || action.payload
      state.totalCount = action.payload.total || action.payload.length
    },
    selectScholarship: (state, action) => {
      state.selectedScholarship = action.payload
    },
    clearSelectedScholarship: (state) => {
      state.selectedScholarship = null
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScholarships.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchScholarships.fulfilled, (state, action) => {
        state.isLoading = false
        state.filteredScholarships = action.payload.scholarships || action.payload
        state.totalCount = action.payload.total || action.payload.length
        state.allScholarships = action.payload.scholarships || action.payload
      })
      .addCase(fetchScholarships.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchScholarshipById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchScholarshipById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedScholarship = action.payload
      })
      .addCase(fetchScholarshipById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { 
  setAllScholarships, 
  setFilteredScholarships, 
  selectScholarship,
  clearSelectedScholarship,
  setLoading,
  setPage,
  clearError 
} = scholarshipsSlice.actions

export default scholarshipsSlice.reducer
