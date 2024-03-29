import {
  WXType,
  CurrentDayDetails,
  TodayEveryHour,
  OthersData,
} from 'src/features/weather/types/Weather';
import { ElementName } from 'src/features/weather/types/WeatherElement';
import { WeatherElementItem } from 'src/features/weather/types/WeatherElementForLocation';
import { WeatherDataFactory } from 'src/features/weather/factories/WeatherDataFactory';
import dayjs from 'dayjs';
import { FindExtremeNumber, WeatherHelper } from 'src/features/weather/helper';
import { TaiwanCities } from 'src/features/weather/enums';

interface CurrentWx {
  wX: WXType;
  currentTime: string;
}

export class LocationWeatherDataFactory {
  static createCurrentDayDataFromNet(
    data: any,
    city: TaiwanCities,
    showCity: boolean,
  ): Omit<CurrentDayDetails, 'locationType' | 'city' | 'inputIndex'> {
    const { locationName, weatherElement } = data;
    // console.log(city)

    const newLocationName =
      locationName.search('臺') !== -1
        ? locationName.replace('臺', '台')
        : locationName;
    const newCityName =
      city.search('臺') !== -1 ? city.replace('臺', '台') : city;

    const { wX } = this.getCurrentWx(weatherElement);
    const nowIsNight = WeatherHelper.isNight(
      this.getCurrentWx(weatherElement).currentTime,
    );

    const currentTemperature = this.getLocationT(weatherElement);
    const minT = this.getExtremeT(weatherElement, ElementName.MinT);
    const maxT = this.getExtremeT(weatherElement, ElementName.MaxT);
    const todayEveryHourArray = this.createLocationTodayEveryHourArray(
      weatherElement,
    );
    const othersDataArray = this.createOthersDataArray(weatherElement);
    const weatherBackgroundImage = WeatherDataFactory.createBackground(
      wX,
      nowIsNight,
    );

    return {
      locationName: newLocationName,
      cityName: showCity ? newCityName : '',
      wX,
      currentTemperature,
      minT,
      maxT,
      todayEveryHourArray,
      othersDataArray,
      weatherBackgroundImage,
    };
  }

  static getCurrentWx(weatherElement: WeatherElementItem[]): CurrentWx {
    const wxData = weatherElement.find(
      item => item.elementName === ElementName.Wx,
    );
    if (wxData) {
      const wX = wxData.time[0].elementValue[0].value as WXType;
      const currentTime = wxData.time[0].startTime || '';
      return { wX, currentTime };
    }
    return { wX: WXType.CLEAR, currentTime: '' };
  }

  // static getCurrentWxNight(weatherElement: WeatherElementItem[]): boolean {
  //   const wxData = weatherElement.find(item => item.elementName === ElementName.Wx);
  //   if (wxData) {
  //     const wxHour = Number(dayjs(wxData.time[0].startTime).format('HH'));
  //     const night = wxHour === 21 || wxHour === 0 || wxHour === 3
  //     return night;
  //   }
  // }

  static getLocationT(weatherElement: WeatherElementItem[]): string {
    const tData = weatherElement.find(
      item => item.elementName === ElementName.T,
    );
    if (tData) {
      const t = tData.time[0].elementValue[0].value;
      return WeatherDataFactory.createTemperature(t);
    }

    return ''
  }

  static getExtremeT(
    weatherElement: WeatherElementItem[],
    type: ElementName,
  ): string {
    const elementT = weatherElement.find(
      item => item.elementName === ElementName.T,
    );
    const currentDate = dayjs().format('MM/DD');
    const tommorow = dayjs().add(3, 'hours').format('MM/DD'); // 因為是每竹三小時吧

    const filterToday = elementT?.time.filter(item => {
      const date = dayjs(item.dataTime).format('MM/DD');
      return date === currentDate;
    }) || [];
    const filterTomorrow = elementT?.time.filter(item => {
      const date = dayjs(item.dataTime).format('MM/DD');
      return date === tommorow;
    });

    // 今天已經準備過去時會找不到今天，只能用明天
    const filterData = filterToday.length > 0 ? filterToday : filterTomorrow;
    const tArray = filterData?.map(item => Number(item.elementValue[0].value)) || [];

    switch (type) {
      case ElementName.MinT: {
        const result = FindExtremeNumber.findMin(tArray);
        return String(result);
      }
      case ElementName.MaxT: {
        const result = FindExtremeNumber.findMax(tArray);
        return String(result);
      }
      default:
        return ''
    }
  }

  static createLocationTodayEveryHourArray(
    weatherElement: WeatherElementItem[],
  ): TodayEveryHour[] {
    let wxArray: Array<Omit<TodayEveryHour, 'hourName' | 'temperature'>> = [];
    const wxData = weatherElement.find(
      item => item.elementName === ElementName.Wx,
    );
    if (wxData) {
      wxArray = wxData.time.map(item => {
        // console.log(item)
        const hour = item.startTime;
        const night = WeatherHelper.isNight(hour);
        return {
          wXIcon: WeatherDataFactory.createWXIcon(
            item.elementValue[0].value as WXType,
            night,
          ),
          wX: item.elementValue[0].value,
        };
      });
    }

    const tData = weatherElement.find(
      item => item.elementName === ElementName.T,
    );
    if (tData) {
      const tempArray = tData.time.map(item => {
        const temperature = WeatherDataFactory.createTemperature(
          item.elementValue[0].value,
        );
        // console.log(item)
        return {
          hourName: WeatherDataFactory.createEachHour(item.dataTime),
          temperature,
        };
      });

      const result = tempArray.map((item, index) => ({
        ...item,
        wXIcon: wxArray[index].wXIcon,
        wX: wxArray[index].wX,
      }));
      return result;
    }
    return [];
  }

  static createOthersDataArray(
    weatherElement: WeatherElementItem[],
  ): OthersData[] {
    const currentPoP = this.createPoPData(
      weatherElement,
      ElementName.PoP12H,
      0,
    );
    const nextPoP = this.createPoPData(weatherElement, ElementName.PoP12H, 1);

    const rH = this.createOtherDataItem(weatherElement, ElementName.RH);

    const wS = this.createOtherDataItem(weatherElement, ElementName.WS);
    const wD = this.createOtherDataItem(weatherElement, ElementName.WD);
    const wind = {
      name: wS.name,
      value: wD.value + wS.value,
      unit: wS.unit,
    };

    const aT = this.createOtherDataItem(weatherElement, ElementName.AT);
    const cI = this.createOtherDataItem(weatherElement, ElementName.CI);

    return [currentPoP, nextPoP, rH, wind, aT, cI];
  }

  static createPoPData(
    weatherElement: WeatherElementItem[],
    type: ElementName,
    timeIndex: number,
  ): OthersData {
    // 降雨機率
    const element = weatherElement.find(item => item.elementName === type);
    const poP = element?.time[timeIndex];
    const timeRange = `降雨機率：${dayjs(poP?.startTime).format(
      'M/DD，HH:mm',
    )} ~ ${dayjs(poP?.endTime).format('M/DD，HH:mm')}`;
    const { value } = poP?.elementValue[0] || {};

    return {
      name: timeRange,
      value,
      unit: '%',
    };
  }

  static createOtherDataItem(
    weatherElement: WeatherElementItem[],
    type: ElementName,
  ): OthersData {
    const element = weatherElement.find(item => item.elementName === type);
    const { value } = element?.time[0].elementValue[0] || {};
    const value2 =
      !!element && element.time[0].elementValue.length >= 2
        ? element?.time[0].elementValue[1].value
        : undefined;
    const { measures = '' } = element?.time[0].elementValue[0] || {};
    const { description = '' } = element || {};

    switch (type) {
      case ElementName.PoP6H: {
        return {
          name: '降雨機率',
          value,
          unit: '%',
        };
      }
      case ElementName.RH: {
        return {
          name: '濕度',
          value,
          unit: '%',
        };
      }
      case ElementName.WS: {
        return {
          name: '風',
          value: ` ${value}`,
          unit: measures,
        };
      }
      case ElementName.AT: {
        return {
          name: description,
          value,
          unit: '˚',
        };
      }
      case ElementName.WD: {
        return {
          name: description,
          value,
          unit: '',
        };
      }
      case ElementName.CI: {
        return {
          name: '舒適度',
          value: value2,
          unit: '',
        };
      }
      default:
        return {
          name: '',
          value: '',
          unit: '',
        };
    }
  }
}
