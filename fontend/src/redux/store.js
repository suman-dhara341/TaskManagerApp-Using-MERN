import { configureStore } from '@reduxjs/toolkit'
import Token from './counterSlice'

export const store = configureStore({
    reducer: {
        Token: Token,
    },
})