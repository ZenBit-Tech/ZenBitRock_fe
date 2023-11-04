import { createSlice } from '@reduxjs/toolkit';
import { CounterReducer, CounterState } from './types';

const initialState: CounterState = {
  value: 0,
};

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterReducer): void => {
      state.value += 1;
    },
    decrement: (state: CounterReducer): void => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counter.actions;

export default counter.reducer;
