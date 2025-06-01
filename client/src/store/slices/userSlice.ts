// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'guest' | 'user' | 'admin'

interface UserState {
  userId: string
  userRole: UserRole
  isAuth: boolean
  isLoadingData: boolean
  userName: null | string
  userPhone: null | string
  userEmail: null | string
  userBirthDate: null | string
}

const initialState: UserState = {
  userId: '',
  userRole: 'guest',
  isAuth: false,
  isLoadingData: true,
  userName: null,
  userPhone: null,
  userEmail: null,
  userBirthDate: null,
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
        userEmail: string | null
        userPhone: string | null
        userBirthDate: string | null
      }>
    ) {
      state.userId = action.payload.userId
      state.userRole = action.payload.userRole
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
      state.userPhone = action.payload.userPhone
      state.userBirthDate = action.payload.userBirthDate
      state.isAuth = true
      state.isLoadingData = false
    },
    fetchUserFail(state) {
      state.userId = ''
      state.userRole = 'guest'
      state.userName = null
      state.userEmail = null
      state.userPhone = null
      state.userBirthDate = null
      state.isAuth = false
      state.isLoadingData = false
    },

    /**
     * Logs the user out, resetting to guest state.
     */

    logout(state) {
      state.userId = ''
      state.userRole = 'guest'
      state.userName = null
      state.userEmail = null
      state.userPhone = null
      state.userBirthDate = null
      state.isAuth = false
    },
  },
})

export const { fetchUserFail, fetchUserStart, fetchUserSuccess, logout } = userSlice.actions
export default userSlice.reducer
