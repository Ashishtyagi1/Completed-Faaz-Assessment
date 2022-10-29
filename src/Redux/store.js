import { configureStore } from '@reduxjs/toolkit'
import DataSlice from './Slices/DataSlice'

export const store = configureStore({
  reducer: {
    data : DataSlice
  }
})