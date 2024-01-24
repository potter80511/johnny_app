import { combineReducers } from 'redux';
import toolsReducer, {
  State as ToolsState,
} from 'src/features/weather/reducers/toolsReducer';
import locationsReducer, {
  State as LocationsState,
} from 'src/features/weather/reducers/locationsReducer';

export interface CombinedState {
  tools: ToolsState;
  locations: LocationsState;
}

const combinedReducer = combineReducers({
  tools: toolsReducer,
  locations: locationsReducer,
});

export default combinedReducer;
