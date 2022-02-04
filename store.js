import { configureStore } from '@reduxjs/toolkit';
import demoReducer from './features/demoSlice';

export const store = configureStore({
  reducer: { demo: demoReducer },
});
