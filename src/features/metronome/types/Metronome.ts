import { TimeSignature } from 'src/features/metronome/enums/TimeSignature';
import { VoiceName, DingName } from 'src/features/metronome/enums/Voice';

export type Metronome = {
  timeSignature: TimeSignature;
  speed: string;
};

export type Voice = {
  common: VoiceName;
  ding: DingName;
  label: string;
};
