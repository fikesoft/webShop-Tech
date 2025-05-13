// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'guest' | 'user' | 'admin'

interface UserState {
  userId: string
  userRole: UserRole
  isAuth: boolean
}

const initialState: UserState = {
  userId: '',
  userRole: 'guest',
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Logs a user in.
     * Payload: { userId, userRole }
     */
    login: (state, action: PayloadAction<{ userId: string; userRole: UserRole }>) => {
      state.userId = action.payload.userId
      state.userRole = action.payload.userRole
      state.isAuth = true
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
