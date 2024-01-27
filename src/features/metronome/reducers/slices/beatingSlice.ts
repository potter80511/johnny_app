import { createSlice } from '@reduxjs/toolkit';

export type State = {
  beatNumber: number;
  startStatus: boolean;
  blueLightActive: boolean;
  countingSeconds: number;
};

export const defaultState: State = {
  beatNumber: 0,
  startStatus: false,
  blueLightActive: false,
  countingSeconds: 0,
};

export const { actions, reducer } = createSlice({
  name: 'metronome/beating/',
  initialState: defaultState,
  reducers: {
    beat: (state, action) => {
      return {
        ...state,
        beatNumber: action.payload,
      };
    },
    statusChanged: (state, action) => {
      return {
        ...state,
        startStatus: action.payload,
      };
    },
    setBlueLightActive: (state, action) => {
      return {
        ...state,
        blueLightActive: action.payload,
      };
    },
    countingTime: (state, action) => {
      return {
        ...state,
        countingSeconds: action.payload,
      };
    },
    reset: () => defaultState,
  },
});
