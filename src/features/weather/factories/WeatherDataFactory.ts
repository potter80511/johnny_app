import { WXType } from 'src/features/weather/types/Weather';
import { WXIcons } from 'src/features/weather/enums/WXIcons';
import { WXBgs } from 'src/features/weather/enums/WXBgs';
import dayjs, { Dayjs } from 'dayjs';

export class WeatherDataFactory {
  static createBackground(wX: WXType, isNight?: boolean): string {
    let photoName = '';
    switch (wX) {
      case WXType.CLEAR:
        photoName = isNight ? WXBgs.ClearNight : WXBgs.CLEAR;
        break;
      case WXType.MOSTLY_CLEAR:
        photoName = isNight ? WXBgs.ClearNight : WXBgs.MOSTLY_CLEAR;
        break;
      case WXType.PARTLY_CLEAR:
        photoName = WXBgs.PARTLY_CLEAR;
        break;
      case WXType.PARTLY_CLOUDY:
        photoName = isNight ? WXBgs.PartlyCloudyNight : WXBgs.PARTLY_CLOUDY;
        break;
      case WXType.MOSTLY_CLOUDY:
        photoName = WXBgs.MOSTLY_CLOUDY;
        break;
      case WXType.CLOUDY:
        photoName = isNight ? WXBgs.CloudyNight : WXBgs.CLOUDY;
        break;
      case WXType.RAIN:
        photoName = WXBgs.Temp_Rain;
        break;
      case WXType.RAINY:
        photoName = WXBgs.Temp_Rain;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS:
        photoName = WXBgs.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS;
        break;
      case WXType.OCCASIONAL_SHOWERS:
        photoName = WXBgs.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS;
        break;
      case WXType.OCCASIONAL_RAIN:
        photoName = WXBgs.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS;
        break;
      case WXType.CLOUDY_WITH_OCCASIONAL_RAIN:
        photoName = WXBgs.CLOUDY_RAIN;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_RAIN:
        photoName = WXBgs.CLOUDY_RAIN;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_RAIN2:
        photoName = WXBgs.CLOUDY_RAIN;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_RAIN:
        photoName = WXBgs.CLOUDY_RAIN;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS_OR_THUNDERSHOWERS:
        photoName =
          WXBgs.PARTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS_OR_THUNDERSHOWERS;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS:
        photoName = WXBgs.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        photoName = WXBgs.CLOUD_WITH_THUNDERSTORMS;
        break;
      case WXType.OCCASIONAL_SHOWERS_OR_THUNDERSTORMS:
        photoName = WXBgs.CLOUD_WITH_THUNDERSTORMS;
        break;
      case WXType.OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        photoName = WXBgs.Temp_Rain;
        break;
      case WXType.CLEAR_WITH_OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        photoName = WXBgs.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS;
        break;
      default:
        break;
    }
    return `/img/weather/${photoName}.jpg`;
  }

  static createWXIcon(wx: WXType, night?: boolean): string {
    let iconName = '';
    switch (wx) {
      case WXType.CLEAR:
        iconName = night ? WXIcons.Clear_Night : WXIcons.Clear_Sunny;
        break;
      case WXType.MOSTLY_CLEAR:
        iconName = WXIcons.Mostly_Clear;
        break;
      case WXType.PARTLY_CLEAR:
        iconName = WXIcons.Partly_Clear;
        break;
      case WXType.PARTLY_CLOUDY:
        iconName = WXIcons.CLOUD;
        break;
      case WXType.MOSTLY_CLOUDY:
        iconName = WXIcons.Two_White_Cloud;
        break;
      case WXType.MOSTLY_CLOUDY2:
        iconName = WXIcons.CLOUDY;
        break;
      case WXType.CLOUDY:
        iconName = WXIcons.CLOUDY;
        break;
      case WXType.CLOUDY_DAY:
        iconName = WXIcons.CLOUDY;
        break;
      case WXType.RAIN:
        iconName = WXIcons.Partly_Cloud_Shower;
        break;
      case WXType.RAINY:
        iconName = WXIcons.Cloud_Shower;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS:
        iconName = WXIcons.Partly_Cloud_Shower;
        break;
      case WXType.OCCASIONAL_SHOWERS:
        iconName = WXIcons.Cloud_Shower;
        break;
      case WXType.OCCASIONAL_RAIN:
        iconName = WXIcons.Partly_Cloud_Shower;
        break;
      case WXType.CLOUDY_WITH_OCCASIONAL_RAIN:
        iconName = WXIcons.Cloud_Shower;
        break;
      case WXType.CLOUDY_WITH_OCCASIONAL_SHOWERS:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_RAIN:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_RAIN2:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_RAIN:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS_OR_THUNDERSHOWERS:
        iconName = WXIcons.Cloud_Thunder_Shower;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.MOSTLY_CLOUDY_WITH_OCCASIONAL_SHOWERS2:
        iconName = WXIcons.Cloudy_Shower;
        break;
      case WXType.PARTLY_CLOUDY_WITH_OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        iconName = WXIcons.Cloudy_Thunder_Storm_Shower_Afternoon;
        break;
      case WXType.OCCASIONAL_SHOWERS_OR_THUNDERSTORMS:
        iconName = WXIcons.Cloud_Thunder_Shower;
        break;
      case WXType.OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        iconName = WXIcons.Thunder_Storm_Shower_Afternoon;
        break;
      case WXType.CLEAR_WITH_OCCASIONAL_AFTERNOON_THUNDERSHOWERS:
        iconName = WXIcons.Thunder_Storm_Shower_Afternoon;
        break;
      default:
        break;
    }
    return `/img/weather/wx_icons/${iconName}.svg`;
  }

  static createTemperature(t: string, noUnit?: boolean): string {
    const result = noUnit
      ? String(Math.round(Number(t)))
      : `${Math.round(Number(t))}˚`;
    return result;
  }

  static createEachHour(time: Dayjs): string {
    const hour = dayjs(time).format('HH');
    const newHour = `${String(Number(hour))}時`;
    return newHour;
  }
}
