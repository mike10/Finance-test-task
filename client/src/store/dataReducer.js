import { createSlice } from '@reduxjs/toolkit'

export const mainData = createSlice({
  name: 'data',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      console.log(action.payload);
        state.data = action.payload
    },
    
  }
})

export const { setData } = mainData.actions

export default mainData.reducer
