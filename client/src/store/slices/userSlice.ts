import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ isAuth: false }>) => {
      state.isAuthenticated = action.payload.isAuth
    },
  },
})

export const { login } = userSlice.actions
export default userSlice.reducer
