import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppState } from 'src/store'
import { LocationValue } from '../types';
import { TaiwanCities, WeatherLocationType } from 'src/features/weather/enums';
import currentDayCitiesSeriesNumberData from 'src/features/weather/data/allCitiesSeriesNumberData';
import { CurrentDayDetails } from 'src/features/weather/types/Weather';
import { ActionType as ToolsActionType } from 'src/features/weather/reducers/toolsReducer';
import { LocationWeatherDataFactory } from 'src/features/weather/factories/LocationWeatherDataFactory';

const getCurrentDayWeatherSuccess = (
  currentDayDetails: CurrentDayDetails,
  inputIndex: number,
) => ({
  type: ToolsActionType.CurrentDayWeatherLoaded,
  data: currentDayDetails,
  inputIndex,
});

export const getCurrentDayWeather = createAsyncThunk(
  'weather/getCurrentDayWeather',
  async (
    {
      locationType,
      city,
      inputIndex,
      locationName
    }: {
      locationName: LocationValue;
      locationType: WeatherLocationType;
      inputIndex: number;
      city: TaiwanCities;
    },
    { dispatch }
  ) => {
    try {
      const seriesNumber =
      locationType === WeatherLocationType.Location
        ? currentDayCitiesSeriesNumberData.find(item => item.name === city)?.seriesNumber
        : 'F-D0047-089';

      const response = await fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${seriesNumber}?Authorization=CWB-FA978B40-46C9-479E-8875-9902059B75D0&locationName=${locationName}`)

      const showCity = locationType === WeatherLocationType.Location;

      const rawData = await response.json()

      const currentDayDetails = LocationWeatherDataFactory.createCurrentDayDataFromNet(
        rawData.records.locations[0].location[0],
        city,
        showCity,
      );

      if (!response.ok) {
        throw new Error()
      }

      dispatch(
        getCurrentDayWeatherSuccess(
          {
            ...currentDayDetails,
            inputIndex,
            locationType,
            city
          },
          inputIndex
        )
      );
    } catch (error) {
      console.log(error)
      console.log('getCurrentDayWeather error')
    }
  }
)
