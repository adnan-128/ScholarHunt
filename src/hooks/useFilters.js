import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  setCountries,
  toggleCountry,
  setFields,
  toggleField,
  setExcludeIELTS,
  setExcludeAppFee,
  setDeadlineFilter,
  setSortBy,
  setGpaMinimum,
  setFundingType,
  setMinMatchScore,
  resetFilters,
} from '../store/slices/filterSlice'

export const useFilters = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filter)

  const updateCountries = useCallback((countries) => {
    dispatch(setCountries(countries))
  }, [dispatch])

  const toggleCountryFilter = useCallback((country) => {
    dispatch(toggleCountry(country))
  }, [dispatch])

  const updateFields = useCallback((fields) => {
    dispatch(setFields(fields))
  }, [dispatch])

  const toggleFieldFilter = useCallback((field) => {
    dispatch(toggleField(field))
  }, [dispatch])

  const updateExcludeIELTS = useCallback((value) => {
    dispatch(setExcludeIELTS(value))
  }, [dispatch])

  const updateExcludeAppFee = useCallback((value) => {
    dispatch(setExcludeAppFee(value))
  }, [dispatch])

  const updateDeadline = useCallback((value) => {
    dispatch(setDeadlineFilter(value))
  }, [dispatch])

  const updateSortBy = useCallback((value) => {
    dispatch(setSortBy(value))
  }, [dispatch])

  const updateGpaMinimum = useCallback((value) => {
    dispatch(setGpaMinimum(value))
  }, [dispatch])

  const updateFundingType = useCallback((value) => {
    dispatch(setFundingType(value))
  }, [dispatch])

  const updateMinMatchScore = useCallback((value) => {
    dispatch(setMinMatchScore(String(value)))
  }, [dispatch])

  const clearAllFilters = useCallback(() => {
    dispatch(resetFilters())
  }, [dispatch])

  return {
    filters,
    updateCountries,
    toggleCountryFilter,
    updateFields,
    toggleFieldFilter,
    updateExcludeIELTS,
    updateExcludeAppFee,
    updateDeadline,
    updateSortBy,
    updateGpaMinimum,
    updateFundingType,
    updateMinMatchScore,
    clearAllFilters,
  }
}
