import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Products'

export const store = configureStore({
    reducer: {
        product: productReducer
    },
})
