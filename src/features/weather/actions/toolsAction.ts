import { TemperatureType } from 'src/features/weather/enums';
import { ActionType } from 'src/features/weather/reducers/toolsReducer';
import { LocationData } from 'src/features/weather/types';

export const saveSettingsToCookie = () => ({
  type: ActionType.SaveSettingsToCookie,
});

export const initialToolsState = () => ({
  type: ActionType.InitialToolsState,
});

export const switchTemperatureType = (newType: TemperatureType) => ({
  type: ActionType.SwitchTemperatureType,
  temperatureType: newType,
});

export const createNewLocationInputAction = (newLocation: LocationData) => ({
  type: ActionType.CreateNewLocationInput,
  newLocation,
});

export const deleteLocationInputAction = (deleteIndex: number) => ({
  type: ActionType.DeleteLocationInput,
  deleteIndex,
});

export const showCreateLocationItemModal = (show: boolean) => ({
  type: ActionType.ShowCreateLocationItemModal,
  show,
});

export const searchInputChange = (value: string) => ({
  type: ActionType.SearchInputChange,
  value,
});

export const clearLocationsDataAction = () => ({
  type: ActionType.ClearLocationsData,
});
