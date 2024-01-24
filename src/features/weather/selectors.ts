import { AppState } from 'src/store';

// locations
export const translateYSelector = (store: AppState) =>
  store.weather.locations.translateY;

export const openedLocationIndexSelector = (store: AppState) =>
  store.weather.locations.openedLocationIndex;

export const weekTemperatureArraySelector = (store: AppState) =>
  store.weather.locations.weekTemperatureArray;

// tools
export const temperatureTypeSelector = (store: AppState) =>
  store.weather.tools.temperatureType;

export const locationItemInputDataArraySelector = (store: AppState) =>
  store.weather.tools.locationItemInputDataArray;

export const locationsDataSelector = (store: AppState) => {
  const loading =
    store.weather.tools.locationsData.length !==
    store.weather.tools.locationItemInputDataArray.length;
  const data = store.weather.tools.locationsData;

  const newData = data.map((item, index) => {
    const newItem = data.find(correctItem => correctItem.inputIndex === index);
    return newItem || {};
  });
  return loading ? [] : newData;
};

export const showCreateLocationItemModalSelector = (store: AppState) =>
  store.weather.tools.showCreateLocationItemModal;

export const locationOptionsSelector = (store: AppState) =>
  store.weather.tools.locationOptions;

export const searchValueSelector = (store: AppState) =>
  store.weather.tools.searchValue;
