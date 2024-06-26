import React from 'react';
import { Voice } from 'src/features/metronome/types/Metronome';
// import '@styles/features/metronome/StartField.scss';
import styled from 'styled-components';

type StartFieldProp = {
  startStatus: boolean;
  countingTimes: string;
  currentVoice: Voice;
  onStartStop: (status: boolean) => void;
};

const Wrapper = styled.div`
  width: 160px;
  > div {
    width: 100%;
  }
`
const TimeScreen = styled.div`
  background-color: #111;
  border: 2px solid;
  border-color: #111 #666 #666 #111;
  box-shadow: -1px -1px 3px #000;
  margin-bottom: 15px;
  .time-block {
    padding: 3px 0;
    display: block;
    border-width: 0 2px 2px 0;
    border-style: solid;
    border-color: transparent #111 #111 transparent;
    box-shadow: inset 1px 1px 2px #888;
    color: #79c6ff;
    span {
      display: block;
      font-size: 18px;
      &.label {
        font-weight: bold;
        font-size: 11px;
      }
    }
  }
`
const StartGroup = styled.div`
  box-shadow: 0 0 2px #000;
`
const StartBorder = styled.div`
  box-shadow: inset 0 0 5px #000;
  button {
    color: #fff;
    padding: 8px;
    box-shadow: inset 1px 1px 2px #666;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: all 0.3s;
    &:hover {
      background-color: #555;
    }
    .pattern {
      &::before,
      &::after {
        content: '';
        display: block;
      }
      &:before {
        width: 0;
        height: 0;
        border-width: 7px 14px;
        border-style: solid;
        border-color: transparent transparent transparent #333;
        margin-bottom: 10px;
      }
      &:after {
        width: 14px;
        height: 14px;
        background-color: #333;
      }
    }
    .start {
      padding: 3px 10px 3px 15px;
      display: block;
      font-size: 30px;
      position: relative;
      &:before {
        content: '';
        width: 1px;
        height: 100%;
        background-color: #aaa;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      }
    }
  }
`

const StartField = (props: StartFieldProp) => {
  const { startStatus, countingTimes, currentVoice, onStartStop } = props;

  return (
    <Wrapper>
      <TimeScreen>
        <div className="time-block">
          <span>{countingTimes}</span>
          <span className="label">{currentVoice.label}</span>
        </div>
      </TimeScreen>
      <StartGroup>
        <StartBorder>
          <button type="button" onClick={() => onStartStop(!startStatus)}>
            <span className="pattern" />
            <span className="start">{startStatus ? '停止' : '開始'}</span>
          </button>
        </StartBorder>
      </StartGroup>
    </Wrapper>
  );
};

export default StartField;
