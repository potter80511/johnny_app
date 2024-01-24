import {
  TaiwanCities,
  WeatherLocationType,
  YilanLocationValue,
  TaoyuanLocationValue,
  HsinchuLocationValue,
  MiaoliLocationValue,
  ChanghuaLocationValue,
  NantouLocationValue,
  YunlinLocationValue,
  ChiayiLocationValue,
  PingtungLocationValue,
  TaitungLocationValue,
  HualienLocationValue,
  PenghuLocationValue,
  KeelungLocationValue,
  TaipeiLocationValue,
  KaohsiungLocationValue,
  NewTaipeiLocationValue,
  TaichungLocationValue,
  TaiNanValue,
  LianjiangValue,
  KinmenValue
} from 'src/features/weather/enums';

export type LocationData = {
  city: TaiwanCities;
  name: string;
  value: LocationValue;
  type: WeatherLocationType;
};

export type LocationValue =
  | TaiwanCities
  | YilanLocationValue
  | TaoyuanLocationValue
  | HsinchuLocationValue
  | MiaoliLocationValue
  | ChanghuaLocationValue
  | NantouLocationValue
  | YunlinLocationValue
  | ChiayiLocationValue
  | PingtungLocationValue
  | TaitungLocationValue
  | HualienLocationValue
  | PenghuLocationValue
  | KeelungLocationValue
  | TaipeiLocationValue
  | KaohsiungLocationValue
  | NewTaipeiLocationValue
  | TaichungLocationValue
  | TaiNanValue
  | LianjiangValue
  | KinmenValue;

  export type SpreadIndex = number | undefined;
