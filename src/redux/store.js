import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../redux/reducers/tracksSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
  },
});