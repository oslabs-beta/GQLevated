import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  queries: {},
};

//REDUCERS
export const configurationSlice = createSlice({
  name: 'configuration',
  initialState: initialStateValue,
  reducers: {
    storeQueries: (state, action) => {
      // console.log("action.payload", action.payload);
      state.userInput = action.payload;
    },
  },
});

export const { storeQueries } = configurationSlice.actions;

export default configurationSlice.reducer;
