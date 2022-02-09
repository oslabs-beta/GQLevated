import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  queries: undefined,
  showDemo: false,
  isError: false,
  errorMsg: '',
  showLoader: false,
  showFlowModal: false,
  flowElements: [],
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
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setShowFlowModal: (state, action) => {
      state.showFlowModal = action.payload;
    },
    setFlowElements: (state, action) => {
      state.flowElements = action.payload;
    },
  },
});

export const { setQueries, showDemo, setIsError, setErrorMsg, setShowLoader, setShowFlowModal, setFlowElements } = demoSlice.actions;

export default demoSlice.reducer;
