import { VoiceName, DingName } from 'src/features/metronome/enums/Voice';
import { Voice } from 'src/features/metronome/types/Metronome';
import { TimeSignature } from 'src/features/metronome/enums/TimeSignature';

export const voiceData: Voice[] = [
  {
    label: '一般',
    common: VoiceName.Voice1,
    ding: DingName.Ding1,
  },
  {
    label: '木魚',
    common: VoiceName.Voice2,
    ding: DingName.Ding2,
  },
  {
    label: '普通節拍器1',
    common: VoiceName.Voice3,
    ding: DingName.Ding3,
  },
  {
    label: '普通節拍器2',
    common: VoiceName.Voice4,
    ding: DingName.Ding4,
  },
  {
    label: '電子聲',
    common: VoiceName.Voice5,
    ding: DingName.Ding5,
  },
];

export const timeSignatureData: TimeSignature[] = [
  TimeSignature.OneFour,
  TimeSignature.TwoFour,
  TimeSignature.ThreeFour,
  TimeSignature.FourFour,
  TimeSignature.FiveFour,
  TimeSignature.SixFour,
  TimeSignature.SevenFour,
  TimeSignature.EightFour,
  TimeSignature.NineFour,
  TimeSignature.TenFour,
  TimeSignature.ElevenFour,
  TimeSignature.TwelveFour,
  TimeSignature.OneTwo,
  TimeSignature.TwoTwo,
  TimeSignature.FourTwo,
  TimeSignature.ThreeEight,
  TimeSignature.SixEight,
  TimeSignature.SevenEight,
  TimeSignature.EightEight,
  TimeSignature.NineEight,
  TimeSignature.TenEight,
  TimeSignature.ElevenEight,
  TimeSignature.TwelveEight,
];
