import { configureStore } from '@reduxjs/toolkit'
import mainData from './dataReducer'
import tickersData from './tickersReducer'
import intervalData from './intervalReducer'
import errorData from './errorReducer'

export const store = configureStore({
    reducer: {
        data: mainData,
        tickers: tickersData,
        interval: intervalData,
        error: errorData,
    },
})

