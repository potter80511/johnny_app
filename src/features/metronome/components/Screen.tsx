import React, { useEffect } from 'react';
import { Metronome } from 'src/features/metronome/types/Metronome';
import { SpeedExpression } from 'src/features/metronome/enums/SpeedExpression';
import styled from 'styled-components';

import { actions as beatingActions } from 'src/features/metronome/reducers/slices/beatingSlice';
import { blueLightActiveSelector } from 'src/features/metronome/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const commonLightLong = 400;

type ScreenProp = Metronome & {
  startStatus: boolean;
  firstBeatHint: boolean;
  beatNumber: number;
  perBeatSeconds: number;
  maxBeatNumber: number;
  speedExpression: SpeedExpression;
  errorMessages: string;
  onShowTempoTypeModal: () => void;
  setFirstBeatHint: (on: boolean) => void;
  onSpeedChange: (newSpeed: string) => void;
  onSpeedCheck: (newSpeed: string) => void;
  onInputFucus: () => void;
};

const Wrapper = styled.div`
  background-color: #111;
  border: 2px solid;
  border-color: transparent #555 #555 transparent;
  border-radius: 4px;
`
const ScreenInner = styled.div`
  border-radius: 3px;
  padding: 5px 15px;
  border: 1px solid;
  border-color: #333 transparent transparent #333;
`
const ScreenHead = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    display: block;
  }
  .tempo-group {
    .tempo {
      margin-bottom: 15px;
    }
    .play-status {
      margin-left: 10px;
      &.start {
        width: 0;
        height: 0;
        border-width: 4px 7px;
        border-style: solid;
        border-color: transparent transparent transparent #3fea6c;
      }
      &.stop {
        width: 5px;
        height: 5px;
        background-color: red;
      }
    }
  }
  .time-signature {
    span {
      text-align: center;
    }
    .signature {
      position: relative;
      padding-left: 20px;
      margin-bottom: 15px;
      > span {
        border-radius: 3px;
        transition: all 0.3s;
        padding: 2px 20px 2px 5px;
        &:hover {
          background-color: #222;
          cursor: default;
        }
      }
      &:after {
        content: '';
        border-width: 10px 5px;
        border-style: solid;
        border-color: white transparent transparent transparent;
        position: absolute;
        right: 5px;
        top: 5px;
        pointer-events: none;
      }
    }
    .beat-number {
      .please-choose {
        font-size: 14px;
      }
    }
  }
  .speed-group {
    text-align: right;
    .speed-name {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .bell {
        margin-left: 10px;
        display: inline-block;
        cursor: pointer;
        svg {
          height: 25px;
        }
        &.on {
          color: #eadd8d;
          opacity: 1;
          animation: scaleBounceOn 0.3s ease-in-out;
        }
        &.off {
          color: #ece9d1;
          opacity: 0.3;
          transform: scale(0.9, 0.9);
          animation: scaleBounceOff 0.3s ease-in-out;
        }
      }
    }
    .speed {
      position: relative;
      padding-bottom: 20px;
      width: 120px;
      input {
        font-size: 30px;
        color: #fff;
        width: 70px;
        text-align: right;
        border: none;
        background: none;
        border-radius: 3px;
        padding-right: 5px;
        transition: all 0.3s;
        &:hover,
        &:focus {
          outline: none;
          background: #222;
        }
      }
      .error-messages {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 9px;
        color: red;
        opacity: 0;
        animation: fadeOutSlowly 2s ease-in-out;
      }
    }
  }
`
const BeatingLights = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  .left-light,
  .right-light {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    box-shadow: 0 0 5px black;
    opacity: 0.5;
    position: relative;
    transition: all 0.3s;
    &.active {
      animation-iteration-count: forwards;
    }
    &:after {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: white;
      opacity: 0.5;
      position: absolute;
      right: 4px;
      top: 1px;
    }
  }
  .left-light {
    background-color: #58beea;
    &.active {
      animation-name: lightsOn, blueLightsOn;
    }
  }
  .right-light {
    background-color: #3fea6c;
    &.active {
      animation-name: lightsOn, greenLightsOn;
    }
  }
  .lights {
    flex: 1;
    display: flex;
    justify-content: space-around;
    position: relative;
    bottom: 4px;
    .bar {
      width: 1px;
      height: 12px;
      background: linear-gradient(
        180deg,
        rgba(0, 26, 47, 1) 0%,
        rgba(9, 129, 219, 1) 25%,
        rgba(128, 202, 255, 1) 50%,
        rgba(9, 129, 219, 1) 75%,
        rgba(0, 26, 47, 1) 100%
      );
      opacity: 0;
      &.active {
        box-shadow: 0 0 2px #1291e0;
        opacity: 1;
      }
    }
  }
`


const Screen = (props: ScreenProp) => {
  const dispatch = useDispatch();

  const {
    startStatus,
    firstBeatHint,
    timeSignature,
    beatNumber,
    perBeatSeconds,
    maxBeatNumber,
    speed,
    speedExpression,
    errorMessages,
    setFirstBeatHint,
    onShowTempoTypeModal,
    onSpeedChange,
    onSpeedCheck,
    onInputFucus,
  } = props;

  const statusClass = startStatus ? ' start' : ' stop';
  const blueLightActive = useSelector(blueLightActiveSelector);
  const blueActiveClass = blueLightActive ? ' active' : '';
  const greenActiveClass = beatNumber === 1 ? ' active' : '';
  const firstBeatHintClass = firstBeatHint ? ' on' : ' off';

  const barArray = Array.from(Array(maxBeatNumber).keys());

  useEffect(() => {
    if (startStatus && perBeatSeconds >= commonLightLong) {
      setTimeout(() => {
        dispatch(beatingActions.setBlueLightActive(false));
      }, commonLightLong);
    }
  }, [startStatus, beatNumber]);

  return (
    <Wrapper>
      <ScreenInner>
        <ScreenHead>
          <div className="tempo-group">
            <span className="tempo">拍號</span>
            <span className={`play-status${statusClass}`} />
          </div>
          <div className="time-signature">
            <span className="signature" onClick={onShowTempoTypeModal}>
              <span>{timeSignature}</span>
            </span>
            <span className="beat-number">
              {startStatus ? (
                <>{beatNumber}</>
              ) : (
                <span className="please-choose">
                  點擊 &nbsp;↑
                  <br />
                  選定拍號
                </span>
              )}
            </span>
          </div>
          <div className="speed-group">
            <span className="speed-name">
              {speedExpression}
              <span
                className={`bell${firstBeatHintClass}`}
                onClick={() => setFirstBeatHint(!firstBeatHint)}
              >
                <FontAwesomeIcon icon={faBell} />
              </span>
            </span>
            <span className="speed">
              <input
                value={speed}
                onChange={({ currentTarget }) =>
                  onSpeedChange(currentTarget.value)
                }
                onBlur={({ currentTarget }) =>
                  onSpeedCheck(currentTarget.value)
                }
                onKeyUp={event => {
                  if (event.key === 'Enter') {
                    onSpeedCheck(event.currentTarget.value);
                    event.currentTarget.blur();
                  }
                }}
                onFocus={onInputFucus}
              />
              {errorMessages && (
                <span className="error-messages">{errorMessages}</span>
              )}
            </span>
          </div>
        </ScreenHead>
        <BeatingLights>
          <div
            className={`left-light${blueActiveClass}`}
            style={{
              animationName: !startStatus ? 'none' : '',
              animationIterationCount:
                perBeatSeconds < commonLightLong ? 'infinite' : 'forwards',
              animationDuration:
                perBeatSeconds < commonLightLong
                  ? `${String(perBeatSeconds)}ms`
                  : `${commonLightLong}ms`,
            }}
          />
          <div className="lights">
            {barArray.map(barIndex => {
              const currentBar = barIndex + 1;
              const barActiveClass =
                startStatus && currentBar <= beatNumber ? ' active' : '';
              return (
                <div
                  key={`bar-${barIndex}`}
                  className={`bar${barActiveClass}`}
                />
              );
            })}
          </div>
          <div
            className={`right-light${greenActiveClass}`}
            style={{
              animationDuration: `${commonLightLong}ms`,
            }}
          />
        </BeatingLights>
      </ScreenInner>
    </Wrapper>
  );
};

export default Screen;
