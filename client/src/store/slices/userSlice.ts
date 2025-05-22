// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'guest' | 'user' | 'admin'

interface UserState {
  userId: string
  userRole: UserRole
  isAuth: boolean
  isLoadingData: boolean
  userName: null | string
}

const initialState: UserState = {
  userId: '',
  userRole: 'guest',
  isAuth: false,
  isLoadingData: true,
  userName: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.isLoadingData = true
    },
    fetchUserSuccess(
      state,
      action: PayloadAction<{
        userId: string
        userRole: UserRole
        userName: string | null
      }>
    ) {
      state.userId = action.payload.userId
      state.userRole = action.payload.userRole
      state.userName = action.payload.userName
      state.isAuth = true
      state.isLoadingData = false
    },
    fetchUserFail(state) {
      state.isAuth = false
      state.isLoadingData = false
      state.userName = null
      state.userRole = 'guest'
      state.userId = ''
    },

    /**
     * Logs the user out, resetting to guest state.
     */
    logout: (state) => {
      state.userId = ''
      state.userRole = 'guest'
      state.isAuth = false
    },
  },
})

export const { fetchUserFail, fetchUserStart, fetchUserSuccess, logout } = userSlice.actions
export default userSlice.reducer
