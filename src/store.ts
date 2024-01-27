import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import weatherReducer from 'src/features/weather/reducers/combinedReducer';
import metronomeReducer from 'src/features/metronome/reducers';

const appReducer = combineReducers({
  weather: weatherReducer,
  metronome: metronomeReducer,
})

export function makeStore() {
  return configureStore({
    reducer: appReducer,
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
