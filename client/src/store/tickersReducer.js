import { createSlice } from '@reduxjs/toolkit'

export const tickersData = createSlice({
  name: 'tickers',
  initialState: {},
  reducers: {
    setTickers: (state, action) => {
      const ticks = action.payload
      const result = {}
      ticks.forEach((el)=>{
        result[el] = false
      })
      return result   
    },
    setValue: (state, action) => {
      if(state[action.payload]){
        state[action.payload] = false
      } else {
        state[action.payload] = true
      }
    }
    
  }
})

export const { setTickers, setValue } = tickersData.actions

export default tickersData.reducer
