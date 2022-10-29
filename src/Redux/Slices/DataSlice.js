import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from '../API'

const initialState = {
  list : [],
  loading : true
}

export const fetchData = createAsyncThunk(
  '',
  async () => {
    const response = await getData()
    return response
  },
)

const DataSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.list = action.payload
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.list = payload
      state.loading = false
    })
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false
    })
  },
})

export const {
  saveData
} = DataSlice.actions

export default DataSlice.reducer
