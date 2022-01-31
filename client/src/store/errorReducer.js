import { createSlice } from '@reduxjs/toolkit'

export const errorData = createSlice({
  name: 'error',
  initialState: {
    message: undefined
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload 
    },
  }
})

export const { setError } = errorData.actions

export default errorData.reducer
