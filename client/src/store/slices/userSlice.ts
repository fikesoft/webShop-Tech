// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'guest' | 'user' | 'admin'

interface UserState {
  userId: string
  userRole: UserRole
  isAuth: boolean
  userName: null | string
}

const initialState: UserState = {
  userId: '',
  userRole: 'guest',
  isAuth: false,
  userName: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Logs a user in.
     * Payload: { userId, userRole }
     */
    login: (state, action: PayloadAction<{ userId: string; userRole: UserRole; userName?: string | null }>) => {
      state.userId = action.payload.userId
      state.userRole = action.payload.userRole
      state.isAuth = true
      state.userName = action.payload.userName ?? null
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

export const { login, logout } = userSlice.actions
export default userSlice.reducer
