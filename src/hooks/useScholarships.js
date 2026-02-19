import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { fetchScholarships, fetchScholarshipById } from '../store/slices/scholarshipsSlice'
import { calculateMatchScore } from '../utils/formatters'

export const useScholarships = () => {
  const dispatch = useDispatch()
  const { filteredScholarships, selectedScholarship, isLoading, error, totalCount, currentPage, pageSize } = 
    useSelector((state) => state.scholarships)
  const filters = useSelector((state) => state.filter)
  const profile = useSelector((state) => state.profile)

  const loadScholarships = useCallback(async (additionalFilters = {}) => {
    const filterParams = {
      countries: filters.selectedCountries.join(','),
      fields: filters.selectedFields.join(','),
      excludeIELTS: filters.excludeIELTS,
      excludeAppFee: filters.excludeAppFee,
      deadline: filters.deadlineFilter,
      sortBy: filters.sortBy,
      gpaMinimum: filters.gpaMinimum,
      page: filters.currentPage,
      limit: filters.pageSize,
      ...additionalFilters,
    }
    return dispatch(fetchScholarships(filterParams))
  }, [dispatch, filters])

  const loadScholarshipById = useCallback(async (id) => {
    return dispatch(fetchScholarshipById(id))
  }, [dispatch])

  const getScholarshipsWithScores = useCallback(() => {
    const scholarshipsWithScores = filteredScholarships.map(scholarship => ({
      ...scholarship,
      matchScore: calculateMatchScore(profile, scholarship),
    }))
    
    const minScore = parseInt(filters.minMatchScore) || 0
    if (minScore > 0) {
      return scholarshipsWithScores.filter(s => s.matchScore >= minScore)
    }
    
    return scholarshipsWithScores
  }, [filteredScholarships, profile, filters.minMatchScore])

  const getSelectedWithScore = useCallback(() => {
    if (!selectedScholarship) return null
    return {
      ...selectedScholarship,
      matchScore: calculateMatchScore(profile, selectedScholarship),
    }
  }, [selectedScholarship, profile])

  return {
    filteredScholarships,
    filteredWithScores: getScholarshipsWithScores(),
    selectedScholarship: getSelectedWithScore(),
    isLoading,
    error,
    totalCount,
    currentPage,
    pageSize,
    loadScholarships,
    loadScholarshipById,
  }
}
