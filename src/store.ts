import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import weatherReducer, {
  CombinedState as WeatherState,
} from 'src/features/weather/reducers/combinedReducer';

const appReducer = combineReducers({
  weather: weatherReducer,
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
