// src/store/slices/menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MenuPayloadI {
  title?: string
  modalType: string // key for registry lookup
  data?: Record<string, any> /* eslint-disable-line @typescript-eslint/no-explicit-any*/
  confirmText?: string // text for confirm button (optional)
  cancelText?: string // text for cancel button (optional)
  onConfirm?: () => any /* eslint-disable-line @typescript-eslint/no-explicit-any*/
  headerDisplay?: boolean
  fullWindow?: boolean
}

interface MenuStateI {
  isOpen: boolean
  categoryOpen: boolean
  payload: MenuPayloadI | null
}

const initialState: MenuStateI = {
  isOpen: false,
  categoryOpen: false,
  payload: null,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu(state, action: PayloadAction<MenuPayloadI>) {
      state.categoryOpen = false
      state.isOpen = true
      state.payload = action.payload
    },
    closeMenu(state) {
      state.isOpen = false
      state.categoryOpen = false
      state.payload = null
    },
    openCategory(state) {
      state.categoryOpen = true
    },
  },
})

export const { openMenu, closeMenu, openCategory } = menuSlice.actions
export default menuSlice.reducer
