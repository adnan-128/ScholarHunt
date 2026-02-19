import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { login as loginAction, logout as logoutAction, register as registerAction } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isLoading, error, isAuthenticated } = useSelector((state) => state.auth)

  const login = useCallback(async (credentials) => {
    return dispatch(loginAction(credentials))
  }, [dispatch])

  const register = useCallback(async (userData) => {
    return dispatch(registerAction(userData))
  }, [dispatch])

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [dispatch])

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
