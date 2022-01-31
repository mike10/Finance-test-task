import { createSlice } from '@reduxjs/toolkit'

export const intervalData = createSlice({
  name: 'interval',
  initialState: {
    interval: 15
  },
  reducers: {
    setInterval: (state, action) => {
        state.interval = action.payload
    },
    
  }
})

export const { setInterval } = intervalData.actions

export default intervalData.reducer
