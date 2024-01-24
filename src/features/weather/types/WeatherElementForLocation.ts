import { Dayjs } from 'dayjs';
import { WXType } from 'src/features/weather/types/Weather';
import { ElementName } from 'src/features/weather/types/WeatherElement';

export interface WeatherElementItem {
  elementName: ElementName;
  description: string;
  time: ElementTime[];
}

export interface ElementTime {
  startTime?: string;
  endTime?: string;
  elementValue: parameter[];
  dataTime?: Dayjs;
}

interface parameter {
  value: string | WXType;
  measures: string;
}
