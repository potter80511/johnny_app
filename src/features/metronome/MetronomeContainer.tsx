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
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #444;
  width: 100%;
  height: 100%;
  max-height: 630px;
  max-width: 404px;
  padding-bottom: 30px;
  touch-action: manipulation;
  *:not(input) {
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`
const MetronomeHead = styled.div`
  padding: 15px 10px;
  background-color: #222;
`
const MetronomeBody = styled.div`
  padding: 10px;
  border-top: 1px solid #777;
  text-align: center;
  .adjusting-tools,
  .other-tools {
    display: flex;
  }
  .adjusting-tools {
    justify-content: space-between;
    margin-bottom: 30px;
    .adjusting-tool {
      flex: 1;
    }
  }
`
const OtherTools = styled.div`
  justify-content: center;
`

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
    <Wrapper>
      <MetronomeHead>
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
      </MetronomeHead>
      <MetronomeBody>
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
        <OtherTools>
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
        </OtherTools>
      </MetronomeBody>
    </Wrapper>
  );
};

export default MetronomeContainer;
