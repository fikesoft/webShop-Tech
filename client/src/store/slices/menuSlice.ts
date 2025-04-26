import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  menuOpen: false,
  menuOpenLogin: false,
}
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
    toggleMenuLogin: (state) => {
      state.menuOpenLogin = !state.menuOpenLogin
    },
  },
})

export const { toggleMenu, toggleMenuLogin } = menuSlice.actions
export default menuSlice.reducer
