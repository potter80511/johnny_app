import { combineReducers, Reducer } from 'redux';
import {
  State as Setting,
  reducer as settingReducer,
  defaultState as defaultSetting,
} from 'src/features/metronome/reducers/slices/settingSlice';
import {
  State as Beating,
  reducer as beatingReducer,
  defaultState as defaultBeating,
} from 'src/features/metronome/reducers/slices/beatingSlice';

export interface CombinedState {
  setting: Setting;
  beating: Beating;
}

const combinedReducer: Reducer<CombinedState> = combineReducers({
  setting: settingReducer,
  beating: beatingReducer,
});

export const defaultState = {
  setting: defaultSetting,
  beating: defaultBeating,
};

export default combinedReducer
