import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCountries: [],
  selectedFields: [],
  excludeIELTS: false,
  excludeAppFee: false,
  deadlineFilter: 'all',
  sortBy: 'deadline',
  gpaMinimum: 0,
  pageSize: 50,
  currentPage: 1,
  fundingType: 'all',
  minMatchScore: '0',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.selectedCountries = action.payload
      state.currentPage = 1
    },
    toggleCountry: (state, action) => {
      const country = action.payload
      if (state.selectedCountries.includes(country)) {
        state.selectedCountries = state.selectedCountries.filter(c => c !== country)
      } else {
        state.selectedCountries.push(country)
      }
      state.currentPage = 1
    },
    setFields: (state, action) => {
      state.selectedFields = action.payload
      state.currentPage = 1
    },
    toggleField: (state, action) => {
      const field = action.payload
      if (state.selectedFields.includes(field)) {
        state.selectedFields = state.selectedFields.filter(f => f !== field)
      } else {
        state.selectedFields.push(field)
      }
      state.currentPage = 1
    },
    setExcludeIELTS: (state, action) => {
      state.excludeIELTS = action.payload
      state.currentPage = 1
    },
    setExcludeAppFee: (state, action) => {
      state.excludeAppFee = action.payload
      state.currentPage = 1
    },
    setDeadlineFilter: (state, action) => {
      state.deadlineFilter = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setGpaMinimum: (state, action) => {
      state.gpaMinimum = action.payload
      state.currentPage = 1
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setFundingType: (state, action) => {
      state.fundingType = action.payload
      state.currentPage = 1
    },
    setMinMatchScore: (state, action) => {
      state.minMatchScore = String(action.payload)
      state.currentPage = 1
    },
    resetFilters: () => {
      return { ...initialState }
    },
  },
})

export const {
  setCountries,
  toggleCountry,
  setFields,
  toggleField,
  setExcludeIELTS,
  setExcludeAppFee,
  setDeadlineFilter,
  setSortBy,
  setGpaMinimum,
  setPageSize,
  setCurrentPage,
  setFundingType,
  setMinMatchScore,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
