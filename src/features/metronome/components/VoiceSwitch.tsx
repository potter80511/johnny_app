import React, { useState } from 'react';
import { Voice } from 'src/features/metronome/types/Metronome';
import { voiceData } from 'src/features/metronome/data';
import { VoiceName } from 'src/features/metronome/enums/Voice';
import { Sound } from 'src/features/metronome/types/Sound';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

type VoiceSwitchProp = {
  currentVoice: Voice;
  switchDeg: string;
  sound: Sound;
  onVoiceChange: (name: VoiceName) => void;
  onVoiceNextChange: (name: VoiceName, backWards?: boolean) => void;
};

const Wrapper = styled.div`
  margin-right: 65px;
  position: relative;
  label {
    display: inline-block;
    padding-bottom: 40px;
    color: #aaa;
  }
`
const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
  width: 110px;
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  button {
    svg {
      transition: transform 0.3s ease-in-out;
      height: 20px;
      color: #333;
    }
    &.active {
      svg {
        transform: scale(1.3);
        color: #44feff;
      }
    }
  }
`
const SwitchGroup = styled.div`
  border: 5px solid #44feff;
  border-radius: 50%;
  width: 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  position: relative;
  .graduate {
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
    }
    .grade-bar {
      height: 3px;
      width: 10px;
      background-color: #aaa;
      margin-right: 2px;
    }
    .active-light {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #73feff;
      box-shadow: 0 0 5px #44feff;
      opacity: 0;
      transition: all 0.3s;
    }
    &.active {
      .active-light {
        opacity: 1;
      }
    }
    &.graduate1 {
      transform: translateY(50%);
    }
    &.graduate1,
    &.graduate5 {
      bottom: 50%;
    }
    &.graduate2,
    &.graduate4 {
      bottom: 1px;
    }
    &.graduate1 {
      left: -19px;
    }
    &.graduate2 {
      left: calc(25% - 13px);
      transform: translate(-50%, 50%) rotateZ(-45deg);
    }
    &.graduate3 {
      transform: translate(-50%, 50%) rotateZ(-90deg);
      bottom: -11px;
      left: 50%;
    }
    &.graduate4 {
      right: calc(25% - 13px);
      transform: translate(50%, 50%) rotateZ(-135deg);
    }
    &.graduate5 {
      right: -19px;
      transform: translateY(50%) rotateZ(-180deg);
    }
  }
`
const Switch = styled.div`
  border: 5px solid #000;
  box-shadow: 0 0 5px #000;
  width: 70px;
  border-radius: 50%;
  position: relative;
  .bright {
    position: absolute;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: -1px -1px 5px white;
    background-color: white;
  }
  .button-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    &:after,
    .pointer {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    &:after {
      content: '';
      background-color: #aaa;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      pointer-events: none;
      box-shadow: inset 2px 2px 0 white;
    }
    .pointer {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      transition: all 0.3s ease-in-out;
      &:after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 2px;
        background-color: #333;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`

const VoiceSwitch = (props: VoiceSwitchProp) => {
  const {
    currentVoice,
    switchDeg,
    sound: { next, switch: buttonSwitch },
    onVoiceChange,
    onVoiceNextChange,
  } = props;

  const [onLeft, setOnLeft] = useState<boolean>(false);
  const [onRight, setOnRight] = useState<boolean>(false);

  const onSwitchSound = () => {
    setTimeout(() => {
      buttonSwitch.play();
    }, 200);
  };

  return (
    <Wrapper>
      <label>節拍器聲音</label>
      <Arrows>
        <button
          type="button"
          onClick={() => onVoiceNextChange(currentVoice.common, true)}
          className={onLeft ? 'active' : ''}
          onMouseDown={() => {
            if (!isMobile) {
              setOnLeft(true);
              next.play();
            }
          }}
          onMouseUp={() => setOnLeft(false)}
          onTouchStart={() => {
            setOnLeft(true);
            next.play();
          }}
          onTouchEnd={() => setOnLeft(false)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="left" />
        </button>
        <button
          type="button"
          onClick={() => onVoiceNextChange(currentVoice.common)}
          className={onRight ? 'active' : ''}
          onMouseDown={() => {
            if (!isMobile) {
              setOnRight(true);
              next.play();
            }
          }}
          onMouseUp={() => setOnRight(false)}
          onTouchStart={() => {
            setOnRight(true);
            next.play();
          }}
          onTouchEnd={() => setOnRight(false)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} className="right" />
        </button>
      </Arrows>
      <SwitchGroup>
        {voiceData.map((g, i) => {
          const { common } = g;
          const activeClass = common === currentVoice.common ? ' active' : '';
          return (
            <div
              key={common}
              className={`graduate graduate${i + 1}${activeClass}`}
              onClick={() => {
                onVoiceChange(common);
                onSwitchSound();
              }}
            >
              <span className="grade-bar" />
              <span className="active-light" />
            </div>
          );
        })}
        <Switch>
          <div className="bright" />
          <div className="button-wrap">
            <button
              type="button"
              className="pointer"
              style={{ transform: `rotateZ(${switchDeg})` }}
              onClick={() => {
                onSwitchSound();
                onVoiceNextChange(currentVoice.common);
              }}
            >
              <span />
            </button>
          </div>
        </Switch>
      </SwitchGroup>
    </Wrapper>
  );
};

export default VoiceSwitch;
