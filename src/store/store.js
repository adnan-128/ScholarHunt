import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import scholarshipsReducer from './slices/scholarshipsSlice'
import filterReducer from './slices/filterSlice'
import savedReducer from './slices/savedSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    scholarships: scholarshipsReducer,
    filter: filterReducer,
    saved: savedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
