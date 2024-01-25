import { IconDefinition, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { ReactNode } from 'react';
import WeatherSvg from 'src/components/icons/WeatherSvg';
import InfinitySvg from 'src/components/icons/InfinitySvg';

type Navigation = Array<{
  name: string;
  icon: {
    fontAwsome?: IconDefinition;
    childrenSvg?: ReactNode
    tip: string
    tipColor: string
  }
}>

export const navigation: Navigation = [
  {
    name: 'counter',
    icon: {
      fontAwsome: faStopwatch,
      tip: 'Counter',
      tipColor: '#0a8a77',
    }
  },
  {
    name: 'weather',
    icon: {
      childrenSvg: <WeatherSvg />,
      tip: 'Weather',
      tipColor: '#daae2b',
    }
  },
  {
    name: 'metronome',
    icon: {
      childrenSvg: <InfinitySvg />,
      tip: 'Metronome',
      tipColor: '#038caf',
    }
  },
]
