import React, { useEffect } from 'react';
// import Screen from 'src/features/metronome/components/Screen';
// import AdjustingTool from 'src/features/metronome/components/AdjustingTool';
// import VoiceSwitch from 'src/features/metronome/components/VoiceSwitch';
// import TempoTypeModal from 'src/features/metronome/components/TempoTypeModal';
import StartField from 'src/features/metronome/components/StartField';
// import { TimeSignature } from 'src/features/metronome/domain/model/TimeSignature';
// import '@styles/features/metronome/Metronome.scss';

// import { actions as settingActions } from 'src/features/metronome/reducers/slices/settingSlice';
import { actions as beatingActions } from 'src/features/metronome/reducers/slices/beatingSlice';
import {
//   settingSelector,
//   timeSignatureSelector,
//   showTempoTypeModalSelector,
//   firstBeatHintSelector,
//   currentTimeSignatureIndexSelector,
  computedTimeSignatureSelector,
  perBeatSecondsSelector,
  beatingNumberSelector,
  beatingStatusSelector,
//   speedExpressionSelector,
  countingSecondsSelector,
  countingTimesSelector,
  currentVoiceSelector,
//   voiceSwitchDegSelector,
  soundSelector,
} from 'src/features/metronome/selectors';
import { useAppDispatch, useAppSelector } from 'src/store';

import { Howl, Howler } from 'howler';

let beating: any;
let counting: any;

const MetronomeContainer = () => {
  const dispatch = useAppDispatch();

  // const setting = useAppSelector(settingSelector);
  // const timeSignature = useAppSelector(timeSignatureSelector);
  // const showTempoTypeModal = useAppSelector(showTempoTypeModalSelector);
  // const firstBeatHint = useAppSelector(firstBeatHintSelector);
  // const currentTimeSignatureIndex = useAppSelector(
  //   currentTimeSignatureIndexSelector,
  // );
  const computedTimeSignature = useAppSelector(computedTimeSignatureSelector);
  const perBeatSeconds = useAppSelector(perBeatSecondsSelector);

  const maxBeatNumber = computedTimeSignature.beatingPerSignature;
  const beatNumber = useAppSelector(beatingNumberSelector);
  const startStatus = useAppSelector(beatingStatusSelector);
  // const speedExpression = useAppSelector(speedExpressionSelector);
  const countingSeconds = useAppSelector(countingSecondsSelector);
  const countingTimes = useAppSelector(countingTimesSelector);
  const currentVoice = useAppSelector(currentVoiceSelector);
  // const voiceSwitchDeg = useAppSelector(voiceSwitchDegSelector);

  const sound = useAppSelector(soundSelector);

  let tempBeatNumber = beatNumber;

  const beater = () => {
    dispatch(beatingActions.setBlueLightActive(true));
    if (tempBeatNumber === maxBeatNumber) {
      sound.ding.play();
      tempBeatNumber = 1;
    } else {
      sound.common.play();
      tempBeatNumber += 1;
    }
    dispatch(beatingActions.beat(tempBeatNumber));
  };

  let tempSeconds = countingSeconds;

  const counter = () => {
    tempSeconds += 1;
    dispatch(beatingActions.countingTime(tempSeconds));
  };

  const onStartStop = (status: boolean) => {
    if (status) {
      sound.ding.play();
      dispatch(beatingActions.setBlueLightActive(true));

      if (tempBeatNumber === maxBeatNumber) {
        tempBeatNumber = 1;
        dispatch(beatingActions.beat(tempBeatNumber));
      }
      beating = setInterval(beater, perBeatSeconds);

      // 秒數計時
      dispatch(beatingActions.countingTime(0)); // 剛點開始要reset為0
      tempSeconds = 0; // 剛點開始要reset為0
      counting = setInterval(counter, 1000);
    } else {
      Howler.stop();
      dispatch(beatingActions.beat(maxBeatNumber));
      clearInterval(beating);
      clearInterval(counting);
    }
    dispatch(beatingActions.statusChanged(status));
  };

  // const closeModal = () => dispatch(settingActions.onShowTempoTypeModal(false));

  // useEffect(() => {
  //   dispatch(settingActions.loaded());
  // }, []);

  // useEffect(() => {
  //   dispatch(beatingActions.beat(maxBeatNumber));
  // }, [maxBeatNumber]);

  // useEffect(() => {
  //   if (startStatus) {
  //     onStartStop(false);
  //   }
  // }, [setting]);

  // useEffect(() => {
  //   dispatch(settingActions.setLocalStorage());
  // }, [timeSignature, setting.originalSpeed, currentVoice, firstBeatHint]);

  return (
    <div className="metronome">
      <div className="metronome-head">
        {/* <Screen
          startStatus={startStatus}
          firstBeatHint={firstBeatHint}
          beatNumber={beatNumber}
          perBeatSeconds={perBeatSeconds}
          maxBeatNumber={maxBeatNumber}
          timeSignature={timeSignature}
          speed={setting.speed}
          speedExpression={speedExpression}
          errorMessages={setting.errorMessages}
          onShowTempoTypeModal={() =>
            dispatch(settingActions.onShowTempoTypeModal(true))
          }
          setFirstBeatHint={on => {
            sound.bubble.play();
            dispatch(settingActions.setFirstBeatHint(on));
          }}
          onSpeedChange={newValue =>
            dispatch(settingActions.update({ speed: newValue }))
          }
          onSpeedCheck={newValue =>
            dispatch(settingActions.onBlurChecked(newValue))
          }
          onInputFucus={() => onStartStop(false)}
        />
        <TempoTypeModal
          show={showTempoTypeModal}
          currentTimeSignature={timeSignature}
          sound={sound}
          onSignatureChange={(signature: TimeSignature) => {
            dispatch(settingActions.timeSignatureChange(signature));
            closeModal();
          }}
          closeModal={closeModal}
        /> */}
      </div>
      <div className="metronome-body">
        <div className="adjusting-tools">
          {/* <AdjustingTool
            label="拍子"
            currentValue={currentTimeSignatureIndex}
            sound={sound}
            onClick={newValue =>
              dispatch(settingActions.adjustedTimeSignature(newValue))
            }
          />
          <AdjustingTool
            label="速度"
            currentValue={setting.speed}
            sound={sound}
            onClick={newValue => {
              dispatch(settingActions.update({ speed: String(newValue) }));
              dispatch(settingActions.onBlurChecked(String(newValue)));
            }}
          /> */}
        </div>
        <div className="other-tools">
          {/* <VoiceSwitch
            currentVoice={currentVoice}
            switchDeg={voiceSwitchDeg}
            sound={sound}
            onVoiceChange={value =>
              dispatch(settingActions.voiceChanged(value))
            }
            onVoiceNextChange={(name, backWards) =>
              dispatch(
                settingActions.voiceNextChanged({
                  name,
                  backWards,
                }),
              )
            }
          /> */}
          <StartField
            startStatus={startStatus}
            countingTimes={countingTimes}
            currentVoice={currentVoice}
            onStartStop={onStartStop}
          />
        </div>
      </div>
    </div>
  );
};

export default MetronomeContainer;
