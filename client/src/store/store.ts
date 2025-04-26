import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import menuReducer from './slices/menuSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
