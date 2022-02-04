import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  queries: undefined,
  showDemo: false,
};

//REDUCERS
export const demoSlice = createSlice({
  name: 'demo',
  initialState: initialStateValue,
  reducers: {
    setQueries: (state, action) => {
      // console.log("action.payload", action.payload);
      state.queries = action.payload;
    },
    showDemo: (state, action) => {
      state.showDemo = action.payload;
    },
  },
});

export const { setQueries, showDemo } = demoSlice.actions;

export default demoSlice.reducer;
