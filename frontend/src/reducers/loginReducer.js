import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: false,
    user: ""
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.login = true
      state.user = action.payload
    },
    logout: (state) => {
      state.login = false
      state.user = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer