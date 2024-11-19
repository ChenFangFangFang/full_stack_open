import { createSlice } from '@reduxjs/toolkit';
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload; // Update the filter text
    }
  }
})

  export const { setFilter } = filterSlice.actions; // Export the action creator
export default filterSlice.reducer; // Export the reducer